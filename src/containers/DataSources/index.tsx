/* eslint-disable no-console */
import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { useSnackbar, VariantType } from 'notistack';
import Breadcumb from '../../components/Breadcumb';
import DataSourceTable from './DataSourceTable';
import validationRules from './AddDataSourceValidate';
import { validate } from '../../utils/helper';
import Loader from '../../components/Loader';
import {
  MainContentWrapper,
  ContentBoxWrapper,
  DialogContentWrapper,
  StyledFormControl
} from './Styled';

// Props Interface
interface IProps {
  dispatch: Function;
  dataSourceList: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  addDataSource: {
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
  apiDataSource: {
    data: any;
    status: string;
  };
}

// Error Interface
interface IError {
  sourceName?: string;
  fromEmail?: string;
  customer?: string;
  apisource?: string;
  subject?: string;
  skipRows?: number;
  skipFooters?: number;
}

const DataSourceSection: React.FC<IProps> = ({
  dispatch,
  dataSourceList,
  addDataSource,
  customerData,
  apiDataSource
}: IProps) => {
  // const [datasourceValue, setDatasource] = useState('');
  const [error, setError] = useState<IError>({});
  const [open, setOpen] = useState(false);
  const [customerValue, setCustomer] = useState('');
  console.log('customerValue', customerValue);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [orderBy, setOrderBy] = useState<string>('created_at');
  const [isLoading, setIsLoading] = useState(true);
  const [dsource, setDataResource] = useState({
    sourceName: '',
    fromEmail: '',
    apisource: '',
    customer: '',
    subject: '',
    skipRows: 0,
    skipFooters: 0,
    hasMultipleResource: false
  });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const initialRender = useRef({ initial: true });
  const { enqueueSnackbar } = useSnackbar();
  const isUpdateAndDelete = useRef({ isActive: false });
  const eventClick = useRef({ value: 'clicked' });

  useEffect(() => {
    dispatch({
      type: 'DATA_SOURCE',
      payload: {
        page: 1,
        rowsPerPage: 10,
        orderBy: 'source_name',
        customer: ''
      }
    });

    // Get customer list api call
    dispatch({
      type: 'GET_CUSTOMER_LIST',
      payload: {
        page: 1,
        rowsPerPage: 1000,
        orderBy: 'created_at'
      }
    });

    dispatch({
      type: 'API_SOURCE_DATA',
      payload: {
        page: 1,
        rowsPerPage: 1000,
        orderBy: ''
      }
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: 'DATA_SOURCE',
      payload: {
        page: 1,
        rowsPerPage: 10,
        orderBy: 'source_name',
        customer: customerValue
      }
    });
  }, [customerValue, dispatch]);

  // Calling dataSource api for DS list
  useEffect(() => {
    const handleSnack = (variant: VariantType) => {
      enqueueSnackbar(
        addDataSource.message.data ? addDataSource.message.data : addDataSource.message,
        {
          variant
        }
      );
    };
    if (addDataSource?.status === 'success' && open && !initialRender.current.initial) {
      dispatch({
        type: 'DATA_SOURCE',
        payload: {
          page: page + 1,
          rowsPerPage,
          orderBy,
          customer: customerValue
        }
      });
      setOpen(false);
      setDataResource({
        sourceName: '',
        fromEmail: '',
        apisource: '',
        customer: '',
        subject: '',
        skipRows: 0,
        skipFooters: 0,
        hasMultipleResource: false
      });
      setIsLoading(false);
    }
    if (addDataSource?.status === 'failure' && isUpdateAndDelete.current.isActive) {
      handleSnack('error');
      isUpdateAndDelete.current.isActive = false;
      setIsLoading(false);
    }
  }, [dispatch, open, addDataSource, enqueueSnackbar, page, rowsPerPage, orderBy, customerValue]);

  // Calling data source api for DS list response
  useEffect(() => {
    const handleSnack = (variant: VariantType) => {
      enqueueSnackbar(
        dataSourceList.message.data ? dataSourceList.message.data : dataSourceList.message,
        {
          variant
        }
      );
    };
    if (dataSourceList?.status === 'success' && eventClick.current.value === 'clicked') {
      eventClick.current.value = '';
      setIsLoading(false);
    }
    if (dataSourceList?.status === 'failure' && eventClick.current.value === 'clicked') {
      eventClick.current.value = '';
      handleSnack('error');
      isUpdateAndDelete.current.isActive = false;
      setIsLoading(false);
    }
  }, [dispatch, dataSourceList, enqueueSnackbar]);

  // Handle Open Modal
  const handleClickOpen = () => {
    initialRender.current.initial = true;
    setOpen(true);
    setTimeout(() => {
      initialRender.current.initial = false;
    }, 500);
  };

  // Handle Customer
  const handleChangeCustomer = (event: ChangeEvent<{ value: unknown }>) => {
    setIsLoading(true);
    setCustomer(event.target.value as string);
    eventClick.current.value = 'clicked';
    dispatch({
      type: 'DATA_SOURCE',
      payload: {
        page: page + 1,
        rowsPerPage,
        orderBy,
        customer: event.target.value
      }
    });
  };

  // Handle Close Modal
  const handleClose = () => {
    setOpen(false);
    setDataResource({
      sourceName: '',
      fromEmail: '',
      apisource: '',
      customer: '',
      subject: '',
      skipRows: 0,
      skipFooters: 0,
      hasMultipleResource: false
    });
    setError({});
  };

  // Validation of user fields
  const handleValidate = () => {
    let validRes = { errors: {}, isValid: false };
    validRes = validate(dsource, validationRules);
    setError(validRes.errors);
    return validRes.isValid;
  };

  // Handle On Change
  const handleChange = (e: any) => {
    setDataResource((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  // Handle confirm button
  const handleConfirm = () => {
    if (handleValidate()) {
      setIsLoading(true);
      isUpdateAndDelete.current.isActive = true;
      dispatch({
        type: 'ADD_DATA_SOURCE',
        payload: dsource
      });
    }
  };

  // Callback for update
  const updateList = () => {
    setIsLoading(true);
    eventClick.current.value = 'clicked';
    dispatch({
      type: 'DATA_SOURCE',
      payload: {
        page: page + 1,
        rowsPerPage,
        orderBy,
        customer: customerValue
      }
    });
  };

  // Handle page and rowsperPage
  const handlePaginationAndUpdateList = (type: string, value: number) => {
    if (type === 'page') {
      dispatch({
        type: 'DATA_SOURCE',
        payload: {
          page: value + 1,
          rowsPerPage,
          orderBy,
          customer: customerValue
        }
      });
      setPage(value);
    } else {
      dispatch({
        type: 'DATA_SOURCE',
        payload: {
          page: 1,
          rowsPerPage: value,
          orderBy,
          customer: customerValue
        }
      });
      setPage(0);
      setRowsPerPage(value);
    }
  };

  // Handle sorting
  const handleSortData = (property: string, isAsyn: any) => {
    setOrderBy(property);
  };

  return (
    <>
      <MainContentWrapper>
        <Breadcumb
          breadCrumb={{ page: 'Data Ingestion', data: ['Data Ingestion', 'Data Source Setup'] }}
        />
        <ContentBoxWrapper>
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
              getOptionSelected={(option: any, value: any) => {
                if (option.cuid === value.cuid) {
                  setCustomer(option.cuid);
                }
                return option.cuid === value.cuid;
              }}
              renderInput={(params: any) => (
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
          <Grid container spacing={3} justify='space-between' alignItems='center'>
            <Grid item xs={12} sm={4} />
            <Grid xs={12} sm={2} justify='flex-end' className='addColumn'>
              <Button variant='outlined' color='primary' onClick={handleClickOpen}>
                Add Data Source
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              {isLoading && <Loader />}
              {!isLoading && (
                <DataSourceTable
                  customerData={customerData}
                  dataSourceList={dataSourceList}
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
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogContentWrapper>
          <DialogTitle id='responsive-dialog-title'>Add New Data Source</DialogTitle>
          <DialogContent>
            <Grid container justify='space-between'>
              <Grid xs={12}>
                <TextField
                  id='outlined-textarea'
                  label='Source Name'
                  value={dsource.sourceName}
                  placeholder='Enter source name'
                  multiline
                  variant='outlined'
                  name='sourceName'
                  onChange={(e) => handleChange(e)}
                  error={error.sourceName ? true : false}
                  helperText={error.sourceName ? error.sourceName : ''}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  id='outlined-textarea'
                  label='From Email'
                  value={dsource.fromEmail}
                  placeholder='Enter from email'
                  multiline
                  variant='outlined'
                  name='fromEmail'
                  onChange={(e) => handleChange(e)}
                  error={error.fromEmail ? true : false}
                  helperText={error.fromEmail ? error.fromEmail : ''}
                />
              </Grid>
              <Grid xs={12}>
                <StyledFormControl variant='outlined'>
                  <InputLabel id='demo-simple-select-outlined-label'>Customer</InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    value={dsource.customer}
                    onChange={(e) => handleChange(e)}
                    label='Customer'
                    name='customer'
                  >
                    <MenuItem key='no-value-customer' value=''>
                      All
                    </MenuItem>
                    {customerData?.status === 'success' &&
                      customerData?.data &&
                      customerData.data?.results.length &&
                      customerData.data?.results.map((data: any) => (
                        <MenuItem key={data.cuid} value={data.cuid}>
                          {data.name}
                        </MenuItem>
                      ))}
                  </Select>
                </StyledFormControl>
              </Grid>
              <Grid xs={12}>
                <StyledFormControl variant='outlined'>
                  <InputLabel id='demo-simple-select-outlined-label'>API Source</InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    value={dsource.apisource}
                    onChange={(e) => handleChange(e)}
                    label='apisource'
                    name='apisource'
                  >
                    <MenuItem key='no-value-customer' value=''>
                      All
                    </MenuItem>

                    {apiDataSource?.status === 'success' &&
                      apiDataSource?.data &&
                      apiDataSource.data?.results.length &&
                      apiDataSource.data?.results.map((data: any) => (
                        <MenuItem key={data.cuid} value={data.name}>
                          {data.name}
                        </MenuItem>
                      ))}
                  </Select>
                </StyledFormControl>
              </Grid>
              <Grid xs={12}>
                <TextField
                  id='outlined-textarea'
                  label='Data Source Subject'
                  value={dsource.subject}
                  placeholder='Enter Subject of Data source'
                  multiline
                  variant='outlined'
                  name='subject'
                  onChange={(e) => handleChange(e)}
                  error={error.subject ? true : false}
                  helperText={error.subject ? error.subject : ''}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  id='outlined-textarea'
                  label='Skip Rows'
                  value={dsource.skipRows}
                  placeholder='Enter skip numeric value'
                  multiline
                  variant='outlined'
                  name='skipRows'
                  onChange={(e) => handleChange(e)}
                  error={error.skipRows ? true : false}
                  helperText={error.skipRows ? error.skipRows : ''}
                />
              </Grid>
              <Grid xs={12}>
                <TextField
                  id='outlined-textarea'
                  label='Skip Footer'
                  value={dsource.skipFooters}
                  placeholder='Enter skip numeric value'
                  multiline
                  variant='outlined'
                  name='skipFooters'
                  onChange={(e) => handleChange(e)}
                  error={error.skipFooters ? true : false}
                  helperText={error.skipFooters ? error.skipFooters : ''}
                />
              </Grid>
              <Grid xs={12}>
                <FormControl className='selectClass'>
                  <InputLabel id='demo-simple-select-label'>
                    Has Multiple Revenue Resources
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={dsource.hasMultipleResource}
                    name='hasMultipleResource'
                    onChange={handleChange}
                  >
                    <MenuItem value='true'>Yes</MenuItem>
                    <MenuItem value='false'>No</MenuItem>
                  </Select>
                </FormControl>
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
      </Dialog>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  dataSourceList: state.dataSource.data,
  addDataSource: state.addDataSource.data,
  customerData: state.customerList.data,
  apiDataSource: state.apiDataSource.data
});

export default connect(mapStateToProps)(DataSourceSection);
