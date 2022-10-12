import { put, takeEvery, call } from 'redux-saga/effects';
import postApiCaller from '../../../../postApiCaller';

const API_DATA = (action: any) => {
  const { id } = action.payload;
  return postApiCaller(`invoicing/RejectCodatInvoice/${id}`, 'post', null, true, true).then(
    (response) => response
  );
};

const that = this;

export const ACCOUNTING_REJECT_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('ACCOUNTING_REJECT', function* (action) {
    yield put({ type: 'ACCOUNTING_REJECT_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'ACCOUNTING_REJECT_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'ACCOUNTING_REJECT_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'ACCOUNTING_REJECT_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
