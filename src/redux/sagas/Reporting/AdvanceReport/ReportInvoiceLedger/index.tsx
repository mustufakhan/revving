import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../../getApiCaller';

const API_DATA = (action: any) => {
  const { currency, monthlyId, revenueSource, customer } = action.payload;
  return getApiCaller(
    `reporting/InvoiceLedger/?invoice__monthly_invoice__monthly_invoice_id=${monthlyId}&invoice__revenue_source__master__name=${revenueSource}&invoice__currency=${currency}&customer=${customer}`,
    'get',
    true
  ).then((response) => response);
};

const that = this;

export const REPORT_INVOICE_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('REPORT_INVOICE_LEDGER', function* (action) {
    yield put({ type: 'REPORT_INVOICE_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'REPORT_INVOICE_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'REPORT_INVOICE_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'REPORT_INVOICE_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
