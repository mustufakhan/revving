/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
// import { useSnackbar } from 'notistack';
import locale from 'date-fns/locale/en-US';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Loader from '../../../components/Loader';
import Breadcumb from '../../../components/Breadcumb';
import DataTable from './DataTable';
import { MainContentWrapper, ContentBoxWrapper, StyledFormControl, StyledGrid } from './Styled';

// Props Interface
interface IProps {
  dispatch: Function;
  invoiceSummary: {
    data: any;
    status: string;
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
  revenueSourceMasterApi: {
    data: any;
    status: string;
  };
}

const InvoiceSummary: React.FC<IProps> = ({
  dispatch,
  invoiceSummary,
  customerData,
  revenueSourceMasterList,
  revenueSourceMasterApi
}: IProps) => {
  const [customerValue, setCustomer] = useState('');
  const [revenueSource, setRevenueSource] = useState('');
  console.log('here', revenueSource);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [invoiceType, setInvoiceType] = useState('');
  const [statusType, setStatusType] = useState('');
  const [repaymentCalendar, setRepaymentCalendar] = useState('');
  const [issuedStartDate, setIssuedStartDate] = useState<Date | string | null>(null);
  const [issuedEndDate, setIssuedEndDate] = useState<Date | string | null>(null);
  const [repaymentStartDate, setRepaymentStartDate] = useState<Date | string | null>(null);
  const [repaymentEndDate, setRepaymentEndDate] = useState<Date | string | null>(null);
  const [calendar, setAdvanceCalendar] = useState('');
  const [orderBy, setOrderBy] = useState('');
  // const [newData, setNewData] = useState<any[]>([]);
  const AdvancenewDate = new Date();
  const AdvancefirstDay = new Date(AdvancenewDate.getFullYear(), AdvancenewDate.getMonth(), 1);

  const repaymentnewDate = new Date();
  const repaymentfirstDay = new Date(
    repaymentnewDate.getFullYear(),
    repaymentnewDate.getMonth(),
    1
  );
  console.log('revenueSourceMasterApi', revenueSourceMasterApi);
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

  // console.log('testing');
  // const [orderBy, setOrderBy] = useState<string>('created_at');
  const initialRender = useRef({ initial: true });
  const [isLoading, setIsLoading] = useState(false);
  //   const eventClick = useRef({ value: '' });
  //   const { enqueueSnackbar } = useSnackbar();

  const handleInvoiceType = (event: React.ChangeEvent<{ value: unknown }>) => {
    setInvoiceType(event.target.value as string);
  };

  const handleStatus = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatusType(event.target.value as string);
  };

  const handleChangeCustomer = (event: React.ChangeEvent<{ value: unknown }>) => {
    setIsLoading(true);
    setCustomer(event.target.value as string);
  };
  useEffect(() => {
    if (customerValue) {
      dispatch({
        type: 'REVENUE_SOURCE_MASTER_LIST_API',
        payload: {
          customer: customerValue
        }
      });
    }
  }, [customerValue]);

  const handleRevenueSource = (event: React.ChangeEvent<{ value: unknown }>) => {
    setIsLoading(true);
    setRevenueSource(event.target.value as string);
  };
  useEffect(() => {
    if (revenueSource) {
      console.log('revenueSource', revenueSource);
      dispatch({
        type: 'GET_CUSTOMER_LIST',
        payload: {
          revenue_source_master: revenueSource
        }
      });
    }
  }, [revenueSource]);

  if (locale && locale.options) {
    locale.options.weekStartsOn = 1;
  }

  // revenueSourceAcc updating and loader
  useEffect(() => {
    setIsLoading(false);
  }, [invoiceSummary]);

  useEffect(() => {
    customerData?.data?.results.unshift({ name: 'All' });
  }, [customerData?.data?.results]);

  useEffect(() => {
    revenueSourceMasterList?.data.unshift({ name: 'All' });
    // console.log('mycheck--', revenueSourceMasterList);
  }, [revenueSourceMasterList?.data]);

  useEffect(() => {
    revenueSourceMasterApi?.data?.results?.unshift({ name: 'All' });
  }, [revenueSourceMasterApi?.data]);

  console.log('there is data', revenueSourceMasterApi);
  // useEffect(() => {
  //   dispatch({
  //     type: 'REVENUE_SOURCE_MASTER_LIST',
  //     payload: {}
  //   });

  useEffect(() => {
    dispatch({
      type: 'REVENUE_SOURCE_MASTER_LIST_API',
      payload: {}
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
  }, [dispatch]);

  // Calling api for Data list
  useEffect(() => {
    if (invoiceType == 'Factor' && statusType) {
      dispatch({
        type: 'INVOICE_SUMMARY',
        payload: {
          page: 1,
          rowsPerPage: 10,
          invoiceType,
          statusType: 'Pending',
          customerValue,
          revenueSource,
          repaymentStartDate,
          issuedStartDate,
          issuedEndDate,
          repaymentEndDate,
          orderBy
        }
      });
    } else {
      dispatch({
        type: 'INVOICE_SUMMARY',
        payload: {
          page: 1,
          rowsPerPage: 10,
          invoiceType,
          statusType,
          customerValue,
          revenueSource,
          repaymentStartDate,
          issuedStartDate,
          issuedEndDate,
          repaymentEndDate,
          orderBy
        }
      });
    }
  }, [
    dispatch,
    invoiceType,
    statusType,
    customerValue,
    revenueSource,
    repaymentStartDate,
    issuedStartDate,
    issuedEndDate,
    repaymentEndDate,
    orderBy
  ]);

  // Callback for update
  const updateList = () => {
    dispatch({
      type: 'INVOICE_SUMMARY',
      payload: {
        page: page + 1,
        rowsPerPage,
        invoiceType,
        statusType,
        customerValue,
        revenueSource,
        repaymentStartDate,
        issuedStartDate,
        issuedEndDate,
        repaymentEndDate,
        orderBy
        // customer: customerValue,
        // approve
      }
    });
  };

  // Handle page and rowsperPage
  const handlePaginationAndUpdateList = (type: string, value: number) => {
    initialRender.current.initial = true;
    if (type === 'page') {
      dispatch({
        type: 'INVOICE_SUMMARY',
        payload: {
          page: value + 1,
          rowsPerPage,
          invoiceType,
          statusType,
          customerValue,
          revenueSource,
          repaymentStartDate,
          issuedStartDate,
          issuedEndDate,
          repaymentEndDate,
          orderBy
        }
      });
      setPage(value);
    } else {
      dispatch({
        type: 'INVOICE_SUMMARY',
        payload: {
          page: 1,
          rowsPerPage: value,
          invoiceType,
          statusType,
          customerValue,
          revenueSource,
          repaymentStartDate,
          issuedStartDate,
          issuedEndDate,
          repaymentEndDate,
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
      type: 'INVOICE_SUMMARY',
      payload: {
        page: page + 1,
        rowsPerPage,
        invoiceType,
        statusType,
        customerValue,
        revenueSource,
        repaymentStartDate,
        issuedStartDate,
        issuedEndDate,
        repaymentEndDate,
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
      type: 'INVOICE_SUMMARY',
      payload: {
        page: page + 1,
        rowsPerPage,
        invoiceType,
        statusType,
        customerValue,
        revenueSource,
        repaymentStartDate,
        issuedStartDate,
        issuedEndDate,
        repaymentEndDate,
        orderBy
      }
    });
  };

  // Handle handleIssuedDate
  const handleRepaymentDate = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (event.target.value === 'month_to_date') {
      setRepaymentStartDate(moment(repaymentfirstDay).format('YYYY-MM-DD'));
      setRepaymentEndDate(moment(repaymentnewDate).format('YYYY-MM-DD'));
    }
    if (event.target.value === 'last_month') {
      setRepaymentStartDate(moment(prevRepaymentMonthFirstDate).format('YYYY-MM-DD'));
      setRepaymentEndDate(moment(prevRepaymentMonthLastDate).format('YYYY-MM-DD'));
    }
    if (event.target.value === '') {
      setRepaymentStartDate(null);
      setRepaymentEndDate(null);
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
    setRepaymentStartDate(date ? moment(date).format('YYYY-MM-DD') : null);
  };

  // Handle End Date
  const handleAdvanceEndDate = (date: Date | null) => {
    setIsLoading(true);
    setIssuedEndDate(date ? moment(date).format('YYYY-MM-DD') : null);
  };

  // Handle End Date
  const handleRepaymentEndDate = (date: Date | null) => {
    setIsLoading(true);
    setRepaymentEndDate(date ? moment(date).format('YYYY-MM-DD') : null);
  };

  return (
    <>
      <MainContentWrapper>
        <Breadcumb
          breadCrumb={{
            page: 'Month-End Invoices',
            data: ['Month-End Invoices', 'All Month-End Invoices']
          }}
        />
        <ContentBoxWrapper>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
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
                  <MenuItem key='no-value-ds' value='Factor'>
                    Factor
                  </MenuItem>
                  <MenuItem key='no-value-ds' value='Report'>
                    Collateral
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
            <Grid item xs={12} sm={4}>
              <Autocomplete
                className='auto_drop'
                id='master-dropdown-datasource'
                options={
                  (revenueSourceMasterApi?.status === 'success' &&
                    revenueSourceMasterApi?.data.results &&
                    revenueSourceMasterApi?.data.results.length &&
                    revenueSourceMasterApi?.data.results) ||
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
                    label='Revenue Source'
                    variant='outlined'
                    value={(e: any) => {}}
                    onChange={(e) => handleRevenueSource(e)}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Status</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={statusType}
                  onChange={handleStatus}
                  label='Invoice Type'
                >
                  <MenuItem key='no-value-ds' value=''>
                    All
                  </MenuItem>
                  <MenuItem key='no-value-ds' value='Approve'>
                    Pending
                  </MenuItem>
                  {/* <MenuItem key='no-value-ds' value='Approve'>
                    Pending
                  </MenuItem> */}
                  <MenuItem key='no-value-ds' value='Purchased'>
                    Purchased
                  </MenuItem>
                  <MenuItem key='no-value-ds' value='Paused'>
                    Paused
                  </MenuItem>
                  <MenuItem key='no-value-ds' value='Assigned'>
                    Assigned
                  </MenuItem>
                  <MenuItem key='no-value-ds' value='Unassigned'>
                    Unassigned
                  </MenuItem>
                  <MenuItem key='no-value-ds' value='Not%20Sent'>
                    Rejected in Staging
                  </MenuItem>
                  <MenuItem key='no-value-ds' value='Rejected'>
                    Purchase Rejected
                  </MenuItem>
                </Select>
              </StyledFormControl>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
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
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Repayment date</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={repaymentCalendar}
                  onChange={handleRepaymentDate}
                  label='Repayment date'
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
                    value={repaymentStartDate}
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
                    value={repaymentEndDate}
                    onChange={handleRepaymentEndDate}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </StyledGrid>
              </MuiPickersUtilsProvider>
            )}
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              {isLoading && <Loader />}
              {!isLoading && (
                <DataTable
                  invoiceSummary={invoiceSummary}
                  updateList={updateList}
                  handleSortData={handleSortData}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  handlePaginationAndUpdateList={handlePaginationAndUpdateList}
                  mainAPI={() => handleAPI()}
                />
              )}
            </Grid>
          </Grid>
        </ContentBoxWrapper>
      </MainContentWrapper>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  invoiceSummary: state.invoiceSummary.data,
  customerData: state.customerList.data,
  revenueSourceMasterList: state.revenueSourceMasterList.data,
  revenueSourceMasterApi: state.revenueSourceMasterApi.data
});

export default connect(mapStateToProps)(InvoiceSummary);
