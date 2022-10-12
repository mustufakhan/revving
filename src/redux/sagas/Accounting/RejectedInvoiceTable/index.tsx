import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const {
    page = 1,
    search = '',
    rowsPerPage = '',
    statusType = '',
    customerValue = '',
    revenueSource = '',
    issuedStartDate,
    issuedEndDate,
    repaymentStartDate,
    repaymentEndDate,
    orderBy = ''
  } = action.payload;
  const iStartDate = issuedStartDate ? issuedStartDate : '';
  const iEndDate = issuedEndDate ? issuedEndDate : '';
  const isBillingStartDate = repaymentStartDate ? repaymentStartDate : '';
  const isbillingEndDate = repaymentEndDate ? repaymentEndDate : '';

  return getApiCaller(
    `invoicing/RejectedUnassignedReportInvoices/?search=${search}&page=${page}&page_size=${rowsPerPage}&invoice_status=${statusType}&customer=${customerValue}&revenue_source=${revenueSource}&issue_start_date=${iStartDate}&issue_end_date=${iEndDate}&billing_start_date=${isBillingStartDate}&billing_end_date=${isbillingEndDate}&ordering=${orderBy}`,
    'get',
    true
  ).then((response) => response);
};
const that = this;

export const REJECTED_INVOICE_TABLE_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('REJECTED_INVOICE_TABLE', function* (action) {
    yield put({ type: 'REJECTED_INVOICE_TABLE_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'REJECTED_INVOICE_TABLE_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'REJECTED_INVOICE_TABLE_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'REJECTED_INVOICE_TABLE_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
