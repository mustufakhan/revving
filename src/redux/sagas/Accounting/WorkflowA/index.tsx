import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const {
    page = 1,
    rowsPerPage = 10,
    revenueSource = '',
    actions = '',
    billingStartDate,
    issuedStartDate,
    billingEndDate,
    issuedEndDate,
    invoiceType = '',
    customer = '',
    search = '',
    orderBy = ''
  } = action.payload;
  const BstartDate = billingStartDate ? billingStartDate : '';
  const BendDate = billingEndDate ? billingEndDate : '';
  const IstartDate = issuedStartDate ? issuedStartDate : '';
  const IendDate = issuedEndDate ? issuedEndDate : '';
  return getApiCaller(
    `invoicing/FactorInvoices/?search=${search}&type=${invoiceType}&issue_start_date=${IstartDate}&issue_end_date=${IendDate}&billing_start_date=${BstartDate}&billing_end_date=${BendDate}&customer=${customer}&revenue_source=${revenueSource}&invoice_status=${actions}&ordering=${orderBy}&page=${page}&page_size=${rowsPerPage}`,
    'get',
    true
  ).then((response) => response);
};

const that = this;

export const ACCOUNTING_DETAILS_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('ACCOUNTING_DETAILS', function* (action) {
    yield put({ type: 'ACCOUNTING_DETAILS_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'ACCOUNTING_DETAILS_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'ACCOUNTING_DETAILS_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'ACCOUNTING_DETAILS_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
