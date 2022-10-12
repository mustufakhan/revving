import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const {
    page = 1,
    search = '',
    rowsPerPage = '',
    invoiceType = '',
    statusType = '',
    customerValue = '',
    revenueSource = '',
    repaymentStartDate,
    issuedStartDate,
    issuedEndDate,
    repaymentEndDate,
    orderBy = ''
  } = action.payload;
  const rStartDate = repaymentStartDate ? repaymentStartDate : '';
  const iStartDate = issuedStartDate ? issuedStartDate : '';
  const iEndDate = issuedEndDate ? issuedEndDate : '';
  const rEndDate = repaymentEndDate ? repaymentEndDate : '';
  return getApiCaller(
    `reporting/InvoiceSummery/?search=${search}&type=${invoiceType}&invoice_status=${statusType}&customer=${customerValue}&revenue_source=${revenueSource}&page=${page}&page_size=${rowsPerPage}&repayment_start_date=${rStartDate}&repayment__end_date=${rEndDate}&issue_start_date=${iStartDate}&issue_end_date=${iEndDate}&ordering=${orderBy}`,
    'get',
    true
  ).then((response) => response);
};
const that = this;

export const INVOICE_SUMMARY_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('INVOICE_SUMMARY', function* (action) {
    yield put({ type: 'INVOICE_SUMMARY_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'INVOICE_SUMMARY_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'INVOICE_SUMMARY_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'INVOICE_SUMMARY_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
