/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import locale from 'date-fns/locale/en-US';
import Loader from '../../../components/Loader';
import Breadcumb from '../../../components/Breadcumb';
import DataTable from './DataTable';
import {
  MainContentWrapper,
  ContentBoxWrapper,
  StyledButton,
  StyledDialog,
  DialogContentWrapper
} from './Styled';

// Props Interface
interface IProps {
  dispatch: Function;
  kantoxAccounts: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  addkantoxAccounts: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  kantoxCompanyReference: {
    data: any;
    status: string;
    changingStatus: string;
    message: {
      data?: string;
    };
  };
  customerData: {
    data: any;
    status: string;
  };
  revenueSourceMasterList: {
    data: any;
    status: string;
  };
}

const KontexReference: React.FC<IProps> = ({
  dispatch,
  kantoxAccounts,
  customerData,
  addkantoxAccounts,
  kantoxCompanyReference,
  revenueSourceMasterList
}: IProps) => {
  const [customerValue, setCustomer] = useState('');
  const [page, setPage] = React.useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [orderBy, setOrderBy] = useState('');
  const [companyRef, setcompanyRef] = useState('');
  const [customerCustId, setCustomerCustId] = useState('');

  const [popform, setpopform] = useState<any>({
    gbpPaymentReference: '',
    usdPaymentReference: '',
    eurPaymentReference: '',
    gbpCollection: '',
    usdCollection: '',
    eurCollection: '',
    gbpRepaymentReference: '',
    usdRepaymentReference: '',
    eurRepaymentReference: '',
    gbpSurplusDistribution: '',
    usdSurplusDistribution: '',
    eurSurplusDistribution: ''
  });

  const initialRender = useRef({ initial: true });
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeCustomer = (event: React.ChangeEvent<{ value: unknown }>) => {
    setIsLoading(true);
    setCustomer(event.target.value as string);
  };

  // const handleRevenueSource = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setIsLoading(true);
  //   setRevenueSource(event.target.value as string);
  // };

  if (locale && locale.options) {
    locale.options.weekStartsOn = 1;
  }

  // revenueSourceAcc updating and loader
  // useEffect(() => {
  //   console.log('check main api 1');
  //   setIsLoading(false);
  // }, [invoiceSummary]);

  // useEffect(() => {
  //   customerData?.data?.results.unshift({ name: 'All' });
  // }, [customerData?.data?.results]);

  useEffect(() => {
    revenueSourceMasterList?.data.unshift({ name: 'All' });
  }, [revenueSourceMasterList?.data]);

  useEffect(() => {
    // Get customer list api call
    dispatch({
      type: 'GET_CUSTOMER_LIST',
      payload: {
        page: 1,
        rowsPerPage: '',
        orderBy: 'created_at',
        presentValue: 'false'
      }
    });
  }, [dispatch]);

  // Calling api for Data list
  useEffect(() => {
    dispatch({
      type: 'KANTOX_ACCOUNTS',
      payload: {
        page: 1,
        rowsPerPage: 10,
        orderBy
      }
    });
  }, [dispatch, orderBy]);

  // Callback for update
  const updateList = () => {
    dispatch({
      type: 'KANTOX_ACCOUNTS',
      payload: {
        page: page + 1,
        rowsPerPage,
        orderBy
      }
    });
  };

  // Handle page and rowsperPage
  const handlePaginationAndUpdateList = (type: string, value: number) => {
    initialRender.current.initial = true;
    if (type === 'page') {
      dispatch({
        type: 'KANTOX_ACCOUNTS',
        payload: {
          page: value + 1,
          rowsPerPage,
          orderBy
        }
      });
      setPage(value);
    } else {
      dispatch({
        type: 'KANTOX_ACCOUNTS',
        payload: {
          page: 1,
          rowsPerPage: value,
          orderBy
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
      type: 'KANTOX_ACCOUNTS',
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

  const handleAPI = () => {
    dispatch({
      type: 'KANTOX_ACCOUNTS',
      payload: {
        page: page + 1,
        rowsPerPage,
        orderBy
      }
    });
  };

  // Handle Open Modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Handle Close Modal
  const handleClose = () => {
    setOpen(false);
  };

  // Handle On Change
  const handleChange = (e: any) => {
    setpopform((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleCompanyRefChange = (e: any) => {
    setcompanyRef(e.target.value);
  };

  // useEffect(() => {
  //   if (kantoxCompanyReference?.changingStatus === 'success') {
  //     dispatch({
  //       type: 'ADD_KANTOX',
  //       payload: { ...popform, customer: parseInt(customerCustId, 10) }
  //     });
  //   } else {
  //     setOpenSnackbar(true);
  //   }
  // }, [kantoxCompanyReference?.changingStatus]);
  // Handle confirm button
  const handleConfirm = () => {
    dispatch({
      type: 'KONTEX_COMPANY_REFERENCE',
      payload: {
        cuid: customerValue,
        company_reference: companyRef
      }
    });

    dispatch({
      type: 'ADD_KANTOX',
      payload: { ...popform, customer: parseInt(customerCustId, 10) }
    });

    // dispatch({
    //   type: 'KANTOX_ACCOUNTS',
    //   payload: {}
    // });
    console.log(addkantoxAccounts, 'addkantoxAccounts');
    console.log(kantoxCompanyReference, 'kantoxCompanyReference');
    // if (addkantoxAccounts?.status === 'success') {

    // } else {
    //   setOpenSnackbar(true);
    // }
    setTimeout(() => {
      dispatch({
        type: 'KANTOX_ACCOUNTS',
        payload: {}
      });
    }, 1000);

    setOpenSnackbar(true);
    setOpen(false);
    setcompanyRef('');
    setpopform({
      gbpPaymentReference: '',
      usdPaymentReference: '',
      eurPaymentReference: '',
      gbpCollection: '',
      usdCollection: '',
      eurCollection: '',
      gbpRepaymentReference: '',
      usdRepaymentReference: '',
      eurRepaymentReference: '',
      gbpSurplusDistribution: '',
      usdSurplusDistribution: '',
      eurSurplusDistribution: ''
    });
  };

  const handleSnacbarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <MainContentWrapper>
        <Breadcumb
          breadCrumb={{
            page: 'Customers',
            data: ['Customers', 'Kantox Beneficiary References']
          }}
        />
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
              {isLoading ? (
                <Loader />
              ) : (
                <DataTable
                  kantoxAccounts={kantoxAccounts}
                  updateList={updateList}
                  handleSortData={handleSortData}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  handlePaginationAndUpdateList={handlePaginationAndUpdateList}
                  mainAPI={handleAPI}
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
          <DialogTitle id='responsive-dialog-title'>Add New Kantox Integration</DialogTitle>
          <DialogContent>
            <Grid item xs={12} sm={6}>
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
                  setCustomer(option.cuid);
                  setCustomerCustId(option.cust_id);
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
            <Grid item xs={12} sm={12}>
              <div className='wrap_colmn'>
                <label className='lbl_head'>Control Account Company Ref</label>
                <TextField
                  variant='outlined'
                  id='outlined-name'
                  label='Company Ref'
                  value={companyRef}
                  onChange={(e) => handleCompanyRefChange(e)}
                />
              </div>
            </Grid>

            <div className='pop_tbl'>
              <table>
                <tr>
                  <th>&nbsp;</th>
                  <th>GBP</th>
                  <th>USD</th>
                  <th>EUR</th>
                </tr>
                <tr>
                  <td className='lbl'>Advance Payment</td>
                  <td>
                    <TextField
                      variant='outlined'
                      id='outlined-name'
                      label='Beneficiary Reference'
                      value={popform.gbpPaymentReference}
                      name='gbpPaymentReference'
                      onChange={(e) => handleChange(e)}
                    />
                  </td>
                  <td>
                    <TextField
                      variant='outlined'
                      id='outlined-name'
                      label='Beneficiary Reference'
                      value={popform.usdPaymentReference}
                      name='usdPaymentReference'
                      onChange={(e) => handleChange(e)}
                    />
                  </td>
                  <td>
                    <TextField
                      variant='outlined'
                      id='outlined-name'
                      label='Beneficiary Reference'
                      name='eurPaymentReference'
                      value={popform.eurPaymentReference}
                      onChange={(e) => handleChange(e)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className='lbl'>Collection</td>
                  <td>
                    <TextField
                      variant='outlined'
                      id='outlined-name'
                      label='IBAN Number'
                      name='gbpCollection'
                      value={popform.gbpCollection}
                      onChange={(e) => handleChange(e)}
                    />
                  </td>
                  <td>
                    <TextField
                      variant='outlined'
                      id='outlined-name'
                      label='IBAN Number'
                      name='usdCollection'
                      value={popform.usdCollection}
                      onChange={(e) => handleChange(e)}
                    />
                  </td>
                  <td>
                    <TextField
                      variant='outlined'
                      id='outlined-name'
                      label='IBAN Number'
                      name='eurCollection'
                      value={popform.eurCollection}
                      onChange={(e) => handleChange(e)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className='lbl'>Advance Repayment</td>
                  <td>
                    <TextField
                      variant='outlined'
                      id='outlined-name'
                      label='Beneficiary Reference'
                      name='gbpRepaymentReference'
                      value={popform.gbpRepaymentReference}
                      onChange={(e) => handleChange(e)}
                    />
                  </td>
                  <td>
                    <TextField
                      variant='outlined'
                      id='outlined-name'
                      label='Beneficiary Reference'
                      name='usdRepaymentReference'
                      value={popform.usdRepaymentReference}
                      onChange={(e) => handleChange(e)}
                    />
                  </td>
                  <td>
                    <TextField
                      variant='outlined'
                      id='outlined-name'
                      label='Beneficiary Reference'
                      name='eurRepaymentReference'
                      value={popform.eurRepaymentReference}
                      onChange={(e) => handleChange(e)}
                    />
                  </td>
                </tr>
                <tr>
                  <td className='lbl'>Surplus Distribution</td>
                  <td>
                    <TextField
                      variant='outlined'
                      id='outlined-name'
                      label='Beneficiary Reference'
                      name='gbpSurplusDistribution'
                      value={popform.gbpSurplusDistribution}
                      onChange={(e) => handleChange(e)}
                    />
                  </td>
                  <td>
                    <TextField
                      variant='outlined'
                      id='outlined-name'
                      label='Beneficiary Reference'
                      name='usdSurplusDistribution'
                      value={popform.usdSurplusDistribution}
                      onChange={(e) => handleChange(e)}
                    />
                  </td>
                  <td>
                    <TextField
                      variant='outlined'
                      id='outlined-name'
                      label='Beneficiary Reference'
                      name='eurSurplusDistribution'
                      value={popform.eurSurplusDistribution}
                      onChange={(e) => handleChange(e)}
                    />
                  </td>
                </tr>
              </table>
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color='secondary'>
              Cancel
            </Button>
            <Button
              color='primary'
              onClick={handleConfirm}
              autoFocus
              disabled={companyRef ? false : true}
            >
              Confirm
            </Button>
          </DialogActions>
        </DialogContentWrapper>
      </StyledDialog>

      {addkantoxAccounts?.status === 'success' && (
        <>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleSnacbarClose}
            message='New customer added'
          />
        </>
      )}
      {addkantoxAccounts?.status === 'failure' && (
        <>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleSnacbarClose}
            message='Duplicate input error'
          />
        </>
      )}
      {kantoxCompanyReference?.data?.status === 'failure' && (
        <>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleSnacbarClose}
            message={kantoxCompanyReference?.data?.message?.data}
          />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  kantoxAccounts: state.kantoxAccounts.data,
  customerData: state.customerList.data,
  revenueSourceMasterList: state.revenueSourceMasterList.data,
  addkantoxAccounts: state.addkantoxAccounts.data,
  kantoxCompanyReference: state.kantoxCompanyReference
});

export default connect(mapStateToProps)(KontexReference);
