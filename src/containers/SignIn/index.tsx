import React, { useState, useEffect, KeyboardEvent } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { blue } from '@material-ui/core/colors';
import { useSnackbar, VariantType } from 'notistack';
import { connect } from 'react-redux';
import validationRules from './loginValidate';
import { validate } from '../../utils/helper';

// User form style theme object
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  btnWrapper: {
    position: 'relative'
  },
  buttonProgress: {
    color: blue[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}));

// Props Interface
interface IProps {
  dispatch: Function;
  loginData: {
    message: {
      data?: string;
    };
    status: string;
  };
  history: {
    push: Function;
  };
}

// Error Interface
interface IError {
  username?: string;
  password?: string;
}

const SignIn: React.FC<IProps> = ({ dispatch, loginData, history }: IProps) => {
  const [error, setError] = useState<IError>({});
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    username: '',
    password: ''
  });
  const { enqueueSnackbar } = useSnackbar();

  // Handle updated data from login api
  useEffect(() => {
    const handleSnack = (variant: VariantType) => {
      enqueueSnackbar(loginData.message.data ? loginData.message.data : loginData.message, {
        variant
      });
    };
    localStorage.getItem('TOKEN') && history.push('/');
    if (loginData?.status === 'failure') {
      handleSnack('error');
    }
    setLoading(false);
  }, [loginData, history, enqueueSnackbar]);

  const classes = useStyles();

  // Handle On Change
  const hancleChange = (e: any) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  // Validation of user fields
  const handleValidate = (type: string) => {
    let validRes = { errors: {}, isValid: false };
    if (type === 'login') {
      validRes = validate(state, validationRules);
      setError(validRes.errors);
      return validRes.isValid;
    }
    return validRes.isValid;
  };

  // Handle Enter key event
  const handleEnterKey = (event: KeyboardEvent, type: string) => {
    if (event.key === 'Enter') {
      const { username, password } = state;
      if (handleValidate(type)) {
        setLoading(true);
        if (type === 'login') {
          username &&
            password &&
            dispatch({
              type: 'LOGIN_USER',
              payload: {
                username,
                password
              }
            });
        }
      }
    }
  };

  // Handle Login submit button
  const handleLogin = () => {
    const { username, password } = state;
    if (handleValidate('login')) {
      setLoading(true);
      username &&
        password &&
        dispatch({
          type: 'LOGIN_USER',
          payload: {
            username,
            password
          }
        });
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} noValidate={false}>
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            id='user'
            label='Username'
            name='username'
            autoComplete='username'
            autoFocus
            onChange={(e) => hancleChange(e)}
            error={error.username ? true : false}
            helperText={error.username ? error.username : ''}
            onKeyPress={(e) => handleEnterKey(e, 'login')}
          />
          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            onChange={(e) => hancleChange(e)}
            error={error.password ? true : false}
            helperText={error.password ? error.password : ''}
            onKeyPress={(e) => handleEnterKey(e, 'login')}
          />
          <Box className={classes.btnWrapper}>
            <Button
              type='button'
              fullWidth
              variant='contained'
              color='primary'
              disabled={loading}
              className={classes.submit}
              onClick={() => handleLogin()}
            >
              Sign In
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Box>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  loginData: state.login.data
});

export default connect(mapStateToProps)(SignIn);
