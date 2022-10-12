import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../../getApiCaller';

const API_DATA = (action: any) => {
  const { currency, monthlyId, revenueSourceId, customer } = action.payload;
  return getApiCaller(
    `reporting/RevenueSourcePerformanceCollection/${monthlyId}/${revenueSourceId}/${currency}/?customer=${customer}`,
    'get',
    true
  ).then((response) => response);
};

const that = this;

export const REPORT_REVENUE_COLLECTION_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('REPORT_REVENUE_COLLECTION', function* (action) {
    yield put({ type: 'REPORT_REVENUE_COLLECTION_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'REPORT_REVENUE_COLLECTION_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'REPORT_REVENUE_COLLECTION_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'REPORT_REVENUE_COLLECTION_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
