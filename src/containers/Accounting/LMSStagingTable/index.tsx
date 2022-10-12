/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import locale from 'date-fns/locale/en-US';
import Loader from '../../../components/Loader';
import Breadcumb from '../../../components/Breadcumb';
import DataTable from './DataTable';
import { MainContentWrapper, ContentBoxWrapper } from './Styled';

// Props Interface
interface IProps {
  dispatch: Function;
  lmsStaging: {
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
  kantoxAvailableCustomer: {
    data: any;
    status: string;
  };
  kantoxAvailableRevenueSource: {
    data: any;
    status: string;
  };

  revenueSourceMasterList: {
    data: any;
    status: string;
  };
}

const LmsStaging: React.FC<IProps> = ({
  dispatch,
  lmsStaging,
  customerData,
  kantoxAvailableCustomer,
  kantoxAvailableRevenueSource,
  revenueSourceMasterList
}: IProps) => {
  const [customerValue, setCustomer] = useState('');
  const [revenueSource, setRevenueSource] = useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(1000);
  const [orderBy, setOrderBy] = useState('');

  const initialRender = useRef({ initial: true });
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeCustomer = (event: React.ChangeEvent<{ value: unknown }>) => {
    setIsLoading(true);
    setCustomer(event.target.value as string);
  };

  const handleRevenueSource = (event: React.ChangeEvent<{ value: unknown }>) => {
    setIsLoading(true);
    setRevenueSource(event.target.value as string);
  };

  if (locale && locale.options) {
    locale.options.weekStartsOn = 1;
  }

  // revenueSourceAcc updating and loader
  // useEffect(() => {
  //   console.log('check main api 1');
  //   setIsLoading(false);
  // }, [invoiceSummary]);

  useEffect(() => {
    kantoxAvailableCustomer?.data?.results?.unshift({ name: 'All' });
  }, [kantoxAvailableCustomer?.data?.results]);

  console.log(kantoxAvailableRevenueSource, 'kantoxAvailableRevenueSource');

  useEffect(() => {
    kantoxAvailableRevenueSource?.data?.results?.unshift({ name: 'All' });
  }, [kantoxAvailableRevenueSource?.data?.results]);

  useEffect(() => {
    dispatch({
      type: 'KANTOX_AVAILABLE_REVENUE_SOURCE',
      payload: {
        page: 1,
        rowsPerPage: 100,
        orderBy: 'created_at'
      }
    });

    // Get customer list api call
    dispatch({
      type: 'KANTOX_AVAILABLE_CUSTOMER',
      payload: {
        page: 1,
        rowsPerPage: 100,
        orderBy: 'created_at'
      }
    });
  }, [dispatch]);

  // Calling api for Data list
  useEffect(() => {
    dispatch({
      type: 'LMS_STAGING',
      payload: {
        page: 1,
        rowsPerPage: 1000,
        customerValue,
        revenueSource,
        orderBy
      }
    });
  }, [dispatch, customerValue, revenueSource, orderBy]);

  // Callback for update
  const updateList = () => {
    dispatch({
      type: 'LMS_STAGING',
      payload: {
        page: page + 1,
        rowsPerPage,
        customerValue,
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
        type: 'LMS_STAGING',
        payload: {
          page: value + 1,
          rowsPerPage,
          customerValue,
          revenueSource,
          orderBy
        }
      });
      setPage(value);
    } else {
      dispatch({
        type: 'LMS_STAGING',
        payload: {
          page: 1,
          rowsPerPage: value,
          customerValue,
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

  // Handle sorting
  const handleSortData = (property: string, isAsyn: any) => {
    initialRender.current.initial = true;
    dispatch({
      type: 'LMS_STAGING',
      payload: {
        page: page + 1,
        rowsPerPage,
        customerValue,
        revenueSource,
        orderBy: !isAsyn ? property : `-${property}`
      }
    });
    setOrderBy(property);
    setTimeout(() => {
      initialRender.current.initial = false;
    }, 500);
  };

  const handleAPI = () => {
    dispatch({
      type: 'LMS_STAGING',
      payload: {
        page: page + 1,
        rowsPerPage,
        customerValue,
        revenueSource,
        orderBy
      }
    });
  };

  return (
    <>
      <MainContentWrapper>
        <Breadcumb
          breadCrumb={{
            page: 'Send to LMS',
            data: ['Send to LMS', 'LMS Staging']
          }}
        />
        <ContentBoxWrapper>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                className='auto_drop'
                id='auto-dropdown-customer'
                options={
                  (kantoxAvailableCustomer?.status === 'success' &&
                    kantoxAvailableCustomer?.data &&
                    kantoxAvailableCustomer?.data?.results?.length &&
                    kantoxAvailableCustomer?.data?.results) ||
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
            </Grid>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                className='auto_drop'
                id='master-dropdown-datasource'
                options={
                  (kantoxAvailableRevenueSource?.status === 'success' &&
                    kantoxAvailableRevenueSource?.data &&
                    kantoxAvailableRevenueSource?.data?.results?.length &&
                    kantoxAvailableRevenueSource?.data?.results) ||
                  []
                }
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
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              {isLoading ? (
                <Loader />
              ) : (
                <DataTable
                  lmsStaging={lmsStaging}
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
  lmsStaging: state.lmsStaging.data,
  customerData: state.customerList.data,
  revenueSourceMasterList: state.revenueSourceMasterList.data,
  kantoxAvailableCustomer: state.kantoxAvailableCustomer.data,
  kantoxAvailableRevenueSource: state.kantoxAvailableRevenueSource.data
});

export default connect(mapStateToProps)(LmsStaging);
