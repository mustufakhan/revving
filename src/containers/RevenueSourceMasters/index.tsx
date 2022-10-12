/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
// import moment from 'moment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
// import DateFnsUtils from '@date-io/date-fns';
// // import { useSnackbar } from 'notistack';
import locale from 'date-fns/locale/en-US';
// import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Loader from '../../components/Loader';
import Breadcumb from '../../components/Breadcumb';
import DataTable from './DataTable';
import { MainContentWrapper, ContentBoxWrapper, StyledFormControl } from './Styled';

// Props Interface
interface IProps {
  dispatch: Function;
  revMasterDetails: {
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

const RevenueSourceMasters: React.FC<IProps> = ({
  dispatch,
  revMasterDetails,
  revenueSourceMasterList
}: IProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [orderBy, setOrderBy] = useState('');
  const initialRender = useRef({ initial: true });
  const [isLoading, setIsLoading] = useState(false);
  const [currencyValue, setCurrencyValue] = useState('');
  const [onBoardStatus, setonBoardStatus] = useState('');
  const [revenueSource, setRevenueSource] = useState('');
  const currency = ['USD', 'EUR', 'GBP'];

  // Handle filter

  const handleChangeCurrency = (event: ChangeEvent<{ value: unknown }>) => {
    setIsLoading(true);
    setCurrencyValue(event.target.value as string);
  };

  const handleOnBoardStatus = (event: ChangeEvent<{ value: unknown }>) => {
    setIsLoading(true);
    setonBoardStatus(event.target.value as string);
  };

  const handleRevenueSource = (event: ChangeEvent<{ value: unknown }>) => {
    setIsLoading(true);
    setRevenueSource(event.target.value as string);
  };

  useEffect(() => {
    revenueSourceMasterList?.data?.unshift({ name: 'All' });
  }, [revenueSourceMasterList?.data]);

  if (locale && locale.options) {
    locale.options.weekStartsOn = 1;
  }

  useEffect(() => {
    if (revMasterDetails?.status == 'success') {
      setIsLoading(false);
    }
  }, [revMasterDetails]);

  // Calling api for Data list
  useEffect(() => {
    dispatch({
      type: 'REVENUE_SOURCE_MASTER_LIST',
      payload: {}
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: 'REV_MASTER_DETAILS',
      payload: {
        page: 1,
        rowsPerPage: 10,
        currency: currencyValue,
        onboard_status: onBoardStatus,
        masterRevenue: revenueSource,
        orderBy
      }
    });
  }, [dispatch, currencyValue, revenueSource, onBoardStatus, orderBy]);

  // Callback for update
  const updateList = () => {
    dispatch({
      type: 'REV_MASTER_DETAILS',
      payload: {
        page: page + 1,
        rowsPerPage,
        orderBy,
        currency: currencyValue,
        onboard_status: onBoardStatus,
        masterRevenue: revenueSource
      }
    });
  };

  // Handle page and rowsperPage
  const handlePaginationAndUpdateList = (type: string, value: number) => {
    initialRender.current.initial = true;
    if (type === 'page') {
      dispatch({
        type: 'REV_MASTER_DETAILS',
        payload: {
          page: value + 1,
          rowsPerPage,
          orderBy,
          currency: currencyValue,
          onboard_status: onBoardStatus,
          masterRevenue: revenueSource
        }
      });
      setPage(value);
    } else {
      dispatch({
        type: 'REV_MASTER_DETAILS',
        payload: {
          page: 1,
          rowsPerPage: value,
          orderBy,
          currency: currencyValue,
          onboard_status: onBoardStatus,
          masterRevenue: revenueSource
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
      type: 'REV_MASTER_DETAILS',
      payload: {
        page: page + 1,
        rowsPerPage,
        currency: currencyValue,
        onboard_status: onBoardStatus,
        masterRevenue: revenueSource,
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
      type: 'REV_MASTER_DETAILS',
      payload: {
        page: page + 1,
        rowsPerPage,
        orderBy,
        currency: currencyValue,
        onboard_status: onBoardStatus,
        masterRevenue: revenueSource
      }
    });
  };

  return (
    <>
      <MainContentWrapper>
        <Breadcumb
          breadCrumb={{
            page: 'Revenue Sources',
            data: ['Revenue Sources', 'Revenue Source Masters']
          }}
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
                    setRevenueSource(option.name);
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
              <StyledFormControl variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>Onboard Status</InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  value={onBoardStatus}
                  onChange={handleOnBoardStatus}
                  label='Transaction'
                >
                  <MenuItem key='no-value-ds' value='under_review'>
                    Under Review
                  </MenuItem>
                  <MenuItem key='no-value-ds' value='passed'>
                    Passed
                  </MenuItem>
                  <MenuItem key='no-value-ds' value='failed'>
                    Failed
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
            <Grid item xs={12} sm={12}>
              {isLoading ? (
                <Loader />
              ) : (
                <DataTable
                  revMasterDetails={revMasterDetails}
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
  revMasterDetails: state.revMasterDetails.data,
  revenueSourceMasterList: state.revenueSourceMasterList.data
});

export default connect(mapStateToProps)(RevenueSourceMasters);
