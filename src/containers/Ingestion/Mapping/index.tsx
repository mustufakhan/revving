/* eslint-disable  @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { useSnackbar, VariantType } from 'notistack';
import Breadcumb from '../../../components/Breadcumb';
import IngestionMappingTable from './DataTable';
import validationRules from './AddMappingValidate';
import { validate } from '../../../utils/helper';
import Loader from '../../../components/Loader';
import {
  MainContentWrapper,
  ContentBoxWrapper,
  // StyledFormControl,
  DialogContentWrapper,
  StyledErrorWrapper,
  StyledGridButton,
  StyledDialog,
  StyledInput,
  StyledLabel
} from './Styled';

// Props Interface
interface IProps {
  dispatch: Function;
  dataSource: {
    data: any;
    status: string;
  };
  mappingList: {
    data: any;
    status: string;
  };
  addMappingResponse: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  columnList: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  getCsvColumnList: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
  uploadCsvColumn: {
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
}

// Error Interface
interface IError {
  csvColumn?: string;
  dbColumn?: string;
  dataSource?: number;
}

const IngestionMapping: React.FC<IProps> = ({
  dispatch,
  dataSource,
  columnList,
  customerData,
  mappingList,
  addMappingResponse,
  getCsvColumnList,
  uploadCsvColumn
}: IProps) => {
  const [datasourceValue, setDatasource] = useState('');
  const [error, setError] = useState<IError>({});
  const [open, setOpen] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [orderBy, setOrderBy] = useState<string>('created_at');
  const [mapping, setMapping] = useState({
    dataSource: '',
    csvColumn: '',
    dbColumn: ''
  });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const initialRender = useRef({ initial: true });
  const [isLoading, setIsLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const isUpdateAndDelete = useRef({ isActive: false });
  const eventClick = useRef({ value: '' });
  const [customerValue, setCustomer] = useState('');

  // Calling dataSource api for DS list
  useEffect(() => {
    dispatch({
      type: 'DATA_SOURCE',
      payload: {
        page: 1,
        rowsPerPage: 100,
        orderBy: 'source_name'
      }
    });
    dispatch({
      type: 'GET_DB_COLUMN'
    });
  }, [dispatch]);

  // Data updating and loader
  useEffect(() => {
    setIsLoading(false);
  }, [mappingList]);

  // Calling dataSource api for DS list
  useEffect(() => {
    const handleSnack = (variant: VariantType) => {
      enqueueSnackbar(
        addMappingResponse.message.data
          ? addMappingResponse.message.data
          : addMappingResponse.message,
        {
          variant
        }
      );
    };
    if (addMappingResponse?.status === 'success' && open && !initialRender.current.initial) {
      dispatch({
        type: 'MAPPING_LIST',
        payload: {
          dataSource: datasourceValue,
          page: page + 1,
          rowsPerPage,
          orderBy
        }
      });

      setOpen(false);
    }
    if (addMappingResponse?.status === 'failure' && isUpdateAndDelete.current.isActive) {
      handleSnack('error');
      isUpdateAndDelete.current.isActive = false;
    }
  }, [
    datasourceValue,
    dispatch,
    open,
    addMappingResponse,
    enqueueSnackbar,
    page,
    rowsPerPage,
    orderBy
  ]);

  // Handling Calling api response
  useEffect(() => {
    const handleSnack = (variant: VariantType) => {
      enqueueSnackbar(columnList.message.data ? columnList.message.data : columnList.message, {
        variant
      });
    };
    if (columnList?.status === 'failure' && isUpdateAndDelete.current.isActive) {
      handleSnack('error');
      isUpdateAndDelete.current.isActive = false;
    }
  }, [columnList, enqueueSnackbar]);

  // Handling  upload csv api response
  useEffect(() => {
    const handleSnack = (variant: VariantType) => {
      enqueueSnackbar(
        uploadCsvColumn.message.data ? uploadCsvColumn.message.data : uploadCsvColumn.message,
        {
          variant
        }
      );
    };
    const handleSucesss = (variant: VariantType) => {
      enqueueSnackbar('CSV uploaded Successfully', {
        variant
      });
    };
    if (uploadCsvColumn?.status === 'success' && eventClick.current.value === 'upload_csv') {
      handleSucesss('success');
      dispatch({
        type: 'GET_CSV_COLUMN',
        payload: {
          dataSource: datasourceValue
        }
      });
    }
    if (uploadCsvColumn?.status === 'failure' && eventClick.current.value === 'upload_csv') {
      handleSnack('error');
    }
    eventClick.current.value = '';
  }, [uploadCsvColumn, enqueueSnackbar, datasourceValue, dispatch]);

  // Calling Revenue list api
  useEffect(() => {
    // Calling api only if api return with success response
    if (dataSource?.status === 'success' && dataSource?.data?.results.length) {
      // Call initial api when initial page load and set DataSource
      if (initialRender.current.initial && !datasourceValue) {
        // setDatasource(dataSource.data.results[0].uuid);
        dispatch({
          type: 'MAPPING_LIST',
          payload: {
            dataSource: dataSource.data.results[0].uuid,
            page: page + 1,
            rowsPerPage,
            orderBy
          }
        });
        dispatch({
          type: 'GET_CSV_COLUMN',
          payload: {
            dataSource: dataSource.data.results[0].uuid
          }
        });
        setTimeout(() => {
          initialRender.current.initial = false;
        });
      } else {
        if (!initialRender.current.initial) {
          dispatch({
            type: 'MAPPING_LIST',
            payload: {
              dataSource: datasourceValue,
              page: page + 1,
              rowsPerPage,
              orderBy
            }
          });
        }
        dispatch({
          type: 'GET_CSV_COLUMN',
          payload: {
            dataSource: datasourceValue
          }
        });
      }
    } else {
      setIsLoading(false);
      setDatasource('');
    }
  }, [dataSource, datasourceValue, dispatch, orderBy, page, rowsPerPage]);

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
    setOpen(false);
    setMapping({ dataSource: '', csvColumn: '', dbColumn: '' });
    setError({});
  };

  // Handle Data Source
  const handleChangeDatasource = (event: ChangeEvent<{ value: unknown }>) => {
    setIsLoading(true);
    setDatasource(event.target.value as string);
  };

  // Validation of user fields
  const handleValidate = () => {
    let validRes = { errors: {}, isValid: false };
    validRes = validate(mapping, validationRules);
    setError(validRes.errors);
    return validRes.isValid;
  };

  // Handle On Change
  const handleChange = (e: any) => {
    setMapping((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  // Handle confirm button
  const handleConfirm = () => {
    if (handleValidate()) {
      isUpdateAndDelete.current.isActive = true;
      dispatch({
        type: 'ADD_MAPPING',
        payload: { ...mapping, dataSource: datasourceValue }
      });
    }
  };

  // Callback for update
  const updateList = () => {
    dispatch({
      type: 'MAPPING_LIST',
      payload: {
        dataSource: datasourceValue,
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
        type: 'MAPPING_LIST',
        payload: {
          dataSource: datasourceValue,
          page: value + 1,
          rowsPerPage,
          orderBy
        }
      });
      setPage(value);
    } else {
      dispatch({
        type: 'MAPPING_LIST',
        payload: {
          dataSource: datasourceValue,
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
      type: 'MAPPING_LIST',
      payload: {
        dataSource: datasourceValue,
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

  // Handle file upload handler
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    eventClick.current.value = 'upload_csv';
    dispatch({
      type: 'UPLOAD_CSV_COLUMN',
      payload: {
        files: event.target.files,
        id: datasourceValue
      }
    });
  };

  useEffect(() => {
    // Get customer list api call
    dispatch({
      type: 'GET_CUSTOMER_LIST',
      payload: {
        page: 1,
        rowsPerPage: 1000,
        orderBy: 'name'
      }
    });
  }, [dispatch]);

  // Handle Customer
  const handleChangeCustomer = (event: ChangeEvent<{ value: unknown }>) => {
    setIsLoading(true);
    setCustomer(event.target.value as string);
    eventClick.current.value = 'clicked';
    dispatch({
      type: 'DATA_SOURCE',
      payload: {
        page: 1,
        rowsPerPage: 100,
        orderBy: 'source_name',
        customer: event.target.value
      }
    });
  };

  return (
    <>
      <MainContentWrapper>
        <Breadcumb
          breadCrumb={{ page: 'Data Ingestion', data: ['Data Ingestion', 'File Data Mapping'] }}
        />
        <ContentBoxWrapper>
          <Grid container spacing={3} justify='space-between' alignItems='flex-start'>
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
                  value={dataSource?.data?.results.length ? datasourceValue : ''}
                  value={datasourceValue}
                  onChange={handleChangeDatasource}
                  label='Data Source'
                >
                  <MenuItem key='no-value-source' value=''>
                    All
                  </MenuItem>

                  {dataSource?.status === 'success' &&
                    dataSource?.data &&
                    dataSource?.data?.results.length &&
                    dataSource?.data?.results.map((data: any) => (
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
                style={{ width: 320 }}
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
                    customerData?.data &&
                    customerData?.data?.results.length &&
                    customerData?.data?.results.map((data: any) => (
                      <MenuItem key={data.cuid} value={data.cuid}>
                        {data.name}
                      </MenuItem>
                    ))}
                </Select>
              </StyledFormControl> */}
              {/* 
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
              /> */}
            </Grid>
            <StyledGridButton xs={12} sm={4} className='addColumn flex-end'>
              <StyledInput
                accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                id='contained-button-file'
                type='file'
                onChange={handleFileChange}
              />
              <StyledLabel htmlFor='contained-button-file'>CSV COLUMN UPLOAD</StyledLabel>
            </StyledGridButton>
          </Grid>
          <Grid container spacing={3} justify='flex-end' alignItems='center'>
            <StyledGridButton xs={12} sm={6} className='addColumn'>
              <Button variant='outlined' color='primary' onClick={handleClickOpen}>
                Add New Column Map
              </Button>
            </StyledGridButton>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              {isLoading && <Loader />}
              {!isLoading && (
                <IngestionMappingTable
                  datasourceValue={datasourceValue}
                  getCsvColumnList={getCsvColumnList}
                  mappingList={mappingList}
                  updateList={updateList}
                  columnList={columnList}
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
      <StyledDialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogContentWrapper>
          <DialogTitle id='responsive-dialog-title'>Add New Column Map</DialogTitle>
          <DialogContent>
            <Grid container justify='space-between'>
              <Grid xs={12}>
                <FormControl className='selectClass'>
                  <InputLabel id='demo-simple-select-error-label'>CSV Column</InputLabel>
                  <Select
                    labelId='demo-simple-select-error-label'
                    id='demo-simple-select-error'
                    value={mapping.csvColumn}
                    onChange={handleChange}
                    name='csvColumn'
                  >
                    {!getCsvColumnList?.data?.columns.length ? (
                      <MenuItem key='no-column-csv' value=''>
                        NO CSV COLUMN
                      </MenuItem>
                    ) : (
                      ''
                    )}
                    {getCsvColumnList?.status === 'success' &&
                      getCsvColumnList?.data &&
                      getCsvColumnList?.data?.columns.length &&
                      getCsvColumnList.data?.columns.map((data: any) => (
                        <MenuItem key={data} value={data}>
                          {data}
                        </MenuItem>
                      ))}
                  </Select>
                  <StyledErrorWrapper>{error.csvColumn ? error.csvColumn : ''}</StyledErrorWrapper>
                </FormControl>
              </Grid>
              <Grid xs={12}>
                <FormControl className='selectClass'>
                  <InputLabel id='demo-simple-select-error-label'>Database Column</InputLabel>
                  <Select
                    labelId='demo-simple-select-error-label'
                    id='demo-simple-select-error'
                    value={mapping.dbColumn}
                    onChange={handleChange}
                    name='dbColumn'
                  >
                    {columnList?.status === 'success' &&
                      columnList.data.length &&
                      columnList.data.map((data: any) => (
                        <MenuItem key={data} value={data}>
                          {data}
                        </MenuItem>
                      ))}
                  </Select>
                  <StyledErrorWrapper>{error.dbColumn ? error.dbColumn : ''}</StyledErrorWrapper>
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
      </StyledDialog>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  dataSource: state.dataSource.data,
  mappingList: state.getMappingList.data,
  addMappingResponse: state.addMapping.data,
  columnList: state.getDBColumnList.data,
  getCsvColumnList: state.getCsvColumnList.data,
  uploadCsvColumn: state.uploadCsvColumn.data,
  customerData: state.customerList.data
});

export default connect(mapStateToProps)(IngestionMapping);
