/* eslint-disable @typescript-eslint/indent */
/* eslint-disable no-console */
import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
// import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DialogContent from '@material-ui/core/DialogContent';
import Snackbar from '@material-ui/core/Snackbar';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { FormControl } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
// import { useSnackbar, VariantType } from 'notistack';
import locale from 'date-fns/locale/en-US';
import DateFnsUtils from '@date-io/date-fns';
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
  CalculateBillingInvoice: {
    data: any;
    status: string;
  };
  workflowA: {
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
  addReportData: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  revenueSourceMasterList: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
}

// Error Interface
// interface IError {
//   popcustomer?: string;
//   poprevenueSource?: string;
//   popcurrency?: string;
//   popissueDate?: string;
//   popInvoiceNumber?: string;
//   popGrossValue?: number;
// }

const WorkflowA: React.FC<IProps> = ({
  dispatch,
  dataSource,
  customerData,
  statusList,
  revenueSourceList,
  workflowA,
  addReportData,
  revenueSourceMasterList,
  CalculateBillingInvoice
}: IProps) => {
  // const [currencyValue, setCurrencyValue] = useState('');
  const [customerValue, setCustomer] = useState('');
  // const [popcustomerValue, setpopCustomer] = useState('');
  // const [poprevenuesource, setrevenuesource] = useState('');
  // const [popGrossValue, setGrossValue] = useState('');
  const [revenueSource, setRevenueSource] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [issuedStartDate, setIssuedStartDate] = useState<Date | string | null>(null);
  const [issuedEndDate, setIssuedEndDate] = useState<Date | string | null>(null);
  const [billingStartDate, setBillingStartDate] = useState<Date | string | null>(null);
  const [billingEndDate, setBillingEndDate] = useState<Date | string | null>(null);
  const [popsourceChange, setPopsourceChange] = useState<Date | string | null>(null);
  // const [popissueDate, setpopissueDate] = useState<Date | string | null>(null);
  // const [popinvoiceNumber, setpopinvoiceNumber] = useState<Date | string | null>(null);
  const [repaymentCalendar, setRepaymentCalendar] = useState('');
  const initialRender = useRef({ initial: true });
  const [actions, setActions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [orderBy, setOrderBy] = useState('');
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [currencyName, setcurrencyName] = useState('');
  const currency = ['USD', 'EUR', 'GBP'];

  const calcInvoiceValue = `REV${Math.floor(1000 + Math.random() * 9000)}`;

  const [dreportdata, setReportData] = useState({
    popcustomer: '',
    poprevenueSource: '',
    // popcurrency: '',
    popissueDate: null,
    popInvNo: calcInvoiceValue,
    popGrossValue: '',
    poprevenueUuid: '',
    popCustomerCuid: '',
    popAdjustedDate: null
  });

  // const eventClick = useRef({ value: '' });
  // const { enqueueSnackbar } = useSnackbar();
  const [calendar, setAdvanceCalendar] = useState('');
  const AdvancenewDate = new Date();
  const AdvancefirstDay = new Date(AdvancenewDate.getFullYear(), AdvancenewDate.getMonth(), 1);
  // const [invoiceType, setInvoiceType] = useState('');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  // const currency = ['USD', 'EUR', 'GBD'];
  // const lastDay = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0);
  const repaymentnewDate = new Date();
  const repaymentfirstDay = new Date(
    repaymentnewDate.getFullYear(),
    repaymentnewDate.getMonth(),
    1
  );

  const prevAdvanceMonthFirstDate = new Date(
    AdvancenewDate.getFullYear() - (AdvancenewDate.getMonth() > 0 ? 0 : 1),
    (AdvancenewDate.getMonth() - 1 + 12) % 12,
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
  const prevAdvanceMonthLastDate = new Date(
    AdvancenewDate.getFullYear(),
    AdvancenewDate.getMonth(),
    0
  );

  if (locale && locale.options) {
    locale.options.weekStartsOn = 1;
  }

  // workflowA updating and loader
  useEffect(() => {
    setIsLoading(false);
  }, [workflowA]);

  useEffect(() => {
    customerData?.data?.results.unshift({ name: 'All' });
  }, [customerData?.data?.results]);

  useEffect(() => {
    revenueSourceMasterList?.data.unshift({ name: 'All' });
  }, [revenueSourceMasterList?.data]);

  useEffect(() => {
    setReportData((prevState: any) => ({
      ...prevState,
      popAdjustedDate: CalculateBillingInvoice
        ? CalculateBillingInvoice.data?.expected_payment_date
        : null
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

  // Calling ACCOUNTING_DETAILS api
  useEffect(() => {
    // setIsLoading(true);
    dispatch({
      type: 'ACCOUNTING_DETAILS',
      payload: {
        page: page + 1,
        rowsPerPage,
        customer: customerValue ? customerValue : '',
        billingStartDate,
        issuedStartDate,
        issuedEndDate,
        billingEndDate,
        revenueSource: revenueSource ? revenueSource : '',
        actions,
        orderBy
      }
    });
    setTimeout(() => {
      initialRender.current.initial = false;
    });
  }, [
    customerValue,
    dispatch,
    issuedEndDate,
    billingEndDate,
    page,
    revenueSource,
    actions,
    rowsPerPage,
    issuedStartDate,
    billingStartDate,
    orderBy
  ]);

  // Validation of user fields
  //  const handleValidate = () => {
  //   let validRes = { errors: {}, isValid: false };
  //   validRes = validate(dsource, validationRules);
  //   setError(validRes.errors);
  //   return validRes.isValid;
  // };

  // Handle On Change

  // const handlepopInovoiceNumber = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   const calcInvoiceValue = `INV${Math.floor(1000 + Math.random() * 9000)}`;
  //   setpopinvoiceNumber(calcInvoiceValue);
  // };

  const handlepopChange = (e: any, id: any = null) => {
    // eslint-disable-next-line no-console
    setReportData((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
    setcurrencyName(currencyName);
  };

  const handlepopCustomerChange = (e: any, id: any = null) => {
    // eslint-disable-next-line no-console
    setReportData((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      popCustomerCuid: id.props.id
    }));
    // eslint-disable-next-line no-console
    if (id && id.props) {
      dispatch({
        type: 'REVENUE_SOURCE_LIST',
        payload: {
          customer: id?.props?.id,
          dataSource: null
        }
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handlepoprevenueChange = (e: any, id: any, revenueSourceList: any) => {
    const selectedRevenue = revenueSourceList.data.results.filter(
      (val: any) => val.pk === id.props.id
    );
    // eslint-disable-next-line no-console
    setcurrencyName(selectedRevenue[0].currency);
    setReportData((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      poprevenueSource: id.props.id,
      poprevenueUuid: selectedRevenue[0].uuid
    }));
    setPopsourceChange(e.target.value);
  };

  const handlepopisusedate = (e: any) => {
    setReportData((prevState: any) => ({
      ...prevState,
      popissueDate: e ? moment(e).format('YYYY-MM-DD[T]HH:mm:ss') : null
    }));

    if (dreportdata.popCustomerCuid && dreportdata.poprevenueUuid) {
      dispatch({
        type: 'CALCULATE_BILLING_INVOICE',
        payload: {
          customer_cuid: dreportdata.popCustomerCuid,
          issue_date: moment(e).format('YYYY-MM-DD'),
          revenue_source_uuid: dreportdata.poprevenueUuid
        }
      });
    }
  };

  const handleadjusteddate = (e: any) => {
    setReportData((prevState: any) => ({
      ...prevState,
      popAdjustedDate: e ? moment(e).format('YYYY-MM-DD') : null
    }));
  };

  const handlepopConfirm = () => {
    dispatch({
      type: 'ADD_REPORT_DATA_SOURCE',
      payload: {
        ...dreportdata,
        modalCurrency: currencyName,
        adjustedDate: moment(CalculateBillingInvoice?.data?.expected_payment_date).format(
          'YYYY-MM-DD[T]HH:mm:ss'
        )
      }
    });

    dispatch({
      type: 'ACCOUNTING_DETAILS',
      payload: {
        page: page + 1,
        rowsPerPage,
        customer: customerValue ? customerValue : '',
        billingStartDate,
        issuedStartDate,
        issuedEndDate,
        billingEndDate,
        revenueSource: revenueSource ? revenueSource : '',
        actions,
        orderBy
      }
    });
    setReportData({
      popcustomer: '',
      poprevenueSource: '',
      // popcurrency: '',
      popissueDate: null,
      popInvNo: '',
      popGrossValue: '',
      poprevenueUuid: '',
      popCustomerCuid: '',
      popAdjustedDate: null
    });
    setOpenSnackbar(true);
    setOpen(false);
  };

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

  // Handle handleIssuedDate
  const handleIssuedDate = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (event.target.value === 'month_to_date') {
      setIssuedStartDate(moment(AdvancefirstDay).format('YYYY-MM-DD'));
      setIssuedEndDate(moment(AdvancenewDate).format('YYYY-MM-DD'));
    }
    if (event.target.value === 'last_month') {
      setIssuedStartDate(moment(prevAdvanceMonthFirstDate).format('YYYY-MM-DD'));
      setIssuedEndDate(moment(prevAdvanceMonthLastDate).format('YYYY-MM-DD'));
    }
    if (event.target.value === '') {
      setIssuedStartDate(null);
      setIssuedEndDate(null);
    }
    setAdvanceCalendar(event.target.value as string);
  };

  // Handle start Date
  const handleAdvanceStartDate = (date: Date | null) => {
    setIsLoading(true);
    setIssuedStartDate(date ? moment(date).format('YYYY-MM-DD') : null);
  };
  const handleRepaymentStartDate = (date: Date | null) => {
    setIsLoading(true);
    setBillingStartDate(date ? moment(date).format('YYYY-MM-DD') : null);
  };

  // Handle End Date
  const handleAdvanceEndDate = (date: Date | null) => {
    setIsLoading(true);
    setIssuedEndDate(date ? moment(date).format('YYYY-MM-DD') : null);
  };

  // Handle End Date
  const handleRepaymentEndDate = (date: Date | null) => {
    setIsLoading(true);
    setBillingEndDate(date ? moment(date).format('YYYY-MM-DD') : null);
  };

  // // Handle Status
  // const handleChangeCurrency = (event: ChangeEvent<{ value: unknown }>) => {
  //   setIsLoading(true);
  //   if (event.target.value === '') {
  //     setRevenueSource('');
  //   }
  //   setCurrencyValue(event.target.value as string);
  // };

  // const handleInvoiceType = (event: ChangeEvent<{ value: unknown }>) => {
  //   setInvoiceType(event.target.value as string);
  // };

  // Handle Customer
  const handleChangeCustomer = (event: ChangeEvent<{ value: unknown }>) => {
    setIsLoading(true);
    setCustomer(event.target.value as string);
  };

  // popup Handle Customer
  // const handlepopChangeCustomer = (event: ChangeEvent<{ value: unknown }>) => {
  //   setpopCustomer(event.target.value as string);
  // };

  // const handlepoprevenuecustomer = (event: ChangeEvent<{ value: unknown }>) => {
  //   setrevenuesource(event.target.value as string);
  // };

  // const handleChangeCurrencyItem = (event: ChangeEvent<{ value: unknown }>) => {
  //   setCurrencyItem(event.target.value as string);
  // };

  // const handlepopupIssueDate = (date: Date | null) => {
  //   setIsLoading(true);
  //   setpopissueDate(date ? moment(date).format('YYYY-MM-DD') : null);
  // };

  // const handlepopGrossValue = (event: ChangeEvent<{ value: unknown }>) => {
  //   setGrossValue(event.target.value as string);
  // };

  // Handle Revenue Source
  const handleRevenueSource = (event: ChangeEvent<{ value: unknown }>) => {
    setIsLoading(true);
    setRevenueSource(event.target.value as string);
  };

  // Callback for update
  const updateList = () => {
    dispatch({
      type: 'ACCOUNTING_DETAILS',
      payload: {
        page: page + 1,
        rowsPerPage,
        customer: customerValue ? customerValue : '',
        issuedStartDate,
        billingStartDate,
        issuedEndDate,
        billingEndDate,
        revenueSource: revenueSource ? revenueSource : '',
        actions,
        orderBy
      }
    });
  };

  // useEffect(() => {
  //   const handleSnack = (variant: VariantType) => {
  //     enqueueSnackbar(
  //       addReportData.message.data ? addReportData.message.data : addReportData.message,
  //       {
  //         variant
  //       }
  //     );
  //   };
  //   if (addReportData?.status === 'success' && open && !initialRender.current.initial) {
  //     dispatch({
  //       type: 'ACCOUNTING_DETAILS',
  //       payload: {
  //         page: page + 1,
  //         rowsPerPage,
  //         customer: customerValue ? customerValue : '',
  //         issuedStartDate,
  //         billingStartDate,
  //         issuedEndDate,
  //         billingEndDate,
  //         revenueSource: revenueSource ? revenueSource : '',
  //         actions,
  //         orderBy
  //       }
  //     });
  //     setOpen(false);
  //     setReportData({
  //       popcustomer: '',
  //       poprevenueSource: '',
  //       popcurrency: '',
  //       popissueDate: null,
  //       popInvNo: '',
  //       popGrossValue: '',
  //       poprevenueUuid: '',
  //       popCustomerCuid: '',
  //       popAdjustedDate: null
  //     });
  //     setIsLoading(false);
  //   }
  //   if (addReportData?.status === 'failure') {
  //     handleSnack('error');
  //     setIsLoading(false);
  //   }
  // }, [
  //   dispatch,
  //   open,
  //   addReportData,
  //   page,
  //   rowsPerPage,
  //   orderBy,
  //   customerValue,
  //   billingEndDate,
  //   billingStartDate,
  //   issuedEndDate,
  //   issuedStartDate,
  //   revenueSource,
  //   actions,
  //   enqueueSnackbar
  // ]);

  const handleMainApi = () => {
    dispatch({
      type: 'ACCOUNTING_DETAILS',
      payload: {
        page: page + 1,
        rowsPerPage,
        customer: customerValue ? customerValue : '',
        issuedStartDate,
        billingStartDate,
        issuedEndDate,
        billingEndDate,
        revenueSource: revenueSource ? revenueSource : '',
        actions,
        orderBy
      }
    });
    dispatch({
      type: 'ACCOUNTING_CLEAR'
    });
  };

  const handleActions = (event: ChangeEvent<{ value: unknown }>) => {
    setActions(event.target.value as string);
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
      popGrossValue: '',
      poprevenueUuid: '',
      popCustomerCuid: '',
      popAdjustedDate: null
    });
  };

  // Handle Open Modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Handle page and rowsperPage
  const handlePaginationAndUpdateList = (type: string, value: number) => {
    initialRender.current.initial = true;
    if (type === 'page') {
      dispatch({
        type: 'ACCOUNTING_DETAILS'
      });
      setPage(value);
    } else {
      dispatch({
        type: 'ACCOUNTING_DETAILS',
        payload: {
          page: 1,
          rowsPerPage: value,
          customer: customerValue ? customerValue : '',
          issuedStartDate,
          billingStartDate,
          issuedEndDate,
          billingEndDate,
          revenueSource: revenueSource ? revenueSource : '',
          actions,
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
      type: 'ACCOUNTING_DETAILS',
      payload: {
        page: page + 1,
        rowsPerPage,
        customer: customerValue ? customerValue : '',
        issuedStartDate,
        billingStartDate,
        issuedEndDate,
        billingEndDate,
        revenueSource: revenueSource ? revenueSource : '',
        actions,
        orderBy: !isAsyn ? property : `-${property}`
      }
    });
    setOrderBy(property);
    setTimeout(() => {
      initialRender.current.initial = false;
    }, 500);
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
            data: ['Month-End Invoices', 'Factor Invoices to Purchase']
          }}
        />
        <ContentBoxWrapper>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} sm={4}>
              <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Invoice Type</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={invoiceType}
                  onChange={handleInvoiceType}
                  label='Invoice Type'
                >
                  <MenuItem key='no-value-ds' value=''>
                    All
                  </MenuItem>
                  <MenuItem key='no-value-ds' value='Report'>
                    Report
                  </MenuItem>
                  <MenuItem key='no-value-ds' value='Factor'>
                    Factor
                  </MenuItem>
                </Select>
              </StyledFormControl>
            </Grid> */}
            {/* <Grid item xs={12} sm={4}>
              <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Currency</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={currencyValue}
                  onChange={handleChangeCurrency}
                  label='Currency'
                >
                  <MenuItem key='no-value-ds' value=''>
                    All
                  </MenuItem>
                  {currency.map((data: any) => (
                    <MenuItem key={data} value={data}>
                      {data}
                    </MenuItem>
                  ))}
                </Select>
              </StyledFormControl>
            </Grid> */}
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
                      <MenuItem key={data.cuid} value={data.cuid}>
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
                options={revenueSourceMasterList?.data || []}
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
                    label='Revenue Source'
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
                  {revenueSourceList?.status === 'success' &&
                    revenueSourceList?.data &&
                    revenueSourceList?.data.length &&
                    revenueSourceList.data.map((data: any) => (
                      <MenuItem key={data.uuid} value={data.uuid}>
                        {data.name}
                      </MenuItem>
                    ))}
                </Select>
              </StyledFormControl> */}
            </Grid>
            <Grid item xs={12} sm={4}>
              <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Status</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={actions}
                  onChange={handleActions}
                  label='Actions'
                >
                  <MenuItem key='no-value-status-no' value=''>
                    All
                  </MenuItem>
                  <MenuItem key='no-value-status-no' value='Sent'>
                    Sent
                  </MenuItem>
                  <MenuItem key='no-value-status-no' value='Not%20Sent'>
                    Rejected in Staging
                  </MenuItem>
                  <MenuItem key='no-value-status-no' value='Rejected'>
                    Purchase Rejected
                  </MenuItem>
                  <MenuItem key='no-value-status' value='Paused'>
                    Paused
                  </MenuItem>
                  <MenuItem key='no-value-status' value='Purchased'>
                    Purchased
                  </MenuItem>
                  <MenuItem key='no-value-status' value='Pending'>
                    Pending
                  </MenuItem>
                </Select>
              </StyledFormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Issued date</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={calendar}
                  onChange={handleIssuedDate}
                  label='Issued date'
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
            {calendar === 'month_to_date' && (
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
                <StyledGrid item xs={12} sm={4}>
                  <KeyboardDatePicker
                    margin='normal'
                    id='from-picker-dialog'
                    label='From'
                    format='dd/MM/yyyy'
                    value={AdvancefirstDay}
                    onChange={handleAdvanceStartDate}
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
                    value={AdvancenewDate}
                    onChange={handleAdvanceEndDate}
                    disabled
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </StyledGrid>
              </MuiPickersUtilsProvider>
            )}
            {calendar === 'last_month' && (
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
                <StyledGrid item xs={12} sm={4}>
                  <KeyboardDatePicker
                    margin='normal'
                    id='from-picker-dialog'
                    label='From'
                    format='dd/MM/yyyy'
                    value={prevAdvanceMonthFirstDate}
                    onChange={handleAdvanceStartDate}
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
                    value={prevAdvanceMonthLastDate}
                    onChange={handleAdvanceEndDate}
                    disabled
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </StyledGrid>
              </MuiPickersUtilsProvider>
            )}
            {calendar === 'custom' && (
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
                <StyledGrid item xs={12} sm={4}>
                  <KeyboardDatePicker
                    margin='normal'
                    id='from-picker-dialog'
                    label='From'
                    format='dd/MM/yyyy'
                    value={issuedStartDate}
                    onChange={handleAdvanceStartDate}
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
                    value={issuedEndDate}
                    onChange={handleAdvanceEndDate}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </StyledGrid>
              </MuiPickersUtilsProvider>
            )}
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
                ADD INVOICE
              </StyledButton>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              {isLoading && <Loader />}
              {!isLoading && (
                <DataTable
                  workflowA={workflowA}
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
          <DialogTitle id='responsive-dialog-title'>Add Invoice</DialogTitle>
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
                  disabled={dreportdata.popcustomer === '' ? true : false}
                  onChange={(e, id) => {
                    handlepoprevenueChange(e, id, revenueSourceList);
                  }}
                  label='Revenue Source'
                  name='poprevenueSource'
                >
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
                    value={dreportdata.popissueDate}
                    name='popissueDate'
                    disabled={!(dreportdata.popCustomerCuid && dreportdata.poprevenueUuid)}
                    onChange={(e) => handlepopisusedate(e)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl variant='outlined'>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
                  {/* <MuiPickersUtilsProvider libInstance={moment} utils={DateFnsUtils}> */}
                  <KeyboardDatePicker
                    margin='normal'
                    id='to-picker-dialog'
                    label='Expected Payment Date'
                    value={dreportdata.popAdjustedDate}
                    format='dd/MM/yyyy'
                    name='adjustedDate'
                    onChange={(e) => handleadjusteddate(e)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </Grid>

            {CalculateBillingInvoice && CalculateBillingInvoice.data && (
              <>
                <Grid xs={12}>
                  <TextField
                    id='outlined-textarea'
                    label='Billing Month'
                    placeholder='Enter inovice number'
                    variant='outlined'
                    value={CalculateBillingInvoice.data?.billing_month_name}
                    disabled
                    name='popInvNo'
                    onChange={(e) => handlepopChange(e)}
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    id='outlined-textarea'
                    label='Billing Year'
                    placeholder='Enter inovice number'
                    variant='outlined'
                    value={CalculateBillingInvoice.data?.billing_year}
                    disabled
                    name='popInvNo'
                    onChange={(e) => handlepopChange(e)}
                  />
                </Grid>
              </>
            )}

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
                dreportdata.popAdjustedDate &&
                dreportdata.popissueDate &&
                dreportdata.popcustomer &&
                popsourceChange
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
  workflowA: state.workflowA.data,
  addReportData: state.addReportData.data,
  CalculateBillingInvoice: state.CalculateBillingInvoice.data
});

export default connect(mapStateToProps)(WorkflowA);
