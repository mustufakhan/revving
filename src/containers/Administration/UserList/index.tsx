/* eslint-disable no-console */
import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSnackbar, VariantType } from 'notistack';
import locale from 'date-fns/locale/en-US';
import Loader from '../../../components/Loader';
import Breadcumb from '../../../components/Breadcumb';
import { IProps } from './UserListConstants';

import DataTable from './DataTable';
import {
  MainContentWrapper,
  ContentBoxWrapper,
  StyledFormControl,
  StyledDialog,
  DialogContentWrapper,
  StyledButton
} from './Styled';

// Props Interface
// interface IProps {
//   dispatch: Function;
//   customerData: {
//     data: {
//       count: number;
//       results: {
//         company_number: string;
//         country_code: string;
//         created_at: string;
//         cuid: string;
//         customer: number;
//         customer_name: string;
//         email: string;
//         first_name: string;
//         id: number;
//         last_name: string;
//         status: string;
//         updated_at: string;
//         user: number;
//         vat_number: string;
//       }[];
//     };
//     status: string;
//   };
//   userList: {
//     data: {
//       count: number;
//       file_path: string;
//       results: {
//         approved: boolean;
//         created_at: string;
//         eligible: boolean;
//         email: string;
//         first_name: string;
//         has_customer: boolean;
//         is_owner: boolean;
//         last_name: string;
//         onboarded_at: string;
//         phone: string;
//         pk: number;
//         status: string;
//         terms: boolean;
//         username: string;
//       }[];
//     };
//     status: string;
//     message: {
//       data?: string;
//     };
//   };
// }

const UserList: React.FC<IProps> = ({ dispatch, customerData, userList }: IProps) => {
  const [customerValue, setCustomer] = useState('');
  const [approve, setApprove] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const initialRender = useRef({ initial: true });
  const [isLoading, setIsLoading] = useState(false);
  const [addUser, setaddUser] = useState<any>({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    customer: '',
    approve: '',
    eligible: '',
    administrator: ''
  });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  console.log('approve', approve);
  const eventClick = useRef({ value: '' });
  const { enqueueSnackbar } = useSnackbar();

  if (locale && locale.options) {
    locale.options.weekStartsOn = 1;
  }

  // userList updating and loader
  useEffect(() => {
    setIsLoading(false);
  }, [userList]);

  // Calling api for Data list
  useEffect(() => {
    dispatch({
      type: 'USER_LIST',
      payload: {
        page: 1,
        rowsPerPage: 10,
        customer: customerValue,
        approve
      }
    });
  }, [dispatch, approve, customerValue]);
  useEffect(() => {
    // Get customer list api call
    dispatch({
      type: 'GET_CUSTOMER_LIST',
      payload: {
        page: 1,
        rowsPerPage: '',
        orderBy: 'created_at'
      }
    });
  }, [dispatch]);

  // const handleAPI = () => {
  //   dispatch({
  //     type: 'USER_LIST',
  //     payload: {
  //       page: 1,
  //       rowsPerPage: 10,
  //       customer: customerValue,
  //       approve
  //     }
  //   });
  //   dispatch({
  //     type: 'USER_ADD_LIST_CLEAR'
  //   });
  // };

  const handleChangeCustomer = (event: ChangeEvent<{ value: unknown }>) => {
    setCustomer(event.target.value as string);
  };

  // Handle Revenue Source
  const handleApprove = (event: ChangeEvent<{ value: unknown }>) => {
    setApprove(event.target.value as string);
  };

  // Handle page and rowsperPage
  const handlePaginationAndUpdateList = (type: string, value: number) => {
    initialRender.current.initial = true;
    if (type === 'page') {
      dispatch({
        type: 'USER_LIST',
        payload: {
          page: value + 1,
          rowsPerPage,
          customer: customerValue,
          approve
        }
      });
      setPage(value);
    } else {
      dispatch({
        type: 'USER_LIST',
        payload: {
          page: 1,
          rowsPerPage: value,
          customer: customerValue,
          approve
        }
      });
      setPage(0);
      setRowsPerPage(value);
    }
    setTimeout(() => {
      initialRender.current.initial = false;
    }, 500);
  };

  // Handle sorting
  const handleSortData = (property: string, isAsyn: any) => {
    initialRender.current.initial = true;
    dispatch({
      type: 'USER_LIST',
      payload: {
        page: page + 1,
        rowsPerPage,
        customer: customerValue,
        approve
      }
    });
    setTimeout(() => {
      initialRender.current.initial = false;
    }, 500);
  };

  // Export csv api response
  useEffect(() => {
    const handleSnack = (variant: VariantType) => {
      enqueueSnackbar(userList.message.data ? userList.message.data : userList.message, {
        variant
      });
    };

    if (userList?.status === 'success' && eventClick.current.value === 'export_csv') {
      window.location.href = userList?.data?.file_path;
    }
    if (userList?.status === 'failure' && eventClick.current.value === 'export_csv') {
      handleSnack('error');
    }
    eventClick.current.value = '';
  }, [userList, enqueueSnackbar, dispatch]);

  const handleConfirm = () => {
    dispatch({
      type: 'ADD_USER',
      payload: {
        first_name: addUser.first_name,
        last_name: addUser.last_name,
        username: addUser.username,
        email: addUser.email,
        customer: parseInt(addUser.customer, 10),
        approve: addUser.approve === 'true' ? true : false,
        eligible: addUser.eligible === 'true' ? true : false,
        administrator: addUser.administrator === 'true' ? true : false
      }
    });
    setOpen(false);
    setaddUser('');
  };

  const handleChange = (e: any) => {
    setaddUser((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleClose = () => {
    setOpen(false);
    setaddUser('');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <MainContentWrapper>
        <Breadcumb breadCrumb={{ page: 'Customers', data: ['Customers', 'User-List'] }} />
        <ContentBoxWrapper>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Status</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={approve}
                  onChange={handleApprove}
                  label='Approve'
                >
                  <MenuItem key='no-value-customer' value='admin'>
                    ADMIN
                  </MenuItem>
                  <MenuItem key='no-value-customer' value='member'>
                    MEMBER
                  </MenuItem>
                  <MenuItem key='no-value-customer' value='superadmin'>
                    SUPERADMIN
                  </MenuItem>
                  <MenuItem key='no-value-customer' value='removed'>
                    REMOVED
                  </MenuItem>
                </Select>
              </StyledFormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                className='auto_drop'
                id='auto-dropdown-customer'
                options={
                  (customerData?.status === 'success' &&
                    customerData?.data &&
                    customerData?.data?.results.length &&
                    customerData?.data?.results) ||
                  []
                }
                getOptionLabel={(option: any) => option.name}
                getOptionSelected={(option, value) => {
                  if (option.cuid === value.cuid) {
                    setCustomer(option.cuid);
                  }
                  return option.cuid === value.cuid;
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Customer'
                    variant='outlined'
                    value={(e: any) => {}}
                    onChange={(e) => handleChangeCustomer(e)}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={4} className='addColumn'>
              <StyledButton variant='outlined' color='primary' onClick={handleClickOpen}>
                Add New User
              </StyledButton>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              {isLoading ? (
                <Loader />
              ) : (
                <DataTable
                  userList={userList}
                  handleSortData={handleSortData}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  handlePaginationAndUpdateList={handlePaginationAndUpdateList}
                  customerData={{
                    data: {
                      count: 0,
                      results: []
                    },
                    status: ''
                  }}
                />
              )}
            </Grid>
          </Grid>
        </ContentBoxWrapper>
      </MainContentWrapper>

      <StyledDialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogContentWrapper>
          <DialogTitle id='responsive-dialog-title'>Add New User</DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid xs={12} style={{ display: 'flex' }} justify='space-between' alignItems='center'>
                <Grid xs={5}>
                  <TextField
                    id='outlined-textarea'
                    label='First Name'
                    value={addUser.first_name}
                    placeholder='Enter First Name'
                    multiline
                    variant='outlined'
                    name='first_name'
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid xs={5}>
                  <TextField
                    id='outlined-textarea'
                    label='Last Name'
                    value={addUser.last_name}
                    placeholder='Enter Last Name'
                    multiline
                    variant='outlined'
                    name='last_name'
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
              </Grid>

              <Grid xs={12}>
                <TextField
                  id='outlined-textarea'
                  label='Username'
                  value={addUser.username}
                  placeholder='Enter Username'
                  multiline
                  variant='outlined'
                  name='username'
                  onChange={(e) => handleChange(e)}
                />
              </Grid>

              <Grid xs={12}>
                <TextField
                  id='outlined-textarea'
                  label='Email'
                  value={addUser.email}
                  placeholder='Enter email'
                  multiline
                  variant='outlined'
                  name='email'
                  onChange={(e) => handleChange(e)}
                />
              </Grid>

              <Grid xs={12}>
                <TextField
                  id='outlined-textarea'
                  label='Phone'
                  value={addUser.phone}
                  placeholder='Enter Phone Number'
                  multiline
                  variant='outlined'
                  name='phone'
                  onChange={(e) => handleChange(e)}
                />
              </Grid>

              <Grid item xs={12}>
                {/* <Autocomplete
                  className='auto_drop'
                  id='auto-dropdown-customer'
                  options={
                    (customerData?.status === 'success' &&
                      customerData?.data &&
                      customerData?.data?.results.length &&
                      customerData?.data?.results) ||
                    []
                  }
                  getOptionLabel={(option: any) => option.name}
                  getOptionSelected={(option, value) => {
                    setCustomer(option.cust_id);
                    return option.cust_id === value.cust_id;
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Customer'
                      variant='outlined'
                      value={(e: any) => {}}
                      onChange={(e) => handleChangeCustomer(e)}
                    />
                  )}
                /> */}
                <FormControl variant='outlined'>
                  <InputLabel id='demo-simple-select-outlined-label'>Customer</InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    value={addUser.customer}
                    label='Customer'
                    name='customer'
                    onChange={(e) => handleChange(e)}
                  >
                    {customerData?.status === 'success' &&
                      customerData.data &&
                      customerData.data?.results.length &&
                      customerData.data?.results.map((data: any) => (
                        <MenuItem key={data.cuid} value={data.cust_id}>
                          {data.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid xs={12}>
                <FormControl variant='outlined'>
                  <InputLabel id='demo-simple-select-outlined-label'>Approve</InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    value={addUser.approve}
                    label='Approve'
                    name='approve'
                    onChange={(e) => handleChange(e)}
                  >
                    <MenuItem key='no-value-customer' value='true'>
                      True
                    </MenuItem>
                    <MenuItem key='no-value-customer' value='false'>
                      False
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid xs={12}>
                <FormControl variant='outlined'>
                  <InputLabel id='demo-simple-select-outlined-label'>Eligible</InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    value={addUser.eligible}
                    label='Eligible'
                    name='eligible'
                    onChange={(e) => handleChange(e)}
                  >
                    <MenuItem key='no-value-customer' value='true'>
                      True
                    </MenuItem>
                    <MenuItem key='no-value-customer' value='false'>
                      False
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid xs={12}>
                <FormControl variant='outlined'>
                  <InputLabel id='demo-simple-select-outlined-label'>Administrator</InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    value={addUser.administrator}
                    label='Administrator'
                    name='administrator'
                    onChange={(e) => handleChange(e)}
                  >
                    <MenuItem key='no-value-customer' value='true'>
                      True
                    </MenuItem>
                    <MenuItem key='no-value-customer' value='false'>
                      False
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button autoFocus color='secondary' onClick={handleClose}>
              Cancel
            </Button>
            <Button color='primary' onClick={handleConfirm} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </DialogContentWrapper>
      </StyledDialog>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  customerData: state.customerList.data,
  userList: state.userList.data,
  userAdd: state.userAdd.data
});

export default connect(mapStateToProps)(UserList);
