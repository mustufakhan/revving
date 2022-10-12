import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const { page = 1, rowsPerPage = 10 } = action.payload;
  return getApiCaller(
    `ingestion/RevenueSourceAccList/?ordering=id&page=${page}&page_size=${rowsPerPage}`,
    'get',
    true
  ).then((response) => response);
};

const that = this;

export const REVENUE_ACCOUNT_LIST_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('REVENUE_ACCOUNT_LIST', function* (action) {
    yield put({ type: 'REVENUE_ACCOUNT_LIST_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'REVENUE_ACCOUNT_LIST_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'REVENUE_ACCOUNT_LIST_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'REVENUE_ACCOUNT_LIST_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
