import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useSnackbar, VariantType } from 'notistack';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import locale from 'date-fns/locale/en-US';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Breadcumb from '../../../components/Breadcumb';
import RevenueDataTable from './RevenueDataTable';
import Loader from '../../../components/Loader';
import { MainContentWrapper, ContentBoxWrapper, StyledFormControl, StyledGrid } from './Styled';

// Props Interface
interface IProps {
  dispatch: Function;
  dataSource: {
    data: any;
    status: string;
  };
  revenueDataList: {
    data: any;
    status: string;
  };
  revenueSourceList: {
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
  exportRevenueDataCsv: {
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

const RevenueDataSection: React.FC<IProps> = ({
  dispatch,
  dataSource,
  customerData,
  statusList,
  revenueDataList,
  revenueSourceList,
  exportRevenueDataCsv,
  revenueSourceMasterList
}: IProps) => {
  const [datasourceValue, setDatasource] = useState('');
  const [customerValue, setCustomer] = useState('');
  const [revenueSource, setRevenueSource] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [orderBy, setOrderBy] = useState<string>('-date');
  const [startDate, setStartDate] = useState<Date | string | null>(null);
  const [endDate, setEndDate] = useState<Date | string | null>(null);
  const initialRender = useRef({ initial: true });
  const [isLoading, setIsLoading] = useState(false);
  const eventClick = useRef({ value: '' });
  const { enqueueSnackbar } = useSnackbar();
  const [calendar, setCalendar] = useState('');
  const newDate = new Date();
  const firstDay = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
  // const lastDay = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0);

  const prevMonthFirstDate = new Date(
    newDate.getFullYear() - (newDate.getMonth() > 0 ? 0 : 1),
    (newDate.getMonth() - 1 + 12) % 12,
    1
  );
  const prevMonthLastDate = new Date(newDate.getFullYear(), newDate.getMonth(), 0);

  if (locale && locale.options) {
    locale.options.weekStartsOn = 1;
  }

  // revenueDataList updating and loader
  useEffect(() => {
    setIsLoading(false);
  }, [revenueDataList]);

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
    if (datasourceValue) {
      dispatch({
        type: 'REVENUE_SOURCE_LIST',
        payload: {
          dataSource: datasourceValue,
          page: 1,
          rowsPerPage: 1000,
          orderBy: 'created_at'
        }
      });
    }
  }, [dispatch, datasourceValue]);

  // Calling Revenue list api
  useEffect(() => {
    // Calling api only if api return with success response
    // Call initial api when initial page load and set DataSource
    if (initialRender.current.initial) {
      // Get email metadata list api call
      dispatch({
        type: 'GET_REVENUE_DATA_LIST',
        payload: {
          page: page + 1,
          rowsPerPage,
          orderBy,
          customer: customerValue,
          dataSource: datasourceValue,
          startDate,
          endDate,
          revenueSource
        }
      });
      setTimeout(() => {
        initialRender.current.initial = false;
      });
    } else {
      !initialRender.current.initial &&
        dispatch({
          type: 'GET_REVENUE_DATA_LIST',
          payload: {
            page: page + 1,
            rowsPerPage,
            orderBy,
            customer: customerValue,
            dataSource: datasourceValue,
            startDate,
            endDate,
            revenueSource
          }
        });
    }
  }, [
    customerValue,
    datasourceValue,
    dispatch,
    endDate,
    orderBy,
    page,
    revenueSource,
    rowsPerPage,
    startDate
  ]);

  // Handle handleCalendar
  const handleCalendar = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (event.target.value === 'month_to_date') {
      setStartDate(moment(firstDay).format('YYYY-MM-DD'));
      setEndDate(moment(newDate).format('YYYY-MM-DD'));
    }
    if (event.target.value === 'last_month') {
      setStartDate(moment(prevMonthFirstDate).format('YYYY-MM-DD'));
      setEndDate(moment(prevMonthLastDate).format('YYYY-MM-DD'));
    }
    if (event.target.value === '') {
      setStartDate(null);
      setEndDate(null);
    }
    setCalendar(event.target.value as string);
  };

  // Handle start Date
  const handleStartDate = (date: Date | null) => {
    setIsLoading(true);
    setStartDate(date ? moment(date).format('YYYY-MM-DD') : null);
  };

  // Handle End Date
  const handleEndDate = (date: Date | null) => {
    setIsLoading(true);
    setEndDate(date ? moment(date).format('YYYY-MM-DD') : null);
  };

  // Handle Data Source
  const handleChangeDatasource = (event: ChangeEvent<{ value: unknown }>) => {
    setIsLoading(true);
    if (event.target.value === '') {
      setRevenueSource('');
    }
    setDatasource(event.target.value as string);
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
      type: 'GET_REVENUE_DATA_LIST',
      payload: {
        page: page + 1,
        rowsPerPage,
        orderBy,
        customer: customerValue,
        dataSource: datasourceValue,
        startDate,
        endDate,
        revenueSource
      }
    });
  };

  // Handle page and rowsperPage
  const handlePaginationAndUpdateList = (type: string, value: number) => {
    initialRender.current.initial = true;
    if (type === 'page') {
      dispatch({
        type: 'GET_REVENUE_DATA_LIST',
        payload: {
          page: value + 1,
          rowsPerPage,
          orderBy,
          customer: customerValue,
          dataSource: datasourceValue,
          startDate,
          endDate,
          revenueSource
        }
      });
      setPage(value);
    } else {
      dispatch({
        type: 'GET_REVENUE_DATA_LIST',
        payload: {
          page: 1,
          rowsPerPage: value,
          orderBy,
          customer: customerValue,
          dataSource: datasourceValue,
          startDate,
          endDate,
          revenueSource
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
      type: 'GET_REVENUE_DATA_LIST',
      payload: {
        page: page + 1,
        rowsPerPage,
        customer: customerValue,
        dataSource: datasourceValue,
        orderBy: !isAsyn ? property : `-${property}`,
        startDate,
        endDate,
        revenueSource
      }
    });
    setOrderBy(property);
    setTimeout(() => {
      initialRender.current.initial = false;
    }, 500);
  };

  // Handle handleExportCsv
  const handleExportCsv = () => {
    eventClick.current.value = 'export_csv';
    dispatch({
      type: 'EXPORT_REVENUE_DATA_CSV',
      payload: {
        page: page + 1,
        rowsPerPage,
        orderBy,
        customer: customerValue,
        dataSource: datasourceValue,
        startDate,
        endDate,
        revenueSource
      }
    });
  };

  // Export csv api response
  useEffect(() => {
    const handleSnack = (variant: VariantType) => {
      enqueueSnackbar(
        exportRevenueDataCsv.message.data
          ? exportRevenueDataCsv.message.data
          : exportRevenueDataCsv.message,
        {
          variant
        }
      );
    };

    if (exportRevenueDataCsv?.status === 'success' && eventClick.current.value === 'export_csv') {
      window.location.href = exportRevenueDataCsv?.data?.file_path;
    }
    if (exportRevenueDataCsv?.status === 'failure' && eventClick.current.value === 'export_csv') {
      handleSnack('error');
    }
    eventClick.current.value = '';
  }, [exportRevenueDataCsv, enqueueSnackbar, dispatch]);

  return (
    <>
      <MainContentWrapper>
        <Breadcumb
          breadCrumb={{
            page: 'Transactional Invoices',
            data: ['Transactional Invoices', 'Revenue-Data']
          }}
        />
        <ContentBoxWrapper>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                className='auto_drop'
                id='dropdown-datasource'
                options={
                  (dataSource?.status === 'success' &&
                    dataSource?.data &&
                    dataSource?.data?.results.length &&
                    dataSource?.data?.results) ||
                  []
                }
                getOptionLabel={(option: any) => option.source_name}
                getOptionSelected={(option, value) => {
                  if (option.uuid === value.uuid) {
                    setDatasource(option.uuid);
                  }
                  return option.uuid === value.uuid;
                }}
                style={{ width: 320 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Data Source'
                    variant='outlined'
                    value={(e: any) => {}}
                    onChange={(e) => handleChangeDatasource(e)}
                  />
                )}
              />
              {/* <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Data Source</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={datasourceValue}
                  onChange={handleChangeDatasource}
                  label='Data Source'
                >
                  <MenuItem key='no-value-ds' value=''>
                    All
                  </MenuItem>
                  {dataSource?.status === 'success' &&
                    dataSource.data &&
                    dataSource.data?.results.length &&
                    dataSource.data?.results.map((data: any) => (
                      <MenuItem key={data.uuid} value={data.uuid}>
                        {data.source_name}
                      </MenuItem>
                    ))}
                </Select>
              </StyledFormControl> */}
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                className='auto_drop'
                id='dropdown-datasource'
                options={
                  (revenueSourceMasterList?.status === 'success' &&
                    revenueSourceMasterList?.data &&
                    revenueSourceMasterList?.data.length &&
                    revenueSourceMasterList.data) ||
                  []
                }
                getOptionLabel={(option: any) => option.name}
                getOptionSelected={(option, value) => {
                  if (option.uuid === value.uuid) {
                    setRevenueSource(option.uuid);
                  }
                  return option.uuid === value.uuid;
                }}
                style={{ width: 320 }}
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
              <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Calendar Settings</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={calendar}
                  onChange={handleCalendar}
                  label='Status'
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
                    value={firstDay}
                    onChange={handleStartDate}
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
                    value={newDate}
                    onChange={handleEndDate}
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
                    value={prevMonthFirstDate}
                    onChange={handleStartDate}
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
                    value={prevMonthLastDate}
                    onChange={handleEndDate}
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
          {/* <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container spacing={3} justify='flex-start'>
                  <StyledGrid item xs={12} sm={4}>
                    <KeyboardDatePicker
                      margin='normal'
                      id='from-picker-dialog'
                      label='Start Date'
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
                      id='date-picker-dialog'
                      label='End Date'
                      format='dd/MM/yyyy'
                      value={endDate}
                      onChange={handleEndDate}
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                    />
                  </StyledGrid>
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            <StyledGrid item xs={12} sm={4}>
              <Button variant='contained' color='primary' onClick={handleExportCsv}>
                Export as a Csv
              </Button>
            </StyledGrid>
          </Grid> */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              {isLoading && <Loader />}
              {!isLoading && (
                <RevenueDataTable
                  revenueDataList={revenueDataList}
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
  exportRevenueDataCsv: state.exportRevenueDataCsv.data,
  revenueSourceMasterList: state.revenueSourceMasterList.data
});

export default connect(mapStateToProps)(RevenueDataSection);
