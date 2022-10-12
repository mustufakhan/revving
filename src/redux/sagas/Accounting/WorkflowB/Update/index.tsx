import { put, takeEvery, call } from 'redux-saga/effects';
import postApiCaller from '../../../../postApiCaller';

const API_DATA = (action: any) => {
  const { action_status, id, currency } = action.payload;
  const body = {
    action_status,
    currency
  };
  return postApiCaller(`reporting/CodatInvoicesRUDapi/${id}`, 'PATCH', body, true, false).then(
    (response) => response
  );
};

const that = this;

export const UPDATE_BILLING_INVOICE_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('UPDATE_BILLING_INVOICE', function* (action) {
    // eslint-disable-next-line no-console
    console.log('action', action);
    yield put({ type: 'UPDATE_BILLING_INVOICE_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'UPDATE_BILLING_INVOICE_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'UPDATE_BILLING_INVOICE_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'UPDATE_BILLING_INVOICE_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
