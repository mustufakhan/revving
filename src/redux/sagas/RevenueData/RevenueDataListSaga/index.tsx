import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const {
    dataSource,
    revenueSource,
    customer = '',
    page = 1,
    rowsPerPage = 10,
    startDate,
    endDate,
    orderBy = '-end_date'
  } = action.payload;
  const startDateValue = startDate ? startDate : '';
  const endDateValue = endDate ? endDate : '';

  return getApiCaller(
    `ingestion/RevenueDataList/?ordering=${orderBy}&start_date=${startDateValue}&end_date=${endDateValue}&datasource=${dataSource}&master_revenue_source=${revenueSource}&customer=${customer}&page=${page}&page_size=${rowsPerPage}`,
    'get',
    true
  ).then((response) => response);
};

const that = this;

export const GET_REVENUE_DATA_LIST_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('GET_REVENUE_DATA_LIST', function* (action) {
    yield put({ type: 'GET_REVENUE_DATA_LIST_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'GET_REVENUE_DATA_LIST_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'GET_REVENUE_DATA_LIST_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'GET_REVENUE_DATA_LIST_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
