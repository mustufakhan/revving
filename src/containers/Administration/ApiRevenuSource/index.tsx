import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import { useSnackbar, VariantType } from 'notistack';
import locale from 'date-fns/locale/en-US';
import Loader from '../../../components/Loader';
import Breadcumb from '../../../components/Breadcumb';
import DataTable from './DataTable';
import { MainContentWrapper, ContentBoxWrapper, StyledFormControl } from './Styled';

// Props Interface
interface IProps {
  dispatch: Function;
  customerData: {
    data: any;
    status: string;
  };
  userList: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
}

const UserList: React.FC<IProps> = ({ dispatch, customerData, userList }: IProps) => {
  const [customerValue, setCustomer] = useState('');
  const [approve, setApprove] = useState('');
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

  // userList updating and loader
  useEffect(() => {
    setIsLoading(false);
  }, [userList]);

  // Calling api for Data list
  useEffect(() => {
    dispatch({
      type: 'USER_LIST',
      payload: {
        page: 1,
        rowsPerPage: 10
      }
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

  const handleChangeCustomer = (event: ChangeEvent<{ value: unknown }>) => {
    setCustomer(event.target.value as string);
  };

  // Handle Revenue Source
  const handleApprove = (event: ChangeEvent<{ value: unknown }>) => {
    setApprove(event.target.value as string);
  };

  // Callback for update
  const updateList = () => {
    dispatch({
      type: 'GET_NOTIONAL_INVOICE',
      payload: {
        page: page + 1,
        rowsPerPage,
        orderBy,
        customer: customerValue,
        approve
      }
    });
  };

  // Handle page and rowsperPage
  const handlePaginationAndUpdateList = (type: string, value: number) => {
    initialRender.current.initial = true;
    if (type === 'page') {
      dispatch({
        type: 'GET_NOTIONAL_INVOICE',
        payload: {
          page: value + 1,
          rowsPerPage,
          orderBy,
          customer: customerValue,
          approve
        }
      });
      setPage(value);
    } else {
      dispatch({
        type: 'GET_NOTIONAL_INVOICE',
        payload: {
          page: 1,
          rowsPerPage: value,
          orderBy,
          customer: customerValue,
          approve
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
      type: 'GET_NOTIONAL_INVOICE',
      payload: {
        page: page + 1,
        rowsPerPage,
        customer: customerValue,
        orderBy: !isAsyn ? property : `-${property}`,
        approve
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
      enqueueSnackbar(userList.message.data ? userList.message.data : userList.message, {
        variant
      });
    };

    if (userList?.status === 'success' && eventClick.current.value === 'export_csv') {
      window.location.href = userList?.data?.file_path;
    }
    if (userList?.status === 'failure' && eventClick.current.value === 'export_csv') {
      handleSnack('error');
    }
    eventClick.current.value = '';
  }, [userList, enqueueSnackbar, dispatch]);

  return (
    <>
      <MainContentWrapper>
        <Breadcumb breadCrumb={{ page: 'Administration', data: ['Administration', 'User-List'] }} />
        <ContentBoxWrapper>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Aprrove</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={approve}
                  onChange={handleApprove}
                  label='Approve'
                >
                  <MenuItem key='no-value-customer' value='approve'>
                    yes
                  </MenuItem>
                  <MenuItem key='no-value-customer' value='disApprove'>
                    no
                  </MenuItem>
                </Select>
              </StyledFormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <StyledFormControl variant='outlined'>
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
              </StyledFormControl>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              {isLoading ? (
                <Loader />
              ) : (
                <DataTable
                  userList={userList}
                  updateList={updateList}
                  handleSortData={handleSortData}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  customerData={customerData}
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
  customerData: state.customerList.data,
  userList: state.userList.data
});

export default connect(mapStateToProps)(UserList);
