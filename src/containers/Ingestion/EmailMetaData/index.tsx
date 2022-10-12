/* eslint-disable no-console */

import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import locale from 'date-fns/locale/en-US';
import DateFnsUtils from '@date-io/date-fns';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useSnackbar, VariantType } from 'notistack';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Breadcumb from '../../../components/Breadcumb';
import EmailDataTable from './DataTable';
import Loader from '../../../components/Loader';
import { MainContentWrapper, ContentBoxWrapper, StyledFormControl, StyledGrid } from './Styled';

// Props Interface
interface IProps {
  dispatch: Function;
  dataSource: {
    data: any;
    status: string;
  };
  emailMetaDatalist: {
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
  retrigger: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
}

const EmailMetaSection: React.FC<IProps> = ({
  dispatch,
  dataSource,
  customerData,
  statusList,
  retrigger,
  emailMetaDatalist
}: IProps) => {
  const [datasourceValue, setDatasource] = useState('');
  const [customerValue, setCustomer] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [orderBy, setOrderBy] = useState<string>('created_at');
  const [startDate, setStartDate] = useState<Date | string | null>(null);
  const [endDate, setEndDate] = useState<Date | string | null>(null);
  const initialRender = useRef({ initial: true });
  const eventClick = useRef({ value: '' });
  const [calendar, setCalendar] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  // const [isUpdate, setIsUpdate] = useState(false);
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

  // emailMetaDatalist updating and loader
  useEffect(() => {
    setIsLoading(false);
  }, [emailMetaDatalist]);

  // statusList updating and loader
  useEffect(() => {
    setIsLoading(false);
  }, [statusList]);

  // customerData updating and loader
  useEffect(() => {
    setIsLoading(false);
  }, [customerData]);

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
  }, [dispatch]);

  // Calling Revenue list api
  useEffect(() => {
    // Calling api only if api return with success response
    // Call initial api when initial page load and set DataSource
    if (initialRender.current.initial) {
      // Get email metadata list api call
      dispatch({
        type: 'GET_EMAIL_METADATA_LIST',
        payload: {
          page: page + 1,
          rowsPerPage,
          orderBy,
          status,
          customer: customerValue,
          dataSource: datasourceValue,
          startDate,
          endDate
        }
      });
      setTimeout(() => {
        initialRender.current.initial = false;
      });
    } else {
      !initialRender.current.initial &&
        dispatch({
          type: 'GET_EMAIL_METADATA_LIST',
          payload: {
            page: page + 1,
            rowsPerPage,
            orderBy,
            status,
            customer: customerValue,
            dataSource: datasourceValue,
            startDate,
            endDate
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
    rowsPerPage,
    startDate,
    status
  ]);

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
    setDatasource(event.target.value as string);
  };

  // Handle Customer
  const handleChangeCustomer = (event: ChangeEvent<{ value: unknown }>) => {
    setIsLoading(true);
    setCustomer(event.target.value as string);
  };

  // Handle handleChangeStatus
  const handleChangeStatus = (event: ChangeEvent<{ value: unknown }>) => {
    setIsLoading(true);
    console.log(event.target.value, 'event.target.value');
    setStatus(event.target.value as string);
  };

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

  // const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
  //   setAge(event.target.value as string);
  // };

  // Handle handleRetrigger
  const handleRetrigger = () => {
    eventClick.current.value = 'trigger';
    dispatch({
      type: 'GET_RETRIGGER'
    });
  };

  // Handle enqueueSnackbar
  useEffect(() => {
    const handleSnack = (variant: VariantType, msg: string) => {
      enqueueSnackbar(msg, {
        variant
      });
    };

    if (eventClick.current.value === 'trigger' && retrigger?.status === 'success') {
      handleSnack('success', 'Retriggered Imports Successfully');
    }
    if (eventClick.current.value === 'trigger' && retrigger?.status === 'failure') {
      handleSnack('error', 'Something Went Wrong');
    }
    eventClick.current.value = '';
  }, [retrigger, enqueueSnackbar]);

  // Callback for update
  const updateList = () => {
    dispatch({
      type: 'GET_EMAIL_METADATA_LIST',
      payload: {
        page: page + 1,
        rowsPerPage,
        orderBy,
        status,
        customer: customerValue,
        dataSource: datasourceValue,
        startDate,
        endDate
      }
    });
  };

  // Handle page and rowsperPage
  const handlePaginationAndUpdateList = (type: string, value: number) => {
    initialRender.current.initial = true;
    if (type === 'page') {
      dispatch({
        type: 'GET_EMAIL_METADATA_LIST',
        payload: {
          page: value + 1,
          rowsPerPage,
          orderBy,
          status,
          customer: customerValue,
          dataSource: datasourceValue,
          startDate,
          endDate
        }
      });
      setPage(value);
    } else {
      dispatch({
        type: 'GET_EMAIL_METADATA_LIST',
        payload: {
          page: 1,
          rowsPerPage: value,
          orderBy,
          status,
          customer: customerValue,
          dataSource: datasourceValue,
          startDate,
          endDate
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
      type: 'GET_EMAIL_METADATA_LIST',
      payload: {
        page: page + 1,
        rowsPerPage,
        status,
        customer: customerValue,
        dataSource: datasourceValue,
        orderBy: !isAsyn ? property : `-${property}`,
        startDate,
        endDate
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
          breadCrumb={{ page: 'Data Ingestion', data: ['Data Ingestion', 'File Ingestion'] }}
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
                <InputLabel id='demo-simple-select-outlined-label'>Status</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={status}
                  onChange={handleChangeStatus}
                  label='Status'
                >
                  <MenuItem key='no-value-status' value=''>
                    All
                  </MenuItem>
                  {/* {statusList?.status === 'success' &&
                    statusList?.data &&
                    statusList.data?.length &&
                    statusList.data?.map((data: any) => (
                      <MenuItem key={data.id} value={data.id}>
                        {data.value}
                      </MenuItem>
                    ))} */}
                  <MenuItem value='true'>Success</MenuItem>
                  <MenuItem value='false'>Fail</MenuItem>
                </Select>
              </StyledFormControl>
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
              <Button variant='contained' color='primary' onClick={handleRetrigger}>
                Retrigger Queued Imports
              </Button>
            </StyledGrid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              {isLoading && <Loader />}
              {!isLoading && (
                <EmailDataTable
                  emailMetaDatalist={emailMetaDatalist}
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
  emailMetaDatalist: state.emailMetaDataList.data,
  retrigger: state.retrigger.data
});

export default connect(mapStateToProps)(EmailMetaSection);
