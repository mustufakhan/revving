/* eslint-disable no-console */
/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import MonthPicker from '@mui/lab/MonthPicker';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTheme } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';
// import { useSnackbar, VariantType } from 'notistack';
import locale from 'date-fns/locale/en-US';
import DateFnsUtils from '@date-io/date-fns';
// import { MonthPicker } from '@material-ui/lab';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Breadcumb from '../../../components/Breadcumb';
import DataTable from './DataTable';
import Loader from '../../../components/Loader';
import {
  MainContentWrapper,
  ContentBoxWrapper,
  StyledFormControl,
  StyledGrid,
  StyledButton,
  StyledDialog,
  DialogContentWrapper
} from './Styled';

// Props Interface
interface IProps {
  dispatch: Function;
  dataSource: {
    data: any;
    status: string;
  };
  revenueSourceList: {
    data: any;
    status: string;
  };
  workflowB: {
    data: any;
    status: string;
  };
  customerData: {
    data: any;
    status: string;
  };
  statusList: {
    data: any;
    status: string;
  };
  revenueSourceMasterList: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  addInvoiceData: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  updateTransactionalInvoice: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  CalculateBillingInvoice: {
    data: any;
    status: string;
  };
}

const WorkflowB: React.FC<IProps> = ({
  dispatch,
  dataSource,
  customerData,
  statusList,
  revenueSourceList,
  updateTransactionalInvoice,
  workflowB,
  addInvoiceData,
  revenueSourceMasterList,
  CalculateBillingInvoice
}: IProps) => {
  // const [currencyValue, setCurrencyValue] = useState('');
  const [customerValue, setCustomer] = useState('');
  const [revenueSource, setRevenueSource] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [billingStartDate, setBillingStartDate] = useState<Date | string | null>(null);
  const [billingEndDate, setBillingEndDate] = useState<Date | string | null>(null);
  const [repaymentCalendar, setRepaymentCalendar] = useState('');
  const [popsourceChange, setPopsourceChange] = useState<Date | string | null>(null);
  const initialRender = useRef({ initial: true });
  const [isLoading, setIsLoading] = useState(false);
  // const eventClick = useRef({ value: '' });
  // const { enqueueSnackbar } = useSnackbar();
  // const [calendar, setAdvanceCalendar] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [assignmentStatus, setAssignmentStatus] = useState('');
  const [haircutStatus, setHaircutStatus] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [currencyName, setcurrencyName] = useState('');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  // const lastDay = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0);
  const currency = ['USD', 'EUR', 'GBP'];
  const calcInvoiceValue = `REV${Math.floor(1000 + Math.random() * 9000)}`;
  // const getdate = new Date();
  const [dreportdata, setReportData] = useState({
    popcustomer: '',
    poprevenueSource: '',
    // popcurrency: '',
    popissueDate: null,
    popInvNo: calcInvoiceValue,
    popissueMonth: null,
    popissueYear: null,
    poprevenueUuid: '',
    popCustomerCuid: '',
    popexpRepaymentDate: null,
    popGrossValue: ''
  });
  const repaymentnewDate = new Date();
  const repaymentfirstDay = new Date(
    repaymentnewDate.getFullYear(),
    repaymentnewDate.getMonth(),
    1
  );

  const prevRepaymentMonthLastDate = new Date(
    repaymentnewDate.getFullYear(),
    repaymentnewDate.getMonth(),
    0
  );

  const prevRepaymentMonthFirstDate = new Date(
    repaymentnewDate.getFullYear() - (repaymentnewDate.getMonth() > 0 ? 0 : 1),
    (repaymentnewDate.getMonth() - 1 + 12) % 12,
    1
  );

  if (locale && locale.options) {
    locale.options.weekStartsOn = 1;
  }

  // workflowB updating and loader
  useEffect(() => {
    setIsLoading(false);
  }, [workflowB]);

  useEffect(() => {
    setReportData((prevState: any) => ({
      ...prevState,
      popexpRepaymentDate: CalculateBillingInvoice
        ? CalculateBillingInvoice.data?.expected_payment_date
        : null,
      popissueMonth: CalculateBillingInvoice ? CalculateBillingInvoice?.data?.billing_month : null,
      popissueYear: CalculateBillingInvoice ? CalculateBillingInvoice?.data?.billing_year : null,
      popissueDate: CalculateBillingInvoice ? CalculateBillingInvoice?.data?.issue_date : null
    }));
  }, [CalculateBillingInvoice]);

  // Calling api for Email MetaData list
  useEffect(() => {
    // Data source api calling
    dispatch({
      type: 'DATA_SOURCE',
      payload: {
        page: 1,
        rowsPerPage: 100,
        orderBy: 'created_at'
      }
    });

    // Status list api call
    dispatch({
      type: 'GET_STATUS_LIST'
    });

    // Get customer list api call
    dispatch({
      type: 'GET_CUSTOMER_LIST',
      payload: {
        page: 1,
        rowsPerPage: '',
        orderBy: 'created_at'
      }
    });

    // Get Revenue Master list
    dispatch({
      type: 'REVENUE_SOURCE_MASTER_LIST',
      payload: {}
    });

    dispatch({
      type: 'REVENUE_SOURCE_LIST',
      payload: {}
    });
  }, [dispatch]);

  // // Handle Revenue Source api
  // useEffect(() => {
  //   if (currencyValue) {
  //     dispatch({
  //       type: 'REVENUE_SOURCE_LIST',
  //       payload: {
  //         dataSource: currencyValue,
  //         page: 1,
  //         rowsPerPage: 1000,
  //         orderBy: 'created_at'
  //       }
  //     });
  //   }
  // }, [dispatch, currencyValue]);

  // useEffect(() => {
  //   if (updateTransactionalInvoice?.status == 'success') {
  //     dispatch({
  //       type: 'NATIONAL_INVOICE',
  //       payload: {
  //         page: page + 1,
  //         rowsPerPage,
  //         paymentStatus,
  //         assignmentStatus,
  //         haircutStatus,
  //         customer: customerValue ? customerValue : '',
  //         revenueSource: revenueSource ? revenueSource : '',
  //         billingStartDate,
  //         billingEndDate,
  //         orderBy
  //       }
  //     });
  //   }
  // }, [updateTransactionalInvoice?.data]);

  // Calling NATIONAL_INVOICE api
  useEffect(() => {
    dispatch({
      type: 'NATIONAL_INVOICE',
      payload: {
        page: page + 1,
        rowsPerPage,
        paymentStatus,
        assignmentStatus,
        haircutStatus,
        customer: customerValue ? customerValue : '',
        revenueSource: revenueSource ? revenueSource : '',
        billingStartDate,
        billingEndDate,
        orderBy
      }
    });
    setTimeout(() => {
      initialRender.current.initial = false;
    });
  }, [
    customerValue,
    dispatch,
    billingEndDate,
    paymentStatus,
    assignmentStatus,
    haircutStatus,
    page,
    revenueSource,
    rowsPerPage,
    billingStartDate,
    orderBy
  ]);
  // Handle handleIssuedDate
  const handleBillingDate = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (event.target.value === 'month_to_date') {
      setBillingStartDate(moment(repaymentfirstDay).format('YYYY-MM-DD'));
      setBillingEndDate(moment(repaymentnewDate).format('YYYY-MM-DD'));
    }
    if (event.target.value === 'last_month') {
      setBillingStartDate(moment(prevRepaymentMonthFirstDate).format('YYYY-MM-DD'));
      setBillingEndDate(moment(prevRepaymentMonthLastDate).format('YYYY-MM-DD'));
    }
    if (event.target.value === '') {
      setBillingStartDate(null);
      setBillingEndDate(null);
    }
    setRepaymentCalendar(event.target.value as string);
  };

  const handleRepaymentStartDate = (date: Date | null) => {
    setIsLoading(true);
    setBillingStartDate(date ? moment(date).format('YYYY-MM-DD') : null);
  };

  // Handle End Date
  const handleRepaymentEndDate = (date: Date | null) => {
    setIsLoading(true);
    setBillingEndDate(date ? moment(date).format('YYYY-MM-DD') : null);
  };

  const handlePaymentStatus = (event: ChangeEvent<{ value: unknown }>) => {
    setPaymentStatus(event.target.value as string);
  };

  const handleAssignmentStatus = (event: ChangeEvent<{ value: unknown }>) => {
    setAssignmentStatus(event.target.value as string);
  };

  const handleHaircutStatus = (event: ChangeEvent<{ value: unknown }>) => {
    setHaircutStatus(event.target.value as string);
  };

  // Handle Customer
  const handleChangeCustomer = (event: ChangeEvent<{ value: unknown }>) => {
    setIsLoading(true);
    setCustomer(event.target.value as string);
  };

  // Handle Revenue Source
  const handleRevenueSource = (event: ChangeEvent<{ value: unknown }>) => {
    setIsLoading(true);
    setRevenueSource(event.target.value as string);
  };

  // Callback for update
  const updateList = () => {
    dispatch({
      type: 'NATIONAL_INVOICE',
      payload: {
        page: page + 1,
        rowsPerPage,
        paymentStatus,
        assignmentStatus,
        haircutStatus,
        customer: customerValue ? customerValue : '',
        revenueSource: revenueSource ? revenueSource : '',
        billingStartDate,
        billingEndDate,
        orderBy
      }
    });
  };

  // useEffect(() => {
  //   const handleSnack = (variant: VariantType) => {
  //     enqueueSnackbar(
  //       addInvoiceData.message.data ? addInvoiceData.message.data : addInvoiceData.message,
  //       {
  //         variant
  //       }
  //     );
  //   };
  //   if (addInvoiceData?.status === 'success' && open && !initialRender.current.initial) {
  //     dispatch({
  //       type: 'NATIONAL_INVOICE',
  //       payload: {
  //         page: page + 1,
  //         rowsPerPage,
  //         paymentStatus,
  //         assignmentStatus,
  //         haircutStatus,
  //         customer: customerValue ? customerValue : '',
  //         revenueSource: revenueSource ? revenueSource : '',
  //         billingStartDate,
  //         billingEndDate,
  //         orderBy
  //       }
  //     });
  //     setOpen(false);
  //     setReportData({
  //       popcustomer: '',
  //       poprevenueSource: '',
  //       popcurrency: '',
  //       popissueDate: null,
  //       popInvNo: calcInvoiceValue,
  //       popissueMonth: null,
  //       popissueYear: null,
  //       poprevenueUuid: '',
  //       popCustomerCuid: '',
  //       popexpRepaymentDate: null,
  //       popGrossValue: ''
  //     });
  //     setIsLoading(false);
  //   }
  //   if (addInvoiceData?.status === 'failure') {
  //     handleSnack('error');
  //     setIsLoading(false);
  //   }
  // }, [
  //   dispatch,
  //   open,
  //   addInvoiceData,
  //   page,
  //   rowsPerPage,
  //   orderBy,
  //   customerValue,
  //   billingEndDate,
  //   billingStartDate,
  //   assignmentStatus,
  //   calcInvoiceValue,
  //   revenueSource,
  //   haircutStatus,
  //   paymentStatus,
  //   enqueueSnackbar
  // ]);

  const handleMainApi = () => {
    dispatch({
      type: 'NATIONAL_INVOICE',
      payload: {
        page: page + 1,
        rowsPerPage,
        paymentStatus,
        assignmentStatus,
        haircutStatus,
        customer: customerValue ? customerValue : '',
        revenueSource: revenueSource ? revenueSource : '',
        billingStartDate,
        billingEndDate,
        orderBy
      }
    });
    dispatch({
      type: 'BILLING_CLEAR'
    });
  };

  // Handle page and rowsperPage
  const handlePaginationAndUpdateList = (type: string, value: number) => {
    initialRender.current.initial = true;
    if (type === 'page') {
      dispatch({
        type: 'NATIONAL_INVOICE'
      });
      setPage(value);
    } else {
      dispatch({
        type: 'NATIONAL_INVOICE',
        payload: {
          page: 1,
          rowsPerPage: value,
          paymentStatus,
          assignmentStatus,
          haircutStatus,
          customer: customerValue ? customerValue : '',
          revenueSource: revenueSource ? revenueSource : '',
          billingStartDate,
          billingEndDate,
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
      type: 'NATIONAL_INVOICE',
      payload: {
        page: page + 1,
        rowsPerPage,
        customer: customerValue ? customerValue : '',
        revenueSource: revenueSource ? revenueSource : '',
        paymentStatus,
        assignmentStatus,
        haircutStatus,
        billingStartDate,
        billingEndDate,
        orderBy: !isAsyn ? property : `-${property}`
      }
    });
    setOrderBy(property);
    setTimeout(() => {
      initialRender.current.initial = false;
    }, 500);
  };

  // Handle Close Modal
  const handleClose = () => {
    setOpen(false);
    setPopsourceChange('');
    setcurrencyName('');
    setReportData({
      popcustomer: '',
      poprevenueSource: '',
      // popcurrency: '',
      popissueDate: null,
      popInvNo: calcInvoiceValue,
      popissueMonth: null,
      popissueYear: null,
      poprevenueUuid: '',
      popCustomerCuid: '',
      popexpRepaymentDate: null,
      popGrossValue: ''
    });
  };

  // Handle Open Modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handlepopChange = (e: any) => {
    console.log(e.target.value, 'e.target.value');
    setReportData((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
    setcurrencyName(currencyName);
  };

  const handlepopCustomerChange = (e: any, id: any = null) => {
    setReportData((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      popCustomerCuid: id.props.id
    }));

    if (id && id.props) {
      dispatch({
        type: 'REVENUE_SOURCE_LIST',
        payload: {
          customer: id?.props?.id
        }
      });
    }
  };

  const handlepoprevenueChange = (e: any, id: any) => {
    const selectedRevenue =
      revenueSourceList.data.results.length > 0
        ? revenueSourceList.data.results.filter((val: any) => val.pk === id.props.id)
        : null;
    setReportData((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      poprevenueSource: id.props.id,
      poprevenueUuid: selectedRevenue[0].uuid
    }));
    setPopsourceChange(e.target.value);
    setcurrencyName(selectedRevenue[0].currency);
  };

  const handlepopexpRepaymentdate = (e: any) => {
    setReportData((prevState: any) => ({
      ...prevState,
      popexpRepaymentDate: e ? moment(e).format('YYYY-MM-DD') : null
    }));
  };

  const handlepopisusedate = (e: any) => {
    setReportData((prevState: any) => ({
      ...prevState,
      popissueDate: e ? moment(e).format('YYYY-MM-DD[T]HH:mm:ss') : null
    }));
    dispatch({
      type: 'CALCULATE_BILLING_INVOICE',
      payload: {
        customer_cuid: dreportdata.popCustomerCuid,
        issue_date: moment(e).format('YYYY-MM-DD'),
        revenue_source_uuid: dreportdata.poprevenueUuid
      }
    });
  };

  const handlepopisusemonth = (e: any) => {
    console.log(moment(e).format('MM'), 'popissueMonth');
    setReportData((prevState: any) => ({
      ...prevState,
      popissueMonth: e ? moment(e).format('MM') : null
      // popissueYear: e ? moment(e).format('yyyy') : null
    }));

    dispatch({
      type: 'CALCULATE_BILLING_INVOICE',
      payload: {
        customer_cuid: dreportdata.popCustomerCuid,
        billing_month: moment(e).format('MM'),
        billing_year: moment(e).format('yyyy'),
        revenue_source_uuid: dreportdata.poprevenueUuid
      }
    });
  };

  const handlepopisuseyear = (e: any) => {
    setReportData((prevState: any) => ({
      ...prevState,
      popissueMonth: e ? moment(e).format('MM') : null,
      popissueYear: e ? moment(e).format('yyyy') : null
    }));

    dispatch({
      type: 'CALCULATE_BILLING_INVOICE',
      payload: {
        customer_cuid: dreportdata.popCustomerCuid,
        billing_month: moment(e).format('MM'),
        billing_year: moment(e).format('yyyy'),
        revenue_source_uuid: dreportdata.poprevenueUuid
      }
    });
  };

  const handlepopConfirm = () => {
    dispatch({
      type: 'ADD_INVOICE_DATA_SOURCE',
      payload: {
        ...dreportdata,
        modalCurrency: currencyName,
        adjustedDate: moment(CalculateBillingInvoice?.data?.expected_payment_date).format(
          'YYYY-MM-DD[T]HH:mm:ss'
        ),
        issueDate: moment(CalculateBillingInvoice?.data?.issue_date).format('YYYY-MM-DD[T]HH:mm:ss')
      }
    });
    // dispatch({
    //   type: 'NATIONAL_INVOICE',
    //   payload: {
    //     page: page + 1,
    //     rowsPerPage,
    //     paymentStatus,
    //     assignmentStatus,
    //     haircutStatus,
    //     customer: customerValue ? customerValue : '',
    //     revenueSource: revenueSource ? revenueSource : '',
    //     billingStartDate,
    //     billingEndDate,
    //     orderBy
    //   }
    // });
    setReportData({
      popcustomer: '',
      poprevenueSource: '',
      // popcurrency: '',
      popissueDate: null,
      popInvNo: calcInvoiceValue,
      popissueMonth: null,
      popissueYear: null,
      poprevenueUuid: '',
      popCustomerCuid: '',
      popexpRepaymentDate: null,
      popGrossValue: ''
    });
    setPopsourceChange('');
    setOpenSnackbar(true);
    setOpen(false);
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
            page: 'Month-End Invoices',
            data: ['Month-End Invoices', 'Matched Transactional Invoice']
          }}
        />
        <ContentBoxWrapper>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Payment Status</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={paymentStatus}
                  onChange={handlePaymentStatus}
                  label='Payment Status'
                >
                  <MenuItem key='no-value-customer' value=''>
                    All
                  </MenuItem>
                  <MenuItem value='Overdue'>Overdue</MenuItem>
                  <MenuItem value='Open'>Open</MenuItem>
                  <MenuItem value='Closed'>Closed</MenuItem>
                </Select>
              </StyledFormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Assignment Status</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={assignmentStatus}
                  onChange={handleAssignmentStatus}
                  label='Assignment Status'
                >
                  <MenuItem key='no-value-customer' value=''>
                    All
                  </MenuItem>
                  <MenuItem value='1'>Pending</MenuItem>
                  <MenuItem value='3'>Assigned</MenuItem>
                  <MenuItem value='2'>Unassigned</MenuItem>
                  <MenuItem value='0'>Investigate</MenuItem>
                </Select>
              </StyledFormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Collateral Status</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={haircutStatus}
                  onChange={handleHaircutStatus}
                  label='Haircut Status'
                >
                  <MenuItem key='no-value-customer' value=''>
                    All
                  </MenuItem>
                  {/* <MenuItem value='OK'>OK</MenuItem> */}
                  <MenuItem value='Shortfall'>Shortfall</MenuItem>
                  <MenuItem value='Surplus'>Surplus</MenuItem>
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
                  if (option.name === value.name) {
                    setCustomer(option.name);
                  }
                  return option.name === value.name;
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
              {/* <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Customer</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={customerValue}
                  onChange={handleChangeCustomer}
                  label='Customer'
                >
                  <MenuItem key='no-value-customer' value=''>
                    All
                  </MenuItem>
                  {customerData?.status === 'success' &&
                    customerData.data &&
                    customerData.data?.results.length &&
                    customerData.data?.results.map((data: any) => (
                      <MenuItem key={data.cuid} value={data.name}>
                        {data.name}
                      </MenuItem>
                    ))}
                </Select>
              </StyledFormControl> */}
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                className='auto_drop'
                id='master-dropdown-datasource'
                options={
                  (revenueSourceMasterList?.status === 'success' &&
                    revenueSourceMasterList?.data &&
                    revenueSourceMasterList?.data?.length &&
                    revenueSourceMasterList?.data) ||
                  []
                }
                getOptionLabel={(option: any) => option.name}
                getOptionSelected={(option: any, value: any) => {
                  if (option.uuid === value.uuid) {
                    setRevenueSource(option.uuid);
                  }
                  return option.uuid === value.uuid;
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Revenue Source Master'
                    variant='outlined'
                    value={(e: any) => {}}
                    onChange={(e) => handleRevenueSource(e)}
                  />
                )}
              />
              {/* <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Revenue Source</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={revenueSource}
                  onChange={handleRevenueSource}
                  label='Revenue Source'
                >
                  <MenuItem key='no-value-customer' value=''>
                    All
                  </MenuItem>
                  {revenueSourceMasterList?.status === 'success' &&
                    revenueSourceMasterList?.data &&
                    revenueSourceMasterList?.data.length &&
                    revenueSourceMasterList.data.map((data: any) => (
                      <MenuItem key={data.uuid} value={data.uuid}>
                        {data.name}
                      </MenuItem>
                    ))}
                </Select>
              </StyledFormControl> */}
            </Grid>

            <Grid item xs={12} sm={4}>
              <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Billing date</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={repaymentCalendar}
                  onChange={handleBillingDate}
                  label='Billing date'
                >
                  <MenuItem key='no-value-status-no' value=''>
                    All
                  </MenuItem>
                  <MenuItem key='no-value-status' value='month_to_date'>
                    Month to date
                  </MenuItem>
                  <MenuItem key='no-value-status' value='last_month'>
                    Last month
                  </MenuItem>
                  <MenuItem key='no-value-status' value='custom'>
                    Custom
                  </MenuItem>
                </Select>
              </StyledFormControl>
            </Grid>
            {repaymentCalendar === 'month_to_date' && (
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
                <StyledGrid item xs={12} sm={4}>
                  <KeyboardDatePicker
                    margin='normal'
                    id='from-picker-dialog'
                    label='From'
                    format='dd/MM/yyyy'
                    value={repaymentfirstDay}
                    onChange={handleRepaymentStartDate}
                    disabled
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </StyledGrid>
                <StyledGrid item xs={12} sm={4}>
                  <KeyboardDatePicker
                    margin='normal'
                    id='to-picker-dialog'
                    label='To'
                    format='dd/MM/yyyy'
                    value={repaymentnewDate}
                    onChange={handleRepaymentEndDate}
                    disabled
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </StyledGrid>
              </MuiPickersUtilsProvider>
            )}
            {repaymentCalendar === 'last_month' && (
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
                <StyledGrid item xs={12} sm={4}>
                  <KeyboardDatePicker
                    margin='normal'
                    id='from-picker-dialog'
                    label='From'
                    format='dd/MM/yyyy'
                    value={prevRepaymentMonthFirstDate}
                    onChange={handleRepaymentStartDate}
                    disabled
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </StyledGrid>
                <StyledGrid item xs={12} sm={4}>
                  <KeyboardDatePicker
                    margin='normal'
                    id='to-picker-dialog'
                    label='To'
                    format='dd/MM/yyyy'
                    value={prevRepaymentMonthLastDate}
                    onChange={handleRepaymentEndDate}
                    disabled
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </StyledGrid>
              </MuiPickersUtilsProvider>
            )}
            {repaymentCalendar === 'custom' && (
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
                <StyledGrid item xs={12} sm={4}>
                  <KeyboardDatePicker
                    margin='normal'
                    id='from-picker-dialog'
                    label='From'
                    format='dd/MM/yyyy'
                    value={billingStartDate}
                    onChange={handleRepaymentStartDate}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </StyledGrid>
                <StyledGrid item xs={12} sm={4}>
                  <KeyboardDatePicker
                    margin='normal'
                    id='to-picker-dialog'
                    label='To'
                    format='dd/MM/yyyy'
                    value={billingEndDate}
                    onChange={handleRepaymentEndDate}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </StyledGrid>
              </MuiPickersUtilsProvider>
            )}
          </Grid>

          <Grid container spacing={3} justify='space-between' alignItems='center'>
            <Grid xs={12} sm={2} justify='flex-end' className='addColumn'>
              <StyledButton variant='outlined' color='primary' onClick={handleClickOpen}>
                Add Invoice
              </StyledButton>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              {isLoading && <Loader />}
              {!isLoading && (
                <DataTable
                  workflowB={workflowB}
                  updateList={updateList}
                  handleSortData={handleSortData}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  handlePaginationAndUpdateList={handlePaginationAndUpdateList}
                  mainAPI={() => handleMainApi()}
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
          <DialogTitle id='responsive-dialog-title'>Add Invoice Data</DialogTitle>
          <DialogContent>
            <Grid xs={12}>
              <FormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Customer</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={dreportdata.popcustomer}
                  onChange={(e, id) => handlepopCustomerChange(e, id)}
                  label='Customer'
                  name='popcustomer'
                >
                  {/* <MenuItem key='no-value-customer' value=''>
                    All
                  </MenuItem> */}
                  {customerData?.status === 'success' &&
                    customerData.data &&
                    customerData.data?.results.length &&
                    customerData.data?.results.map((data: any) => (
                      <MenuItem key={data.cuid} value={data.name} id={data.cuid}>
                        {data.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <FormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Revenue Source</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={popsourceChange}
                  // disabled={revenueSourceList?.data?.results.length < 0 ? false : true}
                  disabled={dreportdata.popcustomer === '' ? true : false}
                  onChange={(e, id) => {
                    handlepoprevenueChange(e, id);
                  }}
                  label='Revenue Source'
                  name='poprevenueSource'
                >
                  {/* <MenuItem key='no-value-customer' value=''>
                    All
                  </MenuItem> */}

                  {revenueSourceList?.status === 'success' &&
                  revenueSourceList?.data &&
                  revenueSourceList?.data?.results.length > 0 ? (
                    revenueSourceList.data?.results.map((data: any) => (
                      <MenuItem key={data.uuid} value={data.name} id={data.pk}>
                        {data.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem key='no-value-customer' disabled>
                      No revenue source is available
                    </MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Currency</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  // value={dreportdata.popcurrency ? dreportdata.popcurrency : currencyName}
                  value={currencyName}
                  onChange={(e) => handlepopChange(e)}
                  label='Currency'
                  name='popcurrency'
                >
                  {/* <MenuItem key='no-value-ds' value=''>
                    All
                  </MenuItem> */}
                  {/* {currency.map((data: any) => (
                    <MenuItem key={data} value={data}>
                      {data}
                    </MenuItem>
                  ))} */}
                  {currencyName ? (
                    <MenuItem key={currencyName} value={currencyName}>
                      {currencyName}
                    </MenuItem>
                  ) : (
                    currency.map((data: any) => (
                      <MenuItem key={data} value={data}>
                        {data}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant='outlined'>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
                  {/* <MuiPickersUtilsProvider libInstance={moment} utils={DateFnsUtils}> */}
                  <KeyboardDatePicker
                    margin='normal'
                    id='to-picker-dialog'
                    label='Issue date'
                    format='dd/MM/yyyy'
                    value={dreportdata.popissueDate ? dreportdata.popissueDate : null}
                    disabled={popsourceChange === null ? true : false}
                    name='popissueDate'
                    onChange={(e) => handlepopisusedate(e)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </Grid>
            <Grid item xs={12} className='wrap_field'>
              <Grid item xs={6} style={{ paddingRight: '10px' }}>
                <FormControl variant='outlined'>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
                    {/* <MuiPickersUtilsProvider libInstance={moment} utils={DateFnsUtils}> */}

                    <KeyboardDatePicker
                      margin='normal'
                      id='to-picker-dialog1'
                      label='Billing year'
                      value={dreportdata.popissueYear ? dreportdata.popissueYear + '' : null}
                      name='popissueYear'
                      openTo='year'
                      disabled={popsourceChange === null ? true : false}
                      format='yyyy'
                      views={['year']}
                      onChange={(e) => handlepopisuseyear(e)}
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant='outlined'>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
                    {/* <MuiPickersUtilsProvider libInstance={moment} utils={DateFnsUtils}> */}
                    <KeyboardDatePicker
                      disableToolbar
                      variant='inline'
                      format='MM'
                      views={['month']}
                      margin='normal'
                      id='date-picker-inline'
                      disabled={popsourceChange === null ? true : false}
                      label='Billing month'
                      value={dreportdata.popissueMonth ? dreportdata.popissueMonth + '' : null}
                      onChange={(e) => handlepopisusemonth(e)}
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                    />
                    {/* <KeyboardDatePicker
                      
                      margin='normal'
                      id='to-picker-dialog1'
                      label='Issue month'
                      value={dreportdata.popissueMonth ? dreportdata.popissueMonth + '' : null}
                      name='popissueMonth'
                      disabled={popsourceChange === null ? true : false}
                      openTo='month'
                      format='MM'
                      views={['month']}
                      InputLabelProps={{ shrink: dreportdata.popissueMonth ? true : false }}
                      onChange={(e) => handlepopisusemonth(e)}
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                    /> */}
                  </MuiPickersUtilsProvider>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant='outlined'>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
                  {/* <MuiPickersUtilsProvider libInstance={moment} utils={DateFnsUtils}> */}
                  <KeyboardDatePicker
                    margin='normal'
                    id='to-picker-dialog'
                    label='Expected Repayment Date'
                    format='dd/MM/yyyy'
                    value={dreportdata.popexpRepaymentDate}
                    name='popexpRepaymentDate'
                    onChange={(e) => handlepopexpRepaymentdate(e)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </Grid>

            <Grid xs={12}>
              <TextField
                id='outlined-textarea'
                label='Inovice Number'
                placeholder='Enter inovice number'
                variant='outlined'
                value={dreportdata.popInvNo}
                disabled
                name='popInvNo'
                onChange={(e) => handlepopChange(e)}
              />
            </Grid>

            <Grid xs={12}>
              <TextField
                id='outlined-textarea'
                label='Gross value'
                placeholder='Gross value'
                variant='outlined'
                value={dreportdata.popGrossValue}
                name='popGrossValue'
                onChange={(e) => handlepopChange(e)}
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button autoFocus color='secondary' onClick={handleClose}>
              Cancel
            </Button>
            <Button
              color='primary'
              disabled={
                dreportdata.popGrossValue &&
                dreportdata.popInvNo &&
                dreportdata.popexpRepaymentDate &&
                dreportdata.popissueMonth &&
                dreportdata.popissueYear &&
                dreportdata.popissueDate &&
                dreportdata.popcustomer
                  ? false
                  : true
              }
              onClick={handlepopConfirm}
              autoFocus
            >
              Confirm
            </Button>
          </DialogActions>
        </DialogContentWrapper>
      </StyledDialog>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnacbarClose}
        message='Your invoice has been added for approval'
      />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  dataSource: state.dataSource.data,
  customerData: state.customerList.data,
  statusList: state.statusList.data,
  revenueDataList: state.revenueDataList.data,
  revenueSourceList: state.revenueSourceList.data,
  revenueSourceMasterList: state.revenueSourceMasterList.data,
  workflowB: state.workflowB.data,
  addInvoiceData: state.addInvoiceData.data,
  CalculateBillingInvoice: state.CalculateBillingInvoice.data,
  updateTransactionalInvoice: state.updateTransactionalInvoice.data
});

export default connect(mapStateToProps)(WorkflowB);
