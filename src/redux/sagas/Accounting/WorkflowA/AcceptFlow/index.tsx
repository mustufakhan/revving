import { put, takeEvery, call } from 'redux-saga/effects';
import postApiCaller from '../../../../postApiCaller';

const API_DATA = (action: any) => {
  const { id } = action.payload;
  return postApiCaller(`invoicing/ApproveCodatInvoice/${id}`, 'post', null, true, true).then(
    (response) => response
  );
};

const that = this;

export const ACCOUNTING_ACCEPT_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('ACCOUNTING_ACCEPT', function* (action) {
    yield put({ type: 'ACCOUNTING_ACCEPT_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'ACCOUNTING_ACCEPT_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'ACCOUNTING_ACCEPT_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'ACCOUNTING_ACCEPT_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
