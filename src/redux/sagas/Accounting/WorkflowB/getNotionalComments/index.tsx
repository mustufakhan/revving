import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../../getApiCaller';

const API_DATA = (action: any) => {
  const { monthly_invoice_id, currency } = action.payload;
  return getApiCaller(
    `invoicing/InvoiceMonthComments/${monthly_invoice_id}/${currency}`,
    'get',
    true
  ).then((response) => response);
};

const that = this;

export const GET_NOTIONAL_COMMENTS_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('GET_NOTIONAL_COMMENTS', function* (action) {
    yield put({ type: 'GET_NOTIONAL_COMMENTS_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'GET_NOTIONAL_COMMENTS_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'GET_NOTIONAL_COMMENTS_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'GET_NOTIONAL_COMMENTS_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
