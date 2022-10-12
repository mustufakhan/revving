import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import { useSnackbar, VariantType } from 'notistack';
import locale from 'date-fns/locale/en-US';
import Loader from '../../../components/Loader';
import Breadcumb from '../../../components/Breadcumb';
import DataTable from './DataTable';
import { MainContentWrapper, ContentBoxWrapper } from './Styled';

// Props Interface
interface IProps {
  dispatch: Function;
  revenueSourceAcc: {
    data: any;
    status: string;
    message: {
      data?: string;
    };
  };
}

const UserList: React.FC<IProps> = ({ dispatch, revenueSourceAcc }: IProps) => {
  // const [customerValue, setCustomer] = useState('');
  // const [approve, setApprove] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [orderBy, setOrderBy] = useState<string>('created_at');
  const initialRender = useRef({ initial: true });
  const [isLoading, setIsLoading] = useState(false);
  const eventClick = useRef({ value: '' });
  const { enqueueSnackbar } = useSnackbar();

  if (locale && locale.options) {
    locale.options.weekStartsOn = 1;
  }

  // revenueSourceAcc updating and loader
  useEffect(() => {
    setIsLoading(false);
  }, [revenueSourceAcc]);

  // Calling api for Data list
  useEffect(() => {
    dispatch({
      type: 'REVENUE_ACCOUNT_LIST',
      payload: {
        page: 1,
        rowsPerPage: 10
      }
    });

    // Get customer list api call
    dispatch({
      type: 'REVENUE_SOURCE_MASTER_LIST',
      payload: {}
    });
  }, [dispatch]);

  // const handleChangeCustomer = (event: ChangeEvent<{ value: unknown }>) => {
  //   setCustomer(event.target.value as string);
  // };

  // Handle Revenue Source
  // const handleApprove = (event: ChangeEvent<{ value: unknown }>) => {
  //   setApprove(event.target.value as string);
  // };

  // Callback for update
  const updateList = () => {
    dispatch({
      type: 'REVENUE_ACCOUNT_LIST',
      payload: {
        page: page + 1,
        rowsPerPage
        // orderBy,
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
        type: 'REVENUE_ACCOUNT_LIST',
        payload: {
          page: value + 1,
          rowsPerPage
          // orderBy,
          // customer: customerValue,
          // approve
        }
      });
      setPage(value);
    } else {
      dispatch({
        type: 'REVENUE_ACCOUNT_LIST',
        payload: {
          page: 1,
          rowsPerPage: value
          // orderBy,
          // customer: customerValue,
          // approve
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
      type: 'REVENUE_ACCOUNT_LIST',
      payload: {
        page: page + 1,
        rowsPerPage
        // customer: customerValue,
        // orderBy: !isAsyn ? property : `-${property}`,
        // approve
      }
    });
    // setOrderBy(property);
    setTimeout(() => {
      initialRender.current.initial = false;
    }, 500);
  };

  // Export csv api response
  useEffect(() => {
    const handleSnack = (variant: VariantType) => {
      enqueueSnackbar(
        revenueSourceAcc.message.data ? revenueSourceAcc.message.data : revenueSourceAcc.message,
        {
          variant
        }
      );
    };

    if (revenueSourceAcc?.status === 'success' && eventClick.current.value === 'export_csv') {
      window.location.href = revenueSourceAcc?.data?.file_path;
    }
    if (revenueSourceAcc?.status === 'failure' && eventClick.current.value === 'export_csv') {
      handleSnack('error');
    }
    eventClick.current.value = '';
  }, [revenueSourceAcc, enqueueSnackbar, dispatch]);

  const handleAPI = () => {
    dispatch({
      type: 'REVENUE_ACCOUNT_LIST',
      payload: {
        page: page + 1,
        rowsPerPage
      }
    });
    dispatch({
      type: 'REVENUE_ACCOUNT_UPDATE_CLEAR'
    });
  };

  return (
    <>
      <MainContentWrapper>
        <Breadcumb
          breadCrumb={{
            page: 'Revenue sources',
            data: ['Revenue sources', 'Codat Name Mapping']
          }}
        />
        <ContentBoxWrapper>
          {/* <Grid container spacing={3}>
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
          </Grid> */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              {isLoading ? (
                <Loader />
              ) : (
                <DataTable
                  revenueSourceAcc={revenueSourceAcc}
                  updateList={updateList}
                  handleSortData={handleSortData}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  handlePaginationAndUpdateList={handlePaginationAndUpdateList}
                  mainAPI={handleAPI}
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
  revenueSourceAcc: state.revenueSourceAcc.data
});

export default connect(mapStateToProps)(UserList);
