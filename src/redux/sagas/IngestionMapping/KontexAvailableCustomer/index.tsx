import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const { page = 1, rowsPerPage = 100, orderBy = 'created_at' } = action.payload;
  return getApiCaller(
    `reporting/StagingInvoices/available/customers/?ordering=${orderBy}&page=${page}&page_size=${rowsPerPage}`,
    'get',
    true
  ).then((response) => response);
};

const that = this;

export const KANTOX_AVAILABLE_CUSTOMER_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('KANTOX_AVAILABLE_CUSTOMER', function* (action) {
    yield put({ type: 'KANTOX_AVAILABLE_CUSTOMER_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'KANTOX_AVAILABLE_CUSTOMER_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'KANTOX_AVAILABLE_CUSTOMER_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'KANTOX_AVAILABLE_CUSTOMER_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
