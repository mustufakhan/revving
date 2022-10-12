import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../../getApiCaller';

const API_DATA = (action: any) => {
  const {
    issue_date = '',
    revenue_source_uuid,
    customer_cuid,
    billing_month = '',
    billing_year = ''
  } = action.payload;
  return getApiCaller(
    `invoicing/CalculateBillingInvoice/?revenue_source_uuid=${revenue_source_uuid}&issue_date=${issue_date}&customer_cuid=${customer_cuid}&billing_month=${billing_month}&billing_year=${billing_year}`,
    'get',
    true
  ).then((response) => response);
};

const that = this;

export const CALCULATE_BILLING_INVOICE_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('CALCULATE_BILLING_INVOICE', function* (action) {
    yield put({ type: 'CALCULATE_BILLING_INVOICE_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      // eslint-disable-next-line no-console
      console.log('DATA', DATA);
      yield put({
        type: 'CALCULATE_BILLING_INVOICE_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'CALCULATE_BILLING_INVOICE_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'CALCULATE_BILLING_INVOICE_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
