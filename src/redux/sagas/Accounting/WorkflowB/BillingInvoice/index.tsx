import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../../getApiCaller';

const API_DATA = (action: any) => {
  const { currency, monthlyId } = action.payload;
  return getApiCaller(`invoicing/BillingInvoice/${monthlyId}/${currency}`, 'get', true).then(
    (response) => response
  );
};

const that = this;

export const BILLING_INVOICE_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('BILLING_INVOICE', function* (action) {
    yield put({ type: 'BILLING_INVOICE_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'BILLING_INVOICE_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'BILLING_INVOICE_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'BILLING_INVOICE_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
