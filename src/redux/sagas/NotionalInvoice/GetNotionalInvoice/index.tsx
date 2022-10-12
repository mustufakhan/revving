import { put, takeEvery, call } from 'redux-saga/effects';
import postApiCaller from '../../../postApiCaller';

const API_DATA = (action: any) => {
  const { notional_invoice_id, lms_status } = action.payload;
  const body = {
    lms_status
  };

  return postApiCaller(
    `invoicing/GetNotionalInvoice/${notional_invoice_id}`,
    'PATCH',
    body,
    true,
    false
  ).then((response) => response);
};

const that = this;

export const GET_NOTIONAL_TRANS_INVOICE_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('GET_NOTIONAL_TRANS_INVOICE', function* (action) {
    yield put({ type: 'GET_NOTIONAL_TRANS_INVOICE_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'GET_NOTIONAL_TRANS_INVOICE_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'GET_NOTIONAL_TRANS_INVOICE_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'GET_NOTIONAL_TRANS_INVOICE_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
