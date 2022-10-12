import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../../getApiCaller';

const API_DATA = (action: any) => {
  const { currency, revenueSource, customer, monthlyId } = action.payload;
  return getApiCaller(
    `reporting/AdminTransactionLedger/?currency=${currency}&revenue_source_name=${revenueSource}&customer=${customer}&invoicing_month=${monthlyId}&transaction_type=depreciation`,
    'get',
    true
  ).then((response) => response);
};

const that = this;

export const REPORT_ADMIN_TRANSECTION_LEDGER_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('REPORT_ADMIN_TRANSECTION_LEDGER', function* (action) {
    yield put({ type: 'REPORT_ADMIN_TRANSECTION_LEDGER_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'REPORT_ADMIN_TRANSECTION_LEDGER_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'REPORT_ADMIN_TRANSECTION_LEDGER_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'REPORT_ADMIN_TRANSECTION_LEDGER_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
