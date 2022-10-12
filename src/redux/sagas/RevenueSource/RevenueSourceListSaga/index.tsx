import { put, takeLatest, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const {
    dataSource = '',
    page = 1,
    rowsPerPage = 10,
    orderBy = '',
    customer = '',
    revenueSource = ''
  } = action.payload;
  return getApiCaller(
    `ingestion/RevenueSources/?data_source=${dataSource}&master=${revenueSource}&ordering=${orderBy}&page=${page}&page_size=${rowsPerPage}&customer=${customer}`,
    'get',
    true
  ).then((response) => response);
};

const that = this;

export const REVENUE_SOURCE_LIST_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeLatest('REVENUE_SOURCE_LIST', function* (action) {
    yield put({ type: 'REVENUE_SOURCE_LIST_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'REVENUE_SOURCE_LIST_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'REVENUE_SOURCE_LIST_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'REVENUE_SOURCE_LIST_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
