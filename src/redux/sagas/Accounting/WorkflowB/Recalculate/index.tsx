import { put, takeEvery, call } from 'redux-saga/effects';
import postApiCaller from '../../../../postApiCaller';

const API_DATA = (action: any) => {
  const { id, month, value, year } = action.payload;
  const edited_billing_month = month;
  const edited_billing_year = year;
  const adjusted_gross_value = value;
  const body = {
    edited_billing_month,
    edited_billing_year,
    adjusted_gross_value
  };
  return postApiCaller(
    `invoicing/RecalculateBillingInvoice/${id}`,
    'PATCH',
    body,
    true,
    false
  ).then((response) => response);
};

const that = this;

export const BILLING_RECALCULATE_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('BILLING_RECALCULATE', function* (action) {
    yield put({ type: 'BILLING_RECALCULATE_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'BILLING_RECALCULATE_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'BILLING_RECALCULATE_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'BILLING_RECALCULATE_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
