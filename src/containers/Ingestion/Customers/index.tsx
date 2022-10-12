/* eslint-disable no-console */
/* eslint-disable react/jsx-indent */
/* eslint-disable @typescript-eslint/indent */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Grid, FormControl, InputLabel, Select } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useSnackbar, VariantType } from 'notistack';
import MenuItem from '@material-ui/core/MenuItem';
import Breadcumb from '../../../components/Breadcumb';
import CustomerTableData from './CustomerTable';
import validationRules from './CustomerValidate';
import { validate } from '../../../utils/helper';
import { DataProps, IError } from './customerInterface';
import {
  MainContentWrapper,
  ContentBoxWrapper,
  DialogContentWrapper,
  StyledDialog,
  StyledButton
} from './Styled';

const CustomerSection: React.FC<DataProps> = ({
  dispatch,
  customerList,
  addCustomer,
  answerOptionsReducer
}: DataProps) => {
  const [error, setError] = useState<IError>({});
  const [open, setOpen] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [orderBy, setOrderBy] = useState<string>('created_at');
  console.log('addCustomer', addCustomer);
  console.log('customerList', customerList);
  console.log('answerOptionsReducer', answerOptionsReducer);
  const [customer, setCustomer] = useState<any>({
    name: '',
    companyNo: '',
    vatNumber: '',
    country: ''
  });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const initialRender = useRef({ initial: true });
  const { enqueueSnackbar } = useSnackbar();
  const isUpdateAndDelete = useRef({ isActive: false });
  const eventClick = useRef({ value: 'initialLoad' });

  // Calling dataSource api for DS list
  useEffect(() => {
    dispatch({
      type: 'GET_CUSTOMER_LIST',
      payload: {
        page: 1,
        rowsPerPage: 10,
        orderBy: 'name'
      }
    });
    dispatch({
      type: 'GET_USERS_LIST',
      payload: {
        page: 1,
        rowsPerPage: 10,
        orderBy: 'name'
      }
    });
    dispatch({
      type: 'OPTIONS_LIST'
    });
  }, [dispatch]);

  // Handle Open Modal
  const handleClickOpen = () => {
    isUpdateAndDelete.current.isActive = true;
    setOpen(true);
  };

  // Handle Close Modal
  const handleClose = () => {
    setOpen(false);
    setCustomer('');
    setError({});
  };

  // Validation of user fields
  const handleValidate = () => {
    let validRes = { errors: {}, isValid: false };
    validRes = validate(customer, validationRules);
    setError(validRes.errors);
    return validRes.isValid;
  };

  // Handle On Change
  const handleChange = (e: any) => {
    setCustomer((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  // Calling dataSource api for DS list
  useEffect(() => {
    const handleSnack = (variant: VariantType) => {
      enqueueSnackbar(addCustomer.message.data ? addCustomer.message.data : addCustomer.message, {
        variant
      });
    };
    if (addCustomer?.status === 'success' && open && !isUpdateAndDelete.current.isActive) {
      dispatch({
        type: 'GET_CUSTOMER_LIST',
        payload: {
          page: page + 1,
          rowsPerPage,
          orderBy
        }
      });
      isUpdateAndDelete.current.isActive = false;
      setOpen(false);
      setCustomer('');
      setError({});
    }

    if (addCustomer?.status === 'failure' && isUpdateAndDelete.current.isActive) {
      handleSnack('error');
      isUpdateAndDelete.current.isActive = false;
    }
  }, [dispatch, open, addCustomer, enqueueSnackbar, page, rowsPerPage, orderBy]);

  // Calling answerOptionsReducer api for customer
  useEffect(() => {
    const handleSnack = (variant: VariantType) => {
      enqueueSnackbar(
        answerOptionsReducer.message.data
          ? answerOptionsReducer.message.data
          : answerOptionsReducer.message,
        {
          variant
        }
      );
    };

    if (answerOptionsReducer?.status === 'failure' && eventClick.current.value === 'initialLoad') {
      handleSnack('error');
    }
  }, [dispatch, answerOptionsReducer, enqueueSnackbar]);

  // Handle confirm button
  const handleConfirm = () => {
    if (handleValidate()) {
      isUpdateAndDelete.current.isActive = false;
      dispatch({
        type: 'ADD_CUSTOMER',
        payload: customer
      });
    }
  };

  // Callback for update
  const updateList = () => {
    dispatch({
      type: 'GET_CUSTOMER_LIST',
      payload: {
        page: page + 1,
        rowsPerPage,
        orderBy
      }
    });
  };

  // Handle page and rowsperPage
  const handlePaginationAndUpdateList = (type: string, value: number) => {
    if (type === 'page') {
      dispatch({
        type: 'GET_CUSTOMER_LIST',
        payload: {
          page: value + 1,
          rowsPerPage,
          orderBy
        }
      });
      setPage(value);
    } else {
      dispatch({
        type: 'GET_CUSTOMER_LIST',
        payload: {
          page: 1,
          rowsPerPage: value,
          orderBy
        }
      });
      setPage(0);
      setRowsPerPage(value);
    }
  };

  // Handle sorting
  const handleSortData = (property: string, isAsyn: any) => {
    initialRender.current.initial = true;
    dispatch({
      type: 'GET_CUSTOMER_LIST',
      payload: {
        page: page + 1,
        rowsPerPage,
        orderBy: !isAsyn ? property : `-${property}`
      }
    });
    setOrderBy(property);
    setTimeout(() => {
      initialRender.current.initial = false;
    }, 500);
  };

  return (
    <>
      <MainContentWrapper>
        <Breadcumb breadCrumb={{ page: 'Customers', data: ['Customers', 'Customer-list'] }} />
        <ContentBoxWrapper>
          <Grid container spacing={3} justify='space-between' alignItems='center'>
            <Grid xs={12} sm={2} justify='flex-end' className='addColumn'>
              <StyledButton variant='outlined' color='primary' onClick={handleClickOpen}>
                Add Customer
              </StyledButton>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <CustomerTableData
                customerList={customerList}
                updateList={updateList}
                handleSortData={handleSortData}
                page={page}
                rowsPerPage={rowsPerPage}
                handlePaginationAndUpdateList={handlePaginationAndUpdateList}
                answerOptionsReducer={answerOptionsReducer}
              />
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
          <DialogTitle id='responsive-dialog-title'>Add New Customer</DialogTitle>
          <DialogContent>
            <Grid container justify='space-between'>
              <Grid xs={12}>
                <TextField
                  id='outlined-textarea'
                  label='Customer'
                  value={customer.name}
                  placeholder='Enter Customer name'
                  multiline
                  variant='outlined'
                  name='name'
                  onChange={(e) => handleChange(e)}
                  error={error.name ? true : false}
                  helperText={error.name ? error.name : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant='outlined'>
                  <InputLabel id='demo-simple-select-outlined-label'>Country</InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    value={customer.country}
                    onChange={(e) => handleChange(e)}
                    label='Country'
                    name='country'
                  >
                    {answerOptionsReducer?.data?.COUNTRY_CODES
                      ? Object.keys(answerOptionsReducer?.data?.COUNTRY_CODES).map((data) => (
                          <MenuItem key={data} value={data}>
                            {answerOptionsReducer.data.COUNTRY_CODES[data]}
                          </MenuItem>
                        ))
                      : ''}
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <TextField
                  id='outlined-textarea'
                  label='Company Number'
                  value={customer.companyNo}
                  placeholder='Enter Company number'
                  multiline
                  variant='outlined'
                  name='companyNo'
                  onChange={(e) => handleChange(e)}
                  error={error.companyNo ? true : false}
                  helperText={error.companyNo ? error.companyNo : ''}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  id='outlined-textarea'
                  label='VAT Number'
                  value={customer.vatNumber}
                  placeholder='Enter VAT number'
                  multiline
                  variant='outlined'
                  name='vatNumber'
                  onChange={(e) => handleChange(e)}
                  error={error.vatNumber ? true : false}
                  helperText={error.vatNumber ? error.vatNumber : ''}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color='secondary'>
              Cancel
            </Button>
            <Button onClick={handleConfirm} color='primary' autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </DialogContentWrapper>
      </StyledDialog>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  customerList: state.customerList.data,
  addCustomer: state.addCustomer.data,
  answerOptionsReducer: state.answerOptionsReducer.data
});

export default connect(mapStateToProps)(CustomerSection);
