import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import { useSnackbar, VariantType } from 'notistack';
import locale from 'date-fns/locale/en-US';
import DateFnsUtils from '@date-io/date-fns';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
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
  revenueSourceList: {
    data: any;
    status: string;
  };
  adminAdvanceBalance: {
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
  advanceExcel: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
}

const AdminAdvanceBalance: React.FC<IProps> = ({
  dispatch,
  dataSource,
  customerData,
  statusList,
  revenueSourceList,
  adminAdvanceBalance,
  revenueSourceMasterList,
  advanceExcel
}: IProps) => {
  const [currencyValue, setCurrencyValue] = useState('');
  const [customerValue, setCustomer] = useState('');
  const [revenueSource, setRevenueSource] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [advanceStartDate, setAdvanceStartDate] = useState<Date | string | null>(null);
  const [advanceEndDate, setAdvanceEndDate] = useState<Date | string | null>(null);
  const [orderBy, setOrderBy] = useState('');
  // const [repaymentStartDate, setRepaymentStartDate] = useState<Date | string | null>(null);
  // const [repaymentEndDate, setRepaymentEndDate] = useState<Date | string | null>(null);
  // const [repaymentCalendar, setRepaymentCalendar] = useState('');
  const initialRender = useRef({ initial: true });
  const [isLoading, setIsLoading] = useState(false);
  const eventClick = useRef({ value: '' });
  const { enqueueSnackbar } = useSnackbar();
  const [calendar, setAdvanceCalendar] = useState('');
  const AdvancenewDate = new Date();
  const AdvancefirstDay = new Date(AdvancenewDate.getFullYear(), AdvancenewDate.getMonth(), 1);
  const [groupValue, setGroupValue] = useState('customer');
  const currency = ['USD', 'EUR', 'GBP'];
  // const lastDay = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0);
  // const repaymentnewDate = new Date();
  // const repaymentfirstDay = new Date(
  //   repaymentnewDate.getFullYear(),
  //   repaymentnewDate.getMonth(),
  //   1
  // );

  const prevAdvanceMonthFirstDate = new Date(
    AdvancenewDate.getFullYear() - (AdvancenewDate.getMonth() > 0 ? 0 : 1),
    (AdvancenewDate.getMonth() - 1 + 12) % 12,
    1
  );
  // const prevRepaymentMonthLastDate = new Date(
  //   repaymentnewDate.getFullYear(),
  //   repaymentnewDate.getMonth(),
  //   0
  // );

  // const prevRepaymentMonthFirstDate = new Date(
  //   repaymentnewDate.getFullYear() - (repaymentnewDate.getMonth() > 0 ? 0 : 1),
  //   (repaymentnewDate.getMonth() - 1 + 12) % 12,
  //   1
  // );
  const prevAdvanceMonthLastDate = new Date(
    AdvancenewDate.getFullYear(),
    AdvancenewDate.getMonth(),
    0
  );

  if (locale && locale.options) {
    locale.options.weekStartsOn = 1;
  }

  // adminAdvanceBalance updating and loader
  useEffect(() => {
    setIsLoading(false);
  }, [adminAdvanceBalance]);

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

  // Export csv api response
  useEffect(() => {
    const handleSnack = (variant: VariantType) => {
      enqueueSnackbar(
        advanceExcel.message.data ? advanceExcel.message.data : advanceExcel.message,
        {
          variant
        }
      );
    };

    if (advanceExcel?.status === 'success' && eventClick.current.value === 'export_csv') {
      window.location.href = advanceExcel?.data?.file_path;
    }
    if (advanceExcel?.status === 'failure' && eventClick.current.value === 'export_csv') {
      handleSnack('error');
    }
    eventClick.current.value = '';
  }, [advanceExcel, enqueueSnackbar, dispatch]);

  // Calling ADMIN_ADVANCE_BALANCE api
  useEffect(() => {
    setIsLoading(true);
    dispatch({
      type: 'ADMIN_ADVANCE_BALANCE',
      payload: {
        rowsPerPage,
        groupValue,
        customer: customerValue,
        dataSource: currencyValue,
        advanceStartDate,
        advanceEndDate,
        revenueSource,
        orderBy
      }
    });
    setTimeout(() => {
      initialRender.current.initial = false;
    });
  }, [
    customerValue,
    currencyValue,
    dispatch,
    advanceEndDate,
    groupValue,
    page,
    revenueSource,
    rowsPerPage,
    advanceStartDate,
    orderBy
  ]);
  // Handle handleAdvanceDate
  // const handleRepaymentDate = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   if (event.target.value === 'month_to_date') {
  //     setRepaymentStartDate(moment(repaymentfirstDay).format('YYYY-MM-DD'));
  //     setRepaymentEndDate(moment(repaymentnewDate).format('YYYY-MM-DD'));
  //   }
  //   if (event.target.value === 'last_month') {
  //     setRepaymentStartDate(moment(prevRepaymentMonthFirstDate).format('YYYY-MM-DD'));
  //     setRepaymentEndDate(moment(prevRepaymentMonthLastDate).format('YYYY-MM-DD'));
  //   }
  //   if (event.target.value === '') {
  //     setRepaymentStartDate(null);
  //     setRepaymentEndDate(null);
  //   }
  //   setRepaymentCalendar(event.target.value as string);
  // };

  // Handle handleAdvanceDate
  const handleAdvanceDate = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (event.target.value === 'month_to_date') {
      setAdvanceStartDate(moment(AdvancefirstDay).format('YYYY-MM-DD'));
      setAdvanceEndDate(moment(AdvancenewDate).format('YYYY-MM-DD'));
    }
    if (event.target.value === 'last_month') {
      setAdvanceStartDate(moment(prevAdvanceMonthFirstDate).format('YYYY-MM-DD'));
      setAdvanceEndDate(moment(prevAdvanceMonthLastDate).format('YYYY-MM-DD'));
    }
    if (event.target.value === '') {
      setAdvanceStartDate(null);
      setAdvanceEndDate(null);
    }
    setAdvanceCalendar(event.target.value as string);
  };

  // Handle start Date
  const handleAdvanceStartDate = (date: Date | null) => {
    setIsLoading(true);
    setAdvanceStartDate(date ? moment(date).format('YYYY-MM-DD') : null);
  };
  // const handleRepaymentStartDate = (date: Date | null) => {
  //   setIsLoading(true);
  //   setRepaymentStartDate(date ? moment(date).format('YYYY-MM-DD') : null);
  // };

  // Handle End Date
  const handleAdvanceEndDate = (date: Date | null) => {
    setIsLoading(true);
    setAdvanceEndDate(date ? moment(date).format('YYYY-MM-DD') : null);
  };

  // Handle End Date
  // const handleRepaymentEndDate = (date: Date | null) => {
  //   setIsLoading(true);
  //   setRepaymentEndDate(date ? moment(date).format('YYYY-MM-DD') : null);
  // };

  // Handle Status
  const handleChangeCurrency = (event: ChangeEvent<{ value: unknown }>) => {
    setIsLoading(true);
    if (event.target.value === '') {
      setRevenueSource('');
    }
    setCurrencyValue(event.target.value as string);
  };

  const handleGroupStatus = (event: ChangeEvent<{ value: unknown }>) => {
    setGroupValue(event.target.value as string);
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
      type: 'ADMIN_ADVANCE_BALANCE',
      payload: {
        rowsPerPage,
        groupValue,
        customer: customerValue,
        dataSource: currencyValue,
        advanceStartDate,
        advanceEndDate,
        revenueSource,
        orderBy
      }
    });
  };

  // Handle page and rowsperPage
  const handlePaginationAndUpdateList = (type: string, value: number) => {
    initialRender.current.initial = true;
    if (type === 'page') {
      dispatch({
        type: 'ADMIN_ADVANCE_BALANCE',
        payload: {
          rowsPerPage,
          groupValue,
          customer: customerValue,
          dataSource: currencyValue,
          advanceStartDate,
          advanceEndDate,
          revenueSource,
          orderBy
        }
      });
      setPage(value);
    } else {
      dispatch({
        type: 'ADMIN_ADVANCE_BALANCE',
        payload: {
          rowsPerPage: value,
          groupValue,
          customer: customerValue,
          dataSource: currencyValue,
          advanceStartDate,
          advanceEndDate,
          revenueSource,
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

  // Handle handleExportCsv
  const handleExportCsv = () => {
    eventClick.current.value = 'export_csv';
    dispatch({
      type: 'EXPORT_ADVANCE_CSV',
      payload: {
        page: page + 1,
        rowsPerPage,
        groupValue,
        customer: customerValue,
        dataSource: currencyValue,
        advanceStartDate,
        advanceEndDate,
        revenueSource,
        orderBy
      }
    });
  };

  // Handle sorting
  const handleSortData = (property: string, isAsyn: any) => {
    initialRender.current.initial = true;
    dispatch({
      type: 'ADMIN_ADVANCE_BALANCE',
      payload: {
        rowsPerPage,
        customer: customerValue,
        dataSource: currencyValue,
        groupValue,
        advanceStartDate,
        advanceEndDate,
        revenueSource,
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
        <Breadcumb
          breadCrumb={{ page: 'Reporting', data: ['Reporting', 'Advance Balance per Customer'] }}
        />
        <ContentBoxWrapper>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Grouped by</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={groupValue}
                  onChange={handleGroupStatus}
                  label='Grouped by'
                >
                  <MenuItem key='no-value-ds' value='customer'>
                    Customer
                  </MenuItem>
                  <MenuItem key='no-value-ds' value='revenue_source'>
                    Revenue source
                  </MenuItem>
                </Select>
              </StyledFormControl>
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
            {groupValue == 'customer' && (
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
            )}
            {groupValue == 'revenuesource' && (
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
            )}
            <Grid item xs={12} sm={4}>
              <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Period</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={calendar}
                  onChange={handleAdvanceDate}
                  label='Period'
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
                    value={advanceStartDate}
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
                    value={advanceEndDate}
                    onChange={handleAdvanceEndDate}
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
                  adminAdvanceBalance={adminAdvanceBalance}
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
  revenueSourceList: state.revenueSourceList.data,
  revenueSourceMasterList: state.revenueSourceMasterList.data,
  adminAdvanceBalance: state.adminAdvanceBalance.data,
  advanceExcel: state.advanceExcel.data
});

export default connect(mapStateToProps)(AdminAdvanceBalance);
