/* eslint-disable no-debugger, no-console, no-nested-ternary, @typescript-eslint/indent, react/jsx-closing-tag-location */
import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useSnackbar, VariantType } from 'notistack';
import locale from 'date-fns/locale/en-US';
import Loader from '../../../components/Loader';
import Breadcumb from '../../../components/Breadcumb';
// eslint-disable-next-line import/no-named-as-default-member
import DataTable from './DataTable';
import { MainContentWrapper, ContentBoxWrapper, StyledFormControl } from './Styled';

// Props Interface
interface IProps {
  dispatch: Function;
  customerData: {
    data: any;
    status: string;
  };
  // revenueSourceList: {
  //   data: any;
  //   status: string;
  // };
  revenueSourceConnectFalse: {
    data: any;
    status: string;
  };
  accountEdit: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
}

const UserList: React.FC<IProps> = ({
  dispatch,
  customerData,
  // revenueSourceList,
  revenueSourceConnectFalse,
  accountEdit
}: IProps) => {
  const [customerValue, setCustomer] = useState('');
  const [approve, setApprove] = useState('');
  const [request, setRequest] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [orderBy, setOrderBy] = useState<string>('created_at');
  const initialRender = useRef({ initial: true });
  const [isLoading, setIsLoading] = useState(false);
  const eventClick = useRef({ value: '' });
  const { enqueueSnackbar } = useSnackbar();

  if (locale && locale.options) {
    locale.options.weekStartsOn = 1;
  }

  // const requestArr = {
  //   activate_advances: 'Activate',
  //   pause_advances: 'Pause',
  //   delete: 'Remove'

  // }

  // accountEdit updating and loader
  useEffect(() => {
    setIsLoading(false);
  }, [accountEdit]);

  useEffect(() => {
    // Get customer list api call
    dispatch({
      type: 'REVENUE_SOURCE_CONNECT_FALSE',
      payload: {
        page: 1,
        rowsPerPage: 100
      }
    });
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
    dispatch({
      type: 'ACCOUNTING_EDIT',
      payload: {
        page: 1,
        rowsPerPage: 10,
        orderBy,
        customer: customerValue,
        approve,
        request
      }
    });
  }, [dispatch, orderBy, customerValue, approve, request]);

  const handleChangeCustomer = (event: ChangeEvent<{ value: unknown }>) => {
    setCustomer(event.target.value as string);
  };

  const handleApprove = (event: ChangeEvent<{ value: unknown }>) => {
    setApprove(event.target.value as string);
  };

  const handleRequest = (event: ChangeEvent<{ value: unknown }>) => {
    setRequest(event.target.value as string);
  };

  // Handle page and rowsperPage
  const handlePaginationAndUpdateList = (type: string, value: number) => {
    initialRender.current.initial = true;
    if (type === 'page') {
      dispatch({
        type: 'ACCOUNTING_EDIT',
        payload: {
          page: value + 1,
          rowsPerPage,
          orderBy,
          customer: customerValue,
          approve,
          request
        }
      });
      setPage(value);
    } else {
      dispatch({
        type: 'ACCOUNTING_EDIT',
        payload: {
          page: 1,
          rowsPerPage: value,
          orderBy,
          customer: customerValue,
          approve,
          request
        }
      });
      setPage(0);
      setRowsPerPage(value);
    }
    setTimeout(() => {
      initialRender.current.initial = false;
    }, 500);
  };

  const handleAPI = () => {
    dispatch({
      type: 'ACCOUNTING_EDIT',
      payload: {
        page: page + 1,
        rowsPerPage,
        customer: customerValue,
        approve,
        request
      }
    });
    dispatch({
      type: 'ACCOUNTING_EDIT_CLEAR'
    });
  };

  // Handle sorting
  const handleSortData = (property: string, isAsyn: any) => {
    initialRender.current.initial = true;
    dispatch({
      type: 'ACCOUNTING_EDIT',
      payload: {
        page: page + 1,
        rowsPerPage,
        customer: customerValue,
        orderBy: !isAsyn ? property : `-${property}`,
        approve,
        request
      }
    });
    setOrderBy(property);
    setTimeout(() => {
      initialRender.current.initial = false;
    }, 500);
  };

  // Export csv api response
  useEffect(() => {
    const handleSnack = (variant: VariantType) => {
      enqueueSnackbar(accountEdit.message.data ? accountEdit.message.data : accountEdit.message, {
        variant
      });
    };

    if (accountEdit?.status === 'success' && eventClick.current.value === 'export_csv') {
      window.location.href = accountEdit?.data?.file_path;
    }
    if (accountEdit?.status === 'failure' && eventClick.current.value === 'export_csv') {
      handleSnack('error');
    }
    eventClick.current.value = '';
  }, [accountEdit, enqueueSnackbar, dispatch]);

  return (
    <>
      <MainContentWrapper>
        <Breadcumb
          breadCrumb={{
            page: 'Customers',
            data: ['Customers', 'Revenue Source Status']
          }}
        />
        <ContentBoxWrapper>
          <Grid container spacing={3}>
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
                  value={approve}
                  onChange={handleApprove}
                  label='Status'
                >
                  <MenuItem key='no-value-customer' value=''>
                    All
                  </MenuItem>
                  <MenuItem key='no-value-customer' value='activate_advances'>
                    Active
                  </MenuItem>
                  <MenuItem key='no-value-customer' value='pause_advances'>
                    Paused
                  </MenuItem>
                  <MenuItem key='no-value-customer' value='delete'>
                    Removed
                  </MenuItem>
                  <MenuItem key='no-value-customer' value='pending'>
                    Pending
                  </MenuItem>
                </Select>
              </StyledFormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Request</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={request}
                  onChange={handleRequest}
                  label='Request'
                >
                  <MenuItem key='no-value-customer' value=''>
                    All
                  </MenuItem>
                  <MenuItem key='no-value-customer' value='activate_advances'>
                    Activate
                  </MenuItem>
                  <MenuItem key='no-value-customer' value='pause_advances'>
                    Pause
                  </MenuItem>
                  <MenuItem key='no-value-customer' value='delete'>
                    Remove
                  </MenuItem>
                </Select>
              </StyledFormControl>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              {isLoading ? (
                <Loader />
              ) : (
                <DataTable
                  accountEdit={accountEdit}
                  handleSortData={handleSortData}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  customerData={customerData}
                  revenueSourceConnectFalse={revenueSourceConnectFalse}
                  handlePaginationAndUpdateList={handlePaginationAndUpdateList}
                  mainAPI={handleAPI}
                  customerValue={customerValue}
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
  customerData: state.customerList.data,
  accountEdit: state.accountEdit.data,
  // revenueSourceList: state.revenueSourceList.data,
  revenueSourceConnectFalse: state.revenueSourceConnectFalse.data
});

export default connect(mapStateToProps)(UserList);
