import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useSnackbar, VariantType } from 'notistack';
import locale from 'date-fns/locale/en-US';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Breadcumb from '../../../components/Breadcumb';
import DataTable from './DataTable';
import Loader from '../../../components/Loader';
import { MainContentWrapper, ContentBoxWrapper, StyledFormControl, StyledGrid } from './Styled';

// Props Interface
interface IProps {
  dispatch: Function;
  dataSource: {
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
  revenueDataList: {
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
  adminTransactionLeger: {
    data: any;
    status: string;
  };
  transactionExcel: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
}

const AdminTransactionLedger: React.FC<IProps> = ({
  dispatch,
  dataSource,
  customerData,
  statusList,
  adminTransactionLeger,
  transactionExcel,
  revenueDataList,
  revenueSourceMasterList
}: IProps) => {
  const [currencyValue, setCurrencyValue] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [startDate, setStartDate] = useState<Date | string | null>(null);
  const [endDate, setEndDate] = useState<Date | string | null>(null);
  const initialRender = useRef({ initial: true });
  const [isLoading, setIsLoading] = useState(false);
  const eventClick = useRef({ value: '' });
  const { enqueueSnackbar } = useSnackbar();
  const [calendar, setCalendar] = useState('');
  const [transactionValue, setTransactionValue] = useState('');
  const [revenueSource, setRevenueSource] = useState('');
  const [customerValue, setCustomer] = useState('');
  const [orderBy, setOrderBy] = useState('-event_date');
  const [repayment, setRepayment] = useState('');
  const currency = ['USD', 'EUR', 'GBP'];
  // const lastDay = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0);
  if (locale && locale.options) {
    locale.options.weekStartsOn = 1;
  }

  // adminTransactionLeger updating and loader
  useEffect(() => {
    setIsLoading(false);
  }, [adminTransactionLeger]);

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
  }, [dispatch]);

  // Handle Revenue Source api
  useEffect(() => {
    if (currencyValue) {
      dispatch({
        type: 'REVENUE_SOURCE_LIST',
        payload: {
          dataSource: currencyValue,
          page: 1,
          rowsPerPage: 1000,
          orderBy: 'created_at'
        }
      });
    }
  }, [dispatch, currencyValue]);

  // Calling ADMIN_TRANSACTION_LEDGER api
  useEffect(() => {
    dispatch({
      type: 'ADMIN_TRANSACTION_LEDGER',
      payload: {
        page: page + 1,
        rowsPerPage,
        transactionValue,
        dataSource: currencyValue,
        week: calendar !== 'custom' ? calendar : '',
        startDate,
        endDate,
        revenueSource,
        customerValue,
        orderBy: '-event_date',
        repayment
      }
    });
    setTimeout(() => {
      initialRender.current.initial = false;
    });
  }, [
    currencyValue,
    dispatch,
    endDate,
    transactionValue,
    page,
    rowsPerPage,
    startDate,
    calendar,
    revenueSource,
    customerValue,
    orderBy,
    repayment
  ]);

  // Handle handleCalendar
  const handleCalendar = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (event.target.value === '') {
      setStartDate(null);
      setEndDate(null);
    }
    setCalendar(event.target.value as string);
  };

  // Export csv api response
  useEffect(() => {
    const handleSnack = (variant: VariantType) => {
      enqueueSnackbar(
        transactionExcel.message.data ? transactionExcel.message.data : transactionExcel.message,
        {
          variant
        }
      );
    };

    if (transactionExcel?.status === 'success' && eventClick.current.value === 'export_csv') {
      window.location.href = transactionExcel?.data?.file_path;
    }
    if (transactionExcel?.status === 'failure' && eventClick.current.value === 'export_csv') {
      handleSnack('error');
    }
    eventClick.current.value = '';
  }, [transactionExcel, enqueueSnackbar, dispatch]);

  // Handle handleExportCsv
  const handleExportCsv = () => {
    eventClick.current.value = 'export_csv';
    dispatch({
      type: 'EXPORT_TRANSECTION_CSV',
      payload: {
        page: page + 1,
        rowsPerPage,
        transactionValue,
        dataSource: currencyValue,
        week: calendar !== 'custom' ? calendar : '',
        startDate,
        endDate,
        revenueSource,
        customerValue,
        orderBy
      }
    });
  };

  // Handle Revenue Source
  const handleRevenueSource = (event: ChangeEvent<{ value: unknown }>) => {
    setRevenueSource(event.target.value as string);
  };

  // Handle start Date
  const handleStartDate = (date: Date | null) => {
    setIsLoading(true);
    setStartDate(date ? moment(date).format('YYYY-MM-DD') : null);
  };
  // Handle Repayment Status
  const handleRepayment = (event: ChangeEvent<{ value: unknown }>) => {
    // eslint-disable-next-line no-console
    console.log('event', event.target.value);
    if (event.target.value === 'recovery') {
      setRepayment('recovery');
    } else if (event.target.value === 'normal') {
      setRepayment('normal');
    } else {
      setRepayment('');
    }
  };
  // Handle End Date
  const handleEndDate = (date: Date | null) => {
    setIsLoading(true);
    setEndDate(date ? moment(date).format('YYYY-MM-DD') : null);
  };

  // Handle Status
  const handleChangeCurrency = (event: ChangeEvent<{ value: unknown }>) => {
    setIsLoading(true);
    setCurrencyValue(event.target.value as string);
  };

  const handleTransactionStatus = (event: ChangeEvent<{ value: unknown }>) => {
    setTransactionValue(event.target.value as string);
  };

  // Handle Customer
  const handleChangeCustomer = (event: ChangeEvent<{ value: unknown }>) => {
    setIsLoading(true);
    setCustomer(event.target.value as string);
  };

  // Callback for update
  const updateList = () => {
    dispatch({
      type: 'ADMIN_TRANSACTION_LEDGER',
      payload: {
        page: page + 1,
        rowsPerPage,
        transactionValue,
        dataSource: currencyValue,
        week: calendar !== 'custom' ? calendar : '',
        startDate,
        endDate,
        revenueSource,
        customerValue,
        orderBy: '-event_date'
      }
    });
  };

  // Handle page and rowsperPage
  const handlePaginationAndUpdateList = (type: string, value: number) => {
    initialRender.current.initial = true;
    if (type === 'page') {
      dispatch({
        type: 'ADMIN_TRANSACTION_LEDGER',
        payload: {
          page: value + 1,
          rowsPerPage,
          transactionValue,
          dataSource: currencyValue,
          week: calendar !== 'custom' ? calendar : '',
          startDate,
          endDate,
          revenueSource,
          customerValue,
          orderBy: '-event_date'
        }
      });
      setPage(value);
    } else {
      dispatch({
        type: 'ADMIN_TRANSACTION_LEDGER',
        payload: {
          page: 1,
          rowsPerPage: value,
          transactionValue,
          dataSource: currencyValue,
          week: calendar !== 'custom' ? calendar : '',
          startDate,
          endDate,
          revenueSource,
          customerValue,
          orderBy: '-event_date'
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
      type: 'ADMIN_TRANSACTION_LEDGER',
      payload: {
        page: page + 1,
        rowsPerPage,
        dataSource: currencyValue,
        transactionValue,
        week: calendar !== 'custom' ? calendar : '',
        startDate,
        endDate,
        revenueSource,
        customerValue,
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
        <Breadcumb breadCrumb={{ page: 'Reporting', data: ['Reporting', 'Event History'] }} />
        <ContentBoxWrapper>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Transaction</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={transactionValue}
                  onChange={handleTransactionStatus}
                  label='Transaction'
                >
                  <MenuItem key='no-value-ds' value=''>
                    All
                  </MenuItem>
                  <MenuItem key='no-value-ds' value='purchase'>
                    Purchase
                  </MenuItem>
                  <MenuItem key='no-value-ds' value='fee'>
                    Fee
                  </MenuItem>
                  <MenuItem key='no-value-ds' value='fee_adjustment'>
                    Fee Adjustment
                  </MenuItem>
                  <MenuItem key='no-value-ds' value='upfront_fee'>
                    Upfront Fee
                  </MenuItem>
                  <MenuItem key='no-value-ds' value='repayment'>
                    Repayment
                  </MenuItem>
                  <MenuItem key='no-value-ds' value='collection'>
                    Collection
                  </MenuItem>
                  <MenuItem key='no-value-ds' value='fee_repayment'>
                    Fee Repayment
                  </MenuItem>
                  <MenuItem key='no-value-ds' value='collection_surplus'>
                    Collection Surplus
                  </MenuItem>
                  <MenuItem key='no-value-ds' value='depreciation'>
                    Depreciation
                  </MenuItem>
                  <MenuItem key='no-value-ds' value='outgoing_payment'>
                    Outgoing
                  </MenuItem>
                  <MenuItem key='no-value-ds' value='revving_repayment'>
                    Revving Repayment
                  </MenuItem>
                  <MenuItem key='no-value-ds' value='surplus_distribution'>
                    Surplus Distribution
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
                options={revenueSourceMasterList?.data || []}
                getOptionLabel={(option: any) => option.name}
                getOptionSelected={(option: any, value: any) => {
                  if (option.name === value.name) {
                    setRevenueSource(option.name);
                  }
                  return option.name === value.name;
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
                  {revenueSourceMasterList?.status === 'success' &&
                    revenueSourceMasterList?.data &&
                    revenueSourceMasterList?.data.length &&
                    revenueSourceMasterList.data.map((data: any) => (
                      <MenuItem key={data.uuid} value={data.name}>
                        {data.name}
                      </MenuItem>
                    ))}
                </Select>
              </StyledFormControl> */}
            </Grid>
            <Grid item xs={12} sm={4}>
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
            </Grid>
            <Grid item xs={12} sm={4}>
              <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Period</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={calendar}
                  onChange={handleCalendar}
                  label='Period'
                >
                  <MenuItem key='no-value-status-no' value=''>
                    All
                  </MenuItem>
                  <MenuItem key='no-value-status' value='this_month'>
                    This Month
                  </MenuItem>
                  <MenuItem key='no-value-status' value='last_4_weeks'>
                    Last month
                  </MenuItem>
                  <MenuItem key='no-value-status' value='last_12_weeks'>
                    Last 3 month
                  </MenuItem>
                  <MenuItem key='no-value-status' value='year_to_date'>
                    Year to date
                  </MenuItem>
                  <MenuItem key='no-value-status' value='custom'>
                    Custom
                  </MenuItem>
                </Select>
              </StyledFormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Repayment</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={repayment}
                  onChange={handleRepayment}
                  label='Period'
                >
                  <MenuItem key='no-value-status-no' value=''>
                    All
                  </MenuItem>
                  <MenuItem key='no-value-status' value='recovery'>
                    Recovery
                  </MenuItem>
                  <MenuItem key='no-value-status' value='normal'>
                    Normal
                  </MenuItem>
                </Select>
              </StyledFormControl>
            </Grid>
            {calendar === 'custom' && (
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
                <StyledGrid item xs={12} sm={4}>
                  <KeyboardDatePicker
                    margin='normal'
                    id='from-picker-dialog'
                    label='From'
                    format='dd/MM/yyyy'
                    value={startDate}
                    onChange={handleStartDate}
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
                    value={endDate}
                    onChange={handleEndDate}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </StyledGrid>
              </MuiPickersUtilsProvider>
            )}
            <StyledGrid item xs={12} sm={4}>
              <Button variant='contained' color='primary' onClick={handleExportCsv}>
                Export as a Csv
              </Button>
            </StyledGrid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              {isLoading && <Loader />}
              {!isLoading && (
                <DataTable
                  adminTransactionLeger={adminTransactionLeger}
                  updateList={updateList}
                  handleSortData={handleSortData}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  handlePaginationAndUpdateList={handlePaginationAndUpdateList}
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
  dataSource: state.dataSource.data,
  customerData: state.customerList.data,
  statusList: state.statusList.data,
  revenueDataList: state.revenueDataList.data,
  adminTransactionLeger: state.adminTransactionLeger.data,
  revenueSourceMasterList: state.revenueSourceMasterList.data,
  transactionExcel: state.transactionExcel.data
});

export default connect(mapStateToProps)(AdminTransactionLedger);
