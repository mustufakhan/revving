import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const { page = 1, rowsPerPage = 10, customer = '', approve = '', request = '' } = action.payload;
  return getApiCaller(
    `accounts/AllCustomerRevenueSource/?ordering=request&customer=${customer}&current_state=${approve}&request=${request}&page=${page}&page_size=${rowsPerPage}`,
    'get',
    true
  ).then((response) => response);
};

const that = this;

export const ACCOUNTING_EDIT_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('ACCOUNTING_EDIT', function* (action) {
    yield put({ type: 'ACCOUNTING_EDIT_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'ACCOUNTING_EDIT_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'ACCOUNTING_EDIT_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'ACCOUNTING_EDIT_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
