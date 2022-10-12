/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-console */
import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Autocomplete from '@material-ui/lab/Autocomplete';
import locale from 'date-fns/locale/en-US';
import { useSnackbar, VariantType } from 'notistack';
import Breadcumb from '../../../components/Breadcumb';
import RevenueSourceTable from './RevenueSource';
import Loader from '../../../components/Loader';
import validationRules from './AddRevenueValidate';
import masterValidationRules from './MasterRevenueValidate';
import { validate } from '../../../utils/helper';
import {
  MainContentWrapper,
  ContentBoxWrapper,
  StyledFormControl,
  DialogContentWrapper,
  StyledErrorWrapper,
  StyledButton,
  UnorderedList,
  StyledDialog,
  InputFieldArea
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
  addRevenueSource: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  bulkUpdateRevenueSource: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  customerData: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  revenueSourceMasterList: {
    option: any;
    data: [
      {
        uuid: number;
        name: string;
      }
    ];
    status: string;
    message: {
      data?: string;
    };
  };
  addRevenueSourceMaster: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };

  answerOptionsReducer: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
}

// Error Interface
interface IError {
  name?: string;
  revenueSource?: string;
  revenueCalculations?: string;
  impressionValue?: number;
  dailyAdvanceFee?: number;
  haircut?: number;
  paymentTerms?: number;
  feeSetting?: string;
  advanceFrequency?: string | number;
  billingMonth?: number;
  weekStartDay?: number;
  weekStartDayTwo?: number;
  biWeeklyStartDate?: Date | string | null;
  payoutTime?: number;
  salesTax?: string;
  closingDay?: number;
  selectMasterValue?: string;
  masterName?: string;
}

if (locale && locale.options) {
  locale.options.weekStartsOn = 1;
}

// // BulkArray Interface
// interface bulkInterface {
//   currency?: string;
//   impression_value?: any;
//   revenue_calculations?: any;
//   daily_advance_fee?: any;
//   haircut?: any;
//   payment_terms?: any;
//   payout_time?: any;
//   included?: string;
//   fee_setting?: string;
//   advance_frequency?: string;
//   billing_month?: string;
//   week_start_day?: string;
//   week_start_day_two?: string;
//   bi_weekly_start_date?: Date | string | null;
// }

const RevenueSource: React.FC<IProps> = ({
  dispatch,
  dataSource,
  customerData,
  revenueSourceList,
  answerOptionsReducer,
  addRevenueSource,
  bulkUpdateRevenueSource,
  revenueSourceMasterList,
  addRevenueSourceMaster
}: IProps) => {
  const [datasourceValue, setDatasource] = useState('');
  const [error, setError] = useState<IError>({});
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMasterLoader, setIsMasterLoader] = useState(false);
  const [page, setPage] = useState(0);
  const [selectedArr, setSelectedArr] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState<string>('');
  const [revenue, setRevenue] = useState({
    name: '',
    currency: '',
    impressionValue: '',
    revenueSource: '',
    included: false,
    revenueCalculations: '',
    dailyAdvanceFee: null,
    haircut: null,
    paymentTerms: null,
    feeSetting: null,
    advanceFrequency: null,
    billingMonth: null,
    weekStartDay: null,
    weekStartDayTwo: null,
    biWeeklyStartDate: null,
    payoutTime: null,
    salesTax: null,
    closingDay: null,
    selectMasterValue: ''
  });
  const [customerValue, setCustomer] = useState('');
  const [popcustomerValue, setPopCustomer] = useState('');
  const [revenueSource, setRevenueSource] = useState('');
  const [masterRevenue, setMasterRevenue] = useState({
    masterName: '',
    countryCode: '',
    city: '',
    addressOne: '',
    addressTwo: '',
    postcode: '',
    companyNo: ''
  });
  const [isMasterModal, setIsMasterModal] = useState(false);
  const [bulkUpdateArray, setBulkUpdateArray] = useState<any>({});
  const [bulkUpdate, setBulkUpdate] = useState('');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const initialRender = useRef({ initial: true });
  const { enqueueSnackbar } = useSnackbar();
  const isUpdateAndDelete = useRef({ isActive: false });
  const eventClick = useRef({ value: '' });
  let bulkArray: any = {};
  const [selected, setSelected] = useState<string[]>([]);
  // const [masterValue, setMasterValue] = useState<any[]>([]);
  const [selectMasterValue, setSelectMasterValue] = useState<any>('');
  const [inputValue, setInputValue] = useState('');

  // Calling dataSource api for DS list
  useEffect(() => {
    dispatch({
      type: 'DATA_SOURCE',
      payload: {
        page: 1,
        rowsPerPage: 100,
        orderBy: 'name'
      }
    });

    dispatch({
      type: 'OPTIONS_LIST'
    });

    // Get customer list api call
    dispatch({
      type: 'GET_CUSTOMER_LIST',
      payload: {
        page: 1,
        rowsPerPage: 1000,
        orderBy: 'customer_name'
      }
    });
  }, [dispatch]);

  // Data updating and loader
  useEffect(() => {
    setIsLoading(false);
  }, [revenueSourceList]);

  // Handling add revenue source api
  useEffect(() => {
    const handleSnack = (variant: VariantType) => {
      enqueueSnackbar(
        addRevenueSource.message.data ? addRevenueSource.message.data : addRevenueSource.message,
        {
          variant
        }
      );
    };
    if (addRevenueSource?.status === 'success' && open && !initialRender.current.initial) {
      dispatch({
        type: 'REVENUE_SOURCE_LIST',
        payload: {
          dataSource: datasourceValue,
          page: page + 1,
          rowsPerPage,
          orderBy,
          customer: customerValue,
          revenueSource
        }
      });
      setOpen(false);
    }
    if (addRevenueSource?.status === 'failure' && !initialRender.current.initial) {
      handleSnack('error');
      isUpdateAndDelete.current.isActive = false;
    }
  }, [
    datasourceValue,
    dispatch,
    open,
    addRevenueSource,
    enqueueSnackbar,
    page,
    rowsPerPage,
    orderBy,
    customerValue,
    revenueSource
  ]);

  // Calling dataSource api for DS list
  useEffect(() => {
    const handleSnack = (variant: VariantType, msg: string) => {
      enqueueSnackbar(msg, {
        variant
      });
    };
    if (
      bulkUpdateRevenueSource?.status === 'success' &&
      eventClick.current.value === 'bulk_update'
    ) {
      handleSnack('success', 'Bulk update Successfully');
      setBulkUpdateArray({});
      setSelectedArr([]);
      setSelected([]);
      dispatch({
        type: 'REVENUE_SOURCE_LIST',
        payload: {
          dataSource: datasourceValue,
          page: page + 1,
          rowsPerPage,
          orderBy,
          customer: customerValue,
          revenueSource
        }
      });
    }
    if (
      bulkUpdateRevenueSource?.status === 'failure' &&
      eventClick.current.value === 'bulk_update'
    ) {
      handleSnack('error', 'Something Went Wrong');
    }
    eventClick.current.value = '';
  }, [
    bulkUpdateRevenueSource,
    customerValue,
    datasourceValue,
    dispatch,
    enqueueSnackbar,
    orderBy,
    page,
    revenueSource,
    rowsPerPage
  ]);

  // Calling Revenue list api
  useEffect(() => {
    // Calling api only if api return with success response
    if (dataSource?.status === 'success' && dataSource?.data?.results.length) {
      // Call initial api when initial page load and set DataSource
      if (initialRender.current.initial && !datasourceValue) {
        // setDatasource(dataSource.data.results[0].uuid);
        dispatch({
          type: 'REVENUE_SOURCE_LIST',
          payload: {
            // dataSource: dataSource.data.results[0].uuid,
            dataSource: datasourceValue,
            page: page + 1,
            rowsPerPage,
            orderBy,
            customer: customerValue,
            revenueSource
          }
        });
        setTimeout(() => {
          initialRender.current.initial = false;
        });
      } else {
        !initialRender.current.initial &&
          dispatch({
            type: 'REVENUE_SOURCE_LIST',
            payload: {
              dataSource: datasourceValue,
              page: page + 1,
              rowsPerPage,
              orderBy,
              customer: customerValue,
              revenueSource
            }
          });
      }
    }
  }, [
    customerValue,
    dataSource,
    datasourceValue,
    dispatch,
    orderBy,
    page,
    revenueSource,
    rowsPerPage
  ]);

  // Handle Customer
  const handleChangeCustomer = (event: ChangeEvent<{ value: unknown }>) => {
    setIsLoading(true);
    setCustomer(event.target.value as string);
    eventClick.current.value = 'clicked';
  };

  // Handle Open Modal
  const handleClickOpen = () => {
    initialRender.current.initial = true;
    setOpen(true);
    setTimeout(() => {
      initialRender.current.initial = false;
    }, 500);
  };

  // Handle Close Modal
  const handleClose = () => {
    eventClick.current.value = '';
    setOpen(false);
    setRevenue({
      name: '',
      currency: '',
      impressionValue: '',
      revenueSource: '',
      included: false,
      revenueCalculations: '',
      dailyAdvanceFee: null,
      haircut: null,
      paymentTerms: null,
      feeSetting: null,
      advanceFrequency: null,
      billingMonth: null,
      weekStartDay: null,
      weekStartDayTwo: null,
      biWeeklyStartDate: null,
      payoutTime: null,
      salesTax: null,
      closingDay: null,
      selectMasterValue: ''
    });
    setError({});
  };
  // Handle Close Master Modal
  const handleMasterClose = () => {
    eventClick.current.value = '';
    setIsMasterModal(false);
    setMasterRevenue({
      masterName: '',
      countryCode: '',
      city: '',
      addressOne: '',
      addressTwo: '',
      postcode: '',
      companyNo: ''
    });
    setError({});
  };

  // Handle Data Source
  const handleChangeDatasource = (event: ChangeEvent<{ value: unknown }>) => {
    setIsLoading(true);
    setDatasource(event.target.value as string);
  };
  // Handle Data Source
  const handleBulkUpdate = (event: ChangeEvent<{ value: unknown }>) => {
    bulkArray = bulkUpdateArray;
    bulkArray[`${event.target.value}`] = event.target.value === 'bi_weekly_start_date' ? null : '';
    setBulkUpdate(event.target.value as string);
    setBulkUpdateArray(bulkArray);
  };

  // Validation of user fields
  const handleValidate = () => {
    let validRes = { errors: {}, isValid: false };
    validRes = validate({ ...revenue, selectMasterValue }, validationRules);
    setError(validRes.errors);
    return validRes.isValid;
  };

  // Validation of master fields
  const handleMasterValidate = () => {
    let validRes = { errors: {}, isValid: false };
    validRes = validate({ ...masterRevenue }, masterValidationRules);
    setError(validRes.errors);
    return validRes.isValid;
  };

  // Handle On Change
  const handleChange = (e: any) => {
    setRevenue({
      ...revenue,
      [e.target.name]: e.target.value
    });
  };

  // Handle handleMasterChange On Change
  const handleMasterChange = (e: any) => {
    setMasterRevenue({
      ...masterRevenue,
      [e.target.name]: e.target.value
    });
  };

  // Handle confirm button
  const handleConfirm = () => {
    if (handleValidate()) {
      isUpdateAndDelete.current.isActive = true;
      dispatch({
        type: 'ADD_REVENUE_SOURCE',
        payload: { ...revenue, selectMasterValue, popcustomerValue }
      });
    }
  };

  // Callback for update
  const updateList = () => {
    dispatch({
      type: 'REVENUE_SOURCE_LIST',
      payload: {
        dataSource: datasourceValue,
        page: page + 1,
        rowsPerPage,
        orderBy,
        customer: customerValue,
        revenueSource
      }
    });
  };

  // Handle page and rowsperPage
  const handlePaginationAndUpdateList = (type: string, value: number) => {
    initialRender.current.initial = true;
    if (type === 'page') {
      dispatch({
        type: 'REVENUE_SOURCE_LIST',
        payload: {
          dataSource: datasourceValue,
          page: value + 1,
          rowsPerPage,
          orderBy,
          customer: customerValue,
          revenueSource
        }
      });
      setPage(value);
    } else {
      dispatch({
        type: 'REVENUE_SOURCE_LIST',
        payload: {
          dataSource: datasourceValue,
          page: 1,
          rowsPerPage: value,
          orderBy,
          customer: customerValue,
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
      type: 'REVENUE_SOURCE_LIST',
      payload: {
        dataSource: datasourceValue,
        page: page + 1,
        rowsPerPage,
        orderBy: !isAsyn ? property : `-${property}`,
        customer: customerValue,
        revenueSource
      }
    });
    setOrderBy(property);
    setTimeout(() => {
      initialRender.current.initial = false;
    }, 500);
  };

  let headerData: any = [];
  if (
    revenueSourceList?.status === 'success' &&
    revenueSourceList?.data &&
    revenueSourceList?.data?.results.length
  ) {
    Object.keys(revenueSourceList.data.results[0]).map((data) => {
      if (
        data !== 'uuid' &&
        data !== 'data_source' &&
        data !== 'name' &&
        data !== 'created_at' &&
        data !== 'deleted_at'
      ) {
        headerData = [
          ...headerData,
          { uuid: data, label: data.replaceAll('_', ' ').toLocaleUpperCase() }
        ];
      }
      return '';
    });
  }

  // Handle Select
  const handleSelect = (e: any, type: string) => {
    const item = {
      ...bulkUpdateArray,
      [type]: type === 'included' ? JSON.parse(e.target.value) : e.target.value
    };
    setBulkUpdateArray(item);
  };

  // Handle Bi Weekly Date
  const handleBiWeeklyDate = (date: Date | null) => {
    const item = {
      ...bulkUpdateArray,
      bi_weekly_start_date: date ? moment(date).format('YYYY-MM-DD') : null
    };
    setBulkUpdateArray(item);
  };

  // Handle Delete key
  const handleDelete = (key: string) => {
    const updateArr = { ...bulkUpdateArray };
    delete updateArr[key];
    setBulkUpdateArray(updateArr);
    setBulkUpdate('');
  };

  const handleBulkUpdateButton = () => {
    eventClick.current.value = 'bulk_update';
    dispatch({
      type: 'BULK_UPDATE_REVENUE_SOURCE',
      payload: {
        ids: selectedArr,
        update: bulkUpdateArray
      }
    });
  };

  const updateSelectedCheckbox = (arr: any) => {
    setSelectedArr(arr);
  };

  // Handle all select Checkbox
  const handleDate = (date: Date | null, type: any) => {
    const item = {
      ...revenue,
      [type]: date ? moment(date).format('YYYY-MM-DD') : null
    };
    setRevenue(item);
  };

  // Data updating and loader
  useEffect(() => {
    dispatch({
      type: 'REVENUE_SOURCE_MASTER_LIST',
      payload: {}
    });
  }, [dispatch]);

  // Handle Input change inside add master revenue source
  const handleInputChange = (event: ChangeEvent<{ value: unknown }>) => {
    setInputValue(event.target.value as string);
    setMasterRevenue({ ...masterRevenue, masterName: event.target.value as string });
    setSelectMasterValue('');
  };

  // handleAddRevenueMaster
  const handleAddRevenueMaster = () => {
    setIsMasterModal(true);
  };

  // handleMasterRevenueConfirm confirm button
  const handleMasterRevenueConfirm = () => {
    if (handleMasterValidate()) {
      setIsMasterLoader(true);
      eventClick.current.value = 'add_master_revenue';
      // eslint-disable-next-line no-console
      console.log('', inputValue);

      dispatch({
        type: 'ADD_REVENUE_SOURCE_MASTER',
        payload: masterRevenue
      });
    }
  };

  // Calling add revenue master api.
  useEffect(() => {
    const handleSnack = (variant: VariantType, msg: string) => {
      enqueueSnackbar(msg, {
        variant
      });
    };

    const handleError = (variant: VariantType) => {
      enqueueSnackbar(
        addRevenueSourceMaster.message.data
          ? addRevenueSourceMaster.message.data
          : addRevenueSourceMaster.message,
        {
          variant
        }
      );
    };

    if (
      addRevenueSourceMaster?.status === 'success' &&
      eventClick.current.value === 'add_master_revenue'
    ) {
      handleSnack('success', 'Master Revenue Source Added!');
      setIsMasterLoader(false);
      handleMasterClose();
      dispatch({
        type: 'REVENUE_SOURCE_MASTER_LIST',
        payload: {}
      });
      eventClick.current.value = '';
    }
    if (
      addRevenueSourceMaster?.status === 'failure' &&
      eventClick.current.value === 'add_master_revenue'
    ) {
      handleError('error');
      setIsMasterLoader(false);
      eventClick.current.value = '';
    }
  }, [addRevenueSourceMaster, dispatch, enqueueSnackbar]);

  // Handle Revenue Source
  const handleRevenueSource = (event: ChangeEvent<{ value: unknown }>) => {
    setIsLoading(true);
    setRevenueSource(event.target.value as string);
  };

  useEffect(() => {
    dataSource?.data?.results.unshift({
      source_name: 'Factor Invoice',
      uuid: null,
      value: 'null'
    });
  }, [dataSource?.data?.results]);

  return (
    <>
      <MainContentWrapper>
        <Breadcumb
          breadCrumb={{ page: 'Customers', data: ['Customers', 'Revenue Source Pricing'] }}
        />
        <ContentBoxWrapper>
          <Grid container spacing={3}>
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
                    label='Master Revenue Source'
                    variant='outlined'
                    value={(e: any) => {}}
                    onChange={(e) => handleRevenueSource(e)}
                  />
                )}
              />
              {/* <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>
                  Master Revenue Source
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={revenueSource}
                  onChange={handleRevenueSource}
                  label='Master Revenue Source'
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
                  <MenuItem key='no-value-customer' value=''>
                    All
                  </MenuItem>
                  {dataSource.status === 'success' &&
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
            <Grid item xs={12} sm={6}>
              {selectedArr.length ? (
                <StyledFormControl variant='outlined'>
                  <InputLabel id='demo-simple-select-outlined-label'>Bulk Update</InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    value={bulkUpdate}
                    onChange={handleBulkUpdate}
                    label='Bulk Update'
                  >
                    {headerData.length &&
                      headerData.map((data: any) => (
                        <MenuItem key={data.uuid} value={data.uuid}>
                          {data.label}
                        </MenuItem>
                      ))}
                  </Select>
                </StyledFormControl>
              ) : (
                ''
              )}
              <UnorderedList>
                {Object.keys(bulkUpdateArray).map((data) => {
                  if (data === 'currency') {
                    return (
                      <li key={data}>
                        <Typography>{data.replaceAll('_', ' ').toLocaleUpperCase()}</Typography>
                        <InputFieldArea>
                          <StyledFormControl variant='outlined'>
                            <InputLabel id='demo-simple-select-outlined-label'>
                              {data.replaceAll('_', ' ').toLocaleUpperCase()}
                            </InputLabel>
                            <Select
                              labelId='demo-simple-select-label'
                              id='demo-simple-select-currency'
                              value={bulkUpdateArray[data]}
                              name='currency'
                              onChange={(e) => handleSelect(e, data)}
                            >
                              <MenuItem value='CAD'>CAD</MenuItem>
                              <MenuItem value='EUR'>EUR</MenuItem>
                              <MenuItem value='GBP'>GBP</MenuItem>
                              <MenuItem value='INR'>INR</MenuItem>
                              <MenuItem value='USD'>USD</MenuItem>
                            </Select>
                          </StyledFormControl>
                        </InputFieldArea>
                        <IconButton aria-label='delete' onClick={() => handleDelete(data)}>
                          <CloseIcon />
                        </IconButton>
                      </li>
                    );
                  }
                  if (data === 'included') {
                    return (
                      <li key={data}>
                        <Typography>{data.replaceAll('_', ' ').toLocaleUpperCase()}</Typography>
                        <InputFieldArea>
                          <StyledFormControl variant='outlined'>
                            <InputLabel id='demo-simple-select-outlined-label'>
                              {data.replaceAll('_', ' ').toLocaleUpperCase()}
                            </InputLabel>
                            <Select
                              labelId='demo-simple-select-label'
                              id='demo-simple-select-included'
                              value={bulkUpdateArray[data]}
                              name='included'
                              onChange={(e) => handleSelect(e, data)}
                            >
                              <MenuItem value='true'>YES</MenuItem>
                              <MenuItem value='false'>NO</MenuItem>
                            </Select>
                          </StyledFormControl>
                        </InputFieldArea>
                        <IconButton aria-label='delete' onClick={() => handleDelete(data)}>
                          <CloseIcon />
                        </IconButton>
                      </li>
                    );
                  }
                  if (data === 'fee_setting') {
                    return (
                      <li key={data}>
                        <Typography>{data.replaceAll('_', ' ').toLocaleUpperCase()}</Typography>
                        <InputFieldArea>
                          <StyledFormControl variant='outlined'>
                            <InputLabel id='demo-simple-select-outlined-label'>
                              {data.replaceAll('_', ' ').toLocaleUpperCase()}
                            </InputLabel>
                            <Select
                              labelId='demo-simple-select-label'
                              id='demo-simple-select-fee_setting'
                              value={bulkUpdateArray[data]}
                              name='currency'
                              onChange={(e) => handleSelect(e, data)}
                            >
                              <MenuItem value='fixed'>FIXED</MenuItem>
                              <MenuItem value='variable'>VARIABLE</MenuItem>
                            </Select>
                          </StyledFormControl>
                        </InputFieldArea>
                        <IconButton
                          className='ddeeddee'
                          aria-label='delete'
                          onClick={() => handleDelete(data)}
                        >
                          <CloseIcon />
                        </IconButton>
                      </li>
                    );
                  }
                  if (data === 'billing_month') {
                    return (
                      <li key={data}>
                        <Typography>{data.replaceAll('_', ' ').toLocaleUpperCase()}</Typography>
                        <InputFieldArea>
                          <StyledFormControl variant='outlined'>
                            <InputLabel id='demo-simple-select-outlined-label'>
                              {data.replaceAll('_', ' ').toLocaleUpperCase()}
                            </InputLabel>
                            <Select
                              labelId='demo-simple-select-label'
                              id='demo-simple-select-billing_month'
                              value={bulkUpdateArray[data]}
                              name='currency'
                              onChange={(e) => handleSelect(e, data)}
                            >
                              <MenuItem key='Separate-months' value={1}>
                                Separate months
                              </MenuItem>
                              <MenuItem key='first-monday' value={2}>
                                1st monday to next month 1st sunday
                              </MenuItem>
                              <MenuItem key='first-sunday' value={3}>
                                1st sunday to next month 1st saturday
                              </MenuItem>
                              <MenuItem key='last sunday' value={4}>
                                Last month last monday to last sunday
                              </MenuItem>
                              <MenuItem key='last saturday' value={5}>
                                Last month last sunday to last saturday
                              </MenuItem>
                            </Select>
                          </StyledFormControl>
                        </InputFieldArea>
                        <IconButton aria-label='delete' onClick={() => handleDelete(data)}>
                          <CloseIcon />
                        </IconButton>
                      </li>
                    );
                  }
                  if (data === 'advance_frequency') {
                    return (
                      <li key={data}>
                        <Typography>{data.replaceAll('_', ' ').toLocaleUpperCase()}</Typography>
                        <InputFieldArea>
                          <StyledFormControl variant='outlined'>
                            <InputLabel id='demo-simple-select-outlined-label'>
                              {data.replaceAll('_', ' ').toLocaleUpperCase()}
                            </InputLabel>
                            <Select
                              labelId='demo-simple-select-label'
                              id='demo-simple-select-frequency'
                              value={bulkUpdateArray[data]}
                              name='currency'
                              onChange={(e) => handleSelect(e, data)}
                            >
                              <MenuItem key='no-value-daily' value='daily'>
                                Daily
                              </MenuItem>
                              <MenuItem key='no-value-twice_a_week' value='twice_a_week'>
                                Twice a week
                              </MenuItem>
                              <MenuItem key='no-value-weekly' value='weekly'>
                                Weekly
                              </MenuItem>
                              <MenuItem key='no-value-two_weekly' value='two_weekly'>
                                Two Weekly
                              </MenuItem>
                              <MenuItem key='no-value-monthly' value='monthly'>
                                Monthly
                              </MenuItem>
                            </Select>
                          </StyledFormControl>
                        </InputFieldArea>
                        <IconButton aria-label='delete' onClick={() => handleDelete(data)}>
                          <CloseIcon />
                        </IconButton>
                      </li>
                    );
                  }
                  if (data === 'week_start_day') {
                    return (
                      <li key={data}>
                        <Typography>{data.replaceAll('_', ' ').toLocaleUpperCase()}</Typography>
                        <InputFieldArea>
                          <StyledFormControl variant='outlined'>
                            <InputLabel id='demo-simple-select-outlined-label'>
                              {data.replaceAll('_', ' ').toLocaleUpperCase()}
                            </InputLabel>
                            <Select
                              labelId='demo-simple-select-label'
                              id='demo-simple-select-week_start_day'
                              value={bulkUpdateArray[data]}
                              name='currency'
                              onChange={(e) => handleSelect(e, data)}
                            >
                              <MenuItem key='no-value-status' value={0}>
                                Monday
                              </MenuItem>
                              <MenuItem key='no-value-status' value={5}>
                                Saturday
                              </MenuItem>
                              <MenuItem key='no-value-status' value={6}>
                                Sunday
                              </MenuItem>
                            </Select>
                          </StyledFormControl>
                        </InputFieldArea>
                        <IconButton aria-label='delete' onClick={() => handleDelete(data)}>
                          <CloseIcon />
                        </IconButton>
                      </li>
                    );
                  }
                  if (data === 'week_start_day_two') {
                    return (
                      <li key={data}>
                        <Typography>{data.replaceAll('_', ' ').toLocaleUpperCase()}</Typography>
                        <InputFieldArea>
                          <StyledFormControl variant='outlined'>
                            <InputLabel id='demo-simple-select-outlined-label'>
                              {data.replaceAll('_', ' ').toLocaleUpperCase()}
                            </InputLabel>
                            <Select
                              labelId='demo-simple-select-label'
                              id='demo-simple-select-week_start_day_two'
                              value={bulkUpdateArray[data]}
                              name='currency'
                              onChange={(e) => handleSelect(e, data)}
                            >
                              <MenuItem key='no-value-status' value={1}>
                                Tuesday
                              </MenuItem>
                              <MenuItem key='no-value-status' value={2}>
                                Wednesday
                              </MenuItem>
                              <MenuItem key='no-value-status' value={3}>
                                Thursday
                              </MenuItem>
                              <MenuItem key='no-value-status' value={4}>
                                Friday
                              </MenuItem>
                            </Select>
                          </StyledFormControl>
                        </InputFieldArea>
                        <IconButton aria-label='delete' onClick={() => handleDelete(data)}>
                          <CloseIcon />
                        </IconButton>
                      </li>
                    );
                  }
                  if (data === 'bi_weekly_start_date') {
                    return (
                      <li key={data}>
                        <Typography>{data.replaceAll('_', ' ').toLocaleUpperCase()}</Typography>
                        <InputFieldArea>
                          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
                            <KeyboardDatePicker
                              className='twoWeekly'
                              margin='normal'
                              id='date-picker-dialog'
                              label='Bi Weekly Start Date'
                              format='dd/MM/yyyy'
                              value={bulkUpdateArray[data]}
                              onChange={handleBiWeeklyDate}
                              KeyboardButtonProps={{
                                'aria-label': 'change date'
                              }}
                            />
                          </MuiPickersUtilsProvider>
                          <IconButton aria-label='delete' onClick={() => handleDelete(data)}>
                            <CloseIcon />
                          </IconButton>
                        </InputFieldArea>
                      </li>
                    );
                  }
                  return (
                    <li key={data}>
                      <Typography>{data.replaceAll('_', ' ').toLocaleUpperCase()}</Typography>
                      <InputFieldArea>
                        <TextField
                          id='outlined-number'
                          label='Number'
                          type='number'
                          name={`${data}`}
                          InputLabelProps={{
                            shrink: true
                          }}
                          value={bulkUpdateArray[data]}
                          onChange={(e) => handleSelect(e, data)}
                          variant='outlined'
                        />
                        <IconButton aria-label='delete' onClick={() => handleDelete(data)}>
                          <CloseIcon />
                        </IconButton>
                      </InputFieldArea>
                    </li>
                  );
                })}
                <li>
                  {Object.keys(bulkUpdateArray).length ? (
                    <StyledButton
                      variant='outlined'
                      color='primary'
                      onClick={handleBulkUpdateButton}
                    >
                      Bulk Update
                    </StyledButton>
                  ) : (
                    ''
                  )}
                </li>
              </UnorderedList>
            </Grid>
          </Grid>
          <Grid xs={12} sm={12} justify='flex-end' className='addColumn'>
            <StyledButton variant='outlined' color='primary' onClick={handleClickOpen}>
              Add Revenue Source
            </StyledButton>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              {isLoading && <Loader />}
              {!isLoading && (
                <RevenueSourceTable
                  revenueSourceList={revenueSourceList}
                  updateSelectedCheckbox={updateSelectedCheckbox}
                  updateList={updateList}
                  handleSortData={handleSortData}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  handlePaginationAndUpdateList={handlePaginationAndUpdateList}
                  selected={selected}
                  setSelected={setSelected}
                  answerOptionsReducer={answerOptionsReducer}
                />
              )}
            </Grid>
          </Grid>
        </ContentBoxWrapper>
      </MainContentWrapper>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogContentWrapper>
          <DialogTitle id='responsive-dialog-title'>Add New Revenue Source</DialogTitle>
          <DialogContent>
            <Grid container justify='space-between'>
              <Grid item xs={12}>
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
                    setPopCustomer(option.cust_id);
                    return option.cuid === value.cuid;
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Customer'
                      variant='outlined'
                      value={(e: any) => {}}
                      onChange={(e) => handleMasterChange(e)}
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} className='addMaster'>
                <Autocomplete
                  id='Add-Revenue-Master'
                  options={revenueSourceMasterList?.data || []}
                  getOptionLabel={(option) => option?.name}
                  getOptionSelected={(option, value) => {
                    setSelectMasterValue(option.uuid);
                    return option.uuid === value.uuid;
                  }}
                  debug
                  style={{ width: 320 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Add Revenue Master'
                      variant='outlined'
                      value={(e: any) => {}}
                      onChange={(e) => handleInputChange(e)}
                      error={error.selectMasterValue ? true : false}
                      helperText={error.selectMasterValue ? error.selectMasterValue : ''}
                    />
                  )}
                />
                {selectMasterValue ? (
                  ''
                ) : (
                  <Button variant='contained' color='primary' onClick={handleAddRevenueMaster}>
                    {isMasterLoader ? 'Loading.....!' : 'Add Revenue Master'}
                  </Button>
                )}
              </Grid>
              <Grid xs={12}>
                <TextField
                  id='outlined-textarea'
                  label='Revenue Name'
                  value={revenue.name}
                  placeholder='Enter Name'
                  multiline
                  variant='outlined'
                  name='name'
                  onChange={(e) => handleChange(e)}
                  error={error.name ? true : false}
                  helperText={error.name ? error.name : ''}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  value={revenue.impressionValue}
                  id='outlined-textarea'
                  label='Impression Value'
                  placeholder='Enter Impression value'
                  name='impressionValue'
                  multiline
                  variant='outlined'
                  onChange={(e) => handleChange(e)}
                  error={error.impressionValue ? true : false}
                  helperText={error.impressionValue ? error.impressionValue : ''}
                />
              </Grid>
              <Grid xs={12}>
                <FormControl className='selectClass'>
                  <InputLabel id='demo-simple-select-error-label'>Data Source</InputLabel>
                  <Select
                    labelId='demo-simple-select-error-label'
                    id='demo-simple-select-error'
                    value={revenue.revenueSource}
                    onChange={handleChange}
                    name='revenueSource'
                  >
                    {dataSource?.status === 'success' &&
                      dataSource?.data &&
                      dataSource?.data?.results.length &&
                      dataSource?.data?.results.map((data: any) => (
                        <MenuItem key={data.uuid} value={data.uuid}>
                          {data.source_name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <FormControl className='selectClass'>
                  <InputLabel id='demo-simple-select-label'>Currency</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={revenue.currency}
                    name='currency'
                    onChange={handleChange}
                  >
                    <MenuItem value='CAD'>CAD</MenuItem>
                    <MenuItem value='EUR'>EUR</MenuItem>
                    <MenuItem value='GBP'>GBP</MenuItem>
                    <MenuItem value='INR'>INR</MenuItem>
                    <MenuItem value='USD'>USD</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <FormControl className='selectClass'>
                  <InputLabel id='demo-simple-select-label'>Included</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={revenue.included}
                    name='included'
                    onChange={handleChange}
                  >
                    <MenuItem value='true'>Yes</MenuItem>
                    <MenuItem value='false'>No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <TextField
                  value={revenue.revenueCalculations}
                  id='outlined-textarea-revenueCalculations'
                  label='Revenue Calculation'
                  placeholder='Enter calculation value'
                  name='revenueCalculations'
                  multiline
                  variant='outlined'
                  rows={5}
                  onChange={(e) => handleChange(e)}
                  error={error.revenueCalculations ? true : false}
                  helperText={error.revenueCalculations ? error.revenueCalculations : ''}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  id='outlined-salesTax'
                  label='Sales Tax (%)'
                  type='text'
                  value={revenue.salesTax}
                  placeholder='Sales Tax(%)'
                  variant='outlined'
                  name='salesTax'
                  onChange={(e) => handleChange(e)}
                  error={error.salesTax ? true : false}
                  helperText={error.salesTax ? error.salesTax : ''}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  value={revenue.dailyAdvanceFee}
                  id='outlined-textarea-dailyAdvanceFee'
                  type='number'
                  label='Daily Advance Fee (%)'
                  placeholder='Enter calculation value'
                  name='dailyAdvanceFee'
                  variant='outlined'
                  onChange={(e) => handleChange(e)}
                  error={error.dailyAdvanceFee ? true : false}
                  helperText={error.dailyAdvanceFee ? error.dailyAdvanceFee : ''}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  value={revenue.haircut}
                  id='outlined-textarea-haircut'
                  type='number'
                  label='Haircut (%)'
                  placeholder='Enter haircut value'
                  name='haircut'
                  variant='outlined'
                  onChange={(e) => handleChange(e)}
                  error={error.haircut ? true : false}
                  helperText={error.haircut ? error.haircut : ''}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  value={revenue.paymentTerms}
                  id='outlined-textarea-paymentTerms'
                  type='number'
                  label='Payment Terms (days)'
                  placeholder='Enter paymentTerms value'
                  name='paymentTerms'
                  variant='outlined'
                  onChange={(e) => handleChange(e)}
                  error={error.paymentTerms ? true : false}
                  helperText={error.paymentTerms ? error.paymentTerms : ''}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  value={revenue.payoutTime}
                  id='outlined-textarea-payoutTime'
                  type='number'
                  label='Payout Times (days)'
                  placeholder='Enter payoutTime value'
                  name='payoutTime'
                  variant='outlined'
                  onChange={(e) => handleChange(e)}
                  error={error.payoutTime ? true : false}
                  helperText={error.payoutTime ? error.payoutTime : ''}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  value={revenue.closingDay}
                  id='outlined-textarea-dailyAdvanceFee'
                  type='number'
                  label='Closing days'
                  placeholder='Closing (days)'
                  name='closingDay'
                  variant='outlined'
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid xs={12}>
                <FormControl className='selectClass'>
                  <InputLabel id='demo-simple-select-label'>Fee Setting</InputLabel>
                  <Select
                    labelId='demo-simple-select-label-feeSetting'
                    id='demo-simple-select-feeSetting'
                    value={revenue.feeSetting}
                    name='feeSetting'
                    onChange={handleChange}
                  >
                    <MenuItem value='fixed'>FIXED</MenuItem>
                    <MenuItem value='variable'>VARIABLE</MenuItem>
                  </Select>
                  <StyledErrorWrapper>
                    {error.feeSetting ? error.feeSetting : ''}
                  </StyledErrorWrapper>
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <FormControl className='selectClass'>
                  <InputLabel id='demo-simple-select-label'>Advance Frequency</InputLabel>
                  <Select
                    labelId='demo-simple-select-label-feeSetting'
                    id='demo-simple-select-feeSetting'
                    value={revenue.advanceFrequency}
                    name='advanceFrequency'
                    onChange={handleChange}
                  >
                    <MenuItem key='no-value-daily' value='daily'>
                      Daily
                    </MenuItem>
                    <MenuItem key='no-value-twice_a_week' value='twice_a_week'>
                      Twice a week
                    </MenuItem>
                    <MenuItem key='no-value-weekly' value='weekly'>
                      Weekly
                    </MenuItem>
                    <MenuItem key='no-value-two_weekly' value='two_weekly'>
                      Two Weekly
                    </MenuItem>
                    <MenuItem key='no-value-monthly' value='monthly'>
                      Monthly
                    </MenuItem>
                  </Select>
                  <StyledErrorWrapper>
                    {error.advanceFrequency ? error.advanceFrequency : ''}
                  </StyledErrorWrapper>
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <FormControl className='selectClass'>
                  <InputLabel id='demo-simple-select-label'>Billing Month</InputLabel>
                  <Select
                    labelId='demo-simple-select-label-billingMonth'
                    id='demo-simple-select-billingMonth'
                    value={revenue.billingMonth}
                    name='billingMonth'
                    onChange={handleChange}
                  >
                    <MenuItem key='Separate-months' value={1}>
                      Calendar months
                    </MenuItem>
                    <MenuItem key='first-monday' value={2}>
                      1st monday to next month 1st sunday
                    </MenuItem>
                    <MenuItem key='first-sunday' value={3}>
                      1st sunday to next month 1st saturday
                    </MenuItem>
                    <MenuItem key='last sunday' value={4}>
                      Last month last monday to last sunday
                    </MenuItem>
                    <MenuItem key='last saturday' value={5}>
                      Last month last sunday to last saturday
                    </MenuItem>
                  </Select>
                  <StyledErrorWrapper>
                    {error.billingMonth ? error.billingMonth : ''}
                  </StyledErrorWrapper>
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <FormControl className='selectClass'>
                  <InputLabel id='demo-simple-select-label'>Week Start Day</InputLabel>
                  <Select
                    labelId='demo-simple-select-label-weekStartDay'
                    id='demo-simple-select-weekStartDay'
                    value={revenue.weekStartDay}
                    name='weekStartDay'
                    onChange={handleChange}
                  >
                    <MenuItem key='no-value-status' value={0}>
                      Monday
                    </MenuItem>
                    <MenuItem key='no-value-status' value={5}>
                      Saturday
                    </MenuItem>
                    <MenuItem key='no-value-status' value={6}>
                      Sunday
                    </MenuItem>
                  </Select>
                  <StyledErrorWrapper>
                    {error.weekStartDay ? error.weekStartDay : ''}
                  </StyledErrorWrapper>
                </FormControl>
              </Grid>
              {revenue.advanceFrequency === 'twice_a_week' ? (
                <Grid xs={12}>
                  <FormControl className='selectClass'>
                    <InputLabel id='demo-simple-select-label'>Midweek Start Day</InputLabel>
                    <Select
                      labelId='demo-simple-select-label-weekStartDayTwo'
                      id='demo-simple-select-weekStartDayTwo'
                      value={revenue.weekStartDayTwo}
                      name='weekStartDayTwo'
                      onChange={handleChange}
                    >
                      <MenuItem key='no-value-status' value={1}>
                        Tuesday
                      </MenuItem>
                      <MenuItem key='no-value-status' value={2}>
                        Wednesday
                      </MenuItem>
                      <MenuItem key='no-value-status' value={3}>
                        Thursday
                      </MenuItem>
                      <MenuItem key='no-value-status' value={4}>
                        Friday
                      </MenuItem>
                    </Select>
                    <StyledErrorWrapper>
                      {error.weekStartDayTwo ? error.weekStartDayTwo : ''}
                    </StyledErrorWrapper>
                  </FormControl>
                </Grid>
              ) : (
                ''
              )}
              {revenue.advanceFrequency === 'two_weekly' ? (
                <Grid xs={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={locale}>
                    <KeyboardDatePicker
                      className='twoWeekly'
                      margin='normal'
                      label='Two Weekly Start Date'
                      id='date-picker-dialog'
                      format='dd/MM/yyyy'
                      value={revenue.biWeeklyStartDate}
                      onChange={(e) => handleDate(e, 'biWeeklyStartDate')}
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              ) : (
                ''
              )}
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
      </Dialog>
      <StyledDialog
        fullScreen={fullScreen}
        open={isMasterModal}
        onClose={handleMasterClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogContentWrapper>
          <DialogTitle id='responsive-dialog-title'>Add New Master Revenue Source</DialogTitle>
          <DialogContent>
            <Grid container justify='space-between'>
              <Grid xs={12}>
                <TextField
                  id='outlined-textarea'
                  label='Master Revenue'
                  value={masterRevenue.masterName}
                  placeholder='Enter master revenue name'
                  multiline
                  variant='outlined'
                  name='masterName'
                  onChange={(e) => handleMasterChange(e)}
                  error={error.masterName ? true : false}
                  helperText={error.masterName ? error.masterName : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant='outlined'>
                  <InputLabel id='demo-simple-select-outlined-label'>Country</InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    value={masterRevenue.countryCode}
                    onChange={(e) => handleMasterChange(e)}
                    label='Country'
                    name='countryCode'
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
                  label='City'
                  value={masterRevenue.city}
                  placeholder='Enter city name'
                  multiline
                  variant='outlined'
                  name='city'
                  onChange={(e) => handleMasterChange(e)}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  id='outlined-textarea'
                  label='Company Number'
                  value={masterRevenue.companyNo}
                  placeholder='Enter Company number'
                  multiline
                  variant='outlined'
                  name='companyNo'
                  onChange={(e) => handleMasterChange(e)}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  id='outlined-textarea'
                  label='Address'
                  value={masterRevenue.addressOne}
                  placeholder='Enter address'
                  multiline
                  variant='outlined'
                  name='addressOne'
                  onChange={(e) => handleMasterChange(e)}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  id='outlined-textarea'
                  label='Sub address'
                  value={masterRevenue.addressTwo}
                  placeholder='Enter sub address'
                  multiline
                  variant='outlined'
                  name='addressTwo'
                  onChange={(e) => handleMasterChange(e)}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  id='outlined-textarea'
                  label='Post Code'
                  value={masterRevenue.postcode}
                  placeholder='Enter postcode'
                  multiline
                  variant='outlined'
                  name='postcode'
                  onChange={(e) => handleMasterChange(e)}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleMasterClose} color='primary' autoFocus>
              Cancel
            </Button>
            <Button onClick={handleMasterRevenueConfirm} color='primary' autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </DialogContentWrapper>
      </StyledDialog>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  dataSource: state.dataSource.data,
  revenueSourceList: state.revenueSourceList.data,
  addRevenueSource: state.addRevenueSource.data,
  bulkUpdateRevenueSource: state.bulkUpdateRevenueSource.data,
  customerData: state.customerList.data,
  revenueSourceMasterList: state.revenueSourceMasterList.data,
  addRevenueSourceMaster: state.addRevenueSourceMaster.data,
  answerOptionsReducer: state.answerOptionsReducer.data
});

export default connect(mapStateToProps)(RevenueSource);
