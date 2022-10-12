/* eslint-disable no-nested-ternary */
import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const {
    dataSource = '',
    customer = '',
    page = 1,
    rowsPerPage = 10,
    startDate = '',
    endDate = '',
    search = '',
    orderBy = '',
    revenueSource = '',
    repayment = ''
  } = action.payload;
  const startDateValue = startDate ? startDate : '';
  const endDateValue = endDate ? endDate : '';
  const repaymentval = repayment === 'recovery' ? true : repayment === 'normal' ? false : null;

  return getApiCaller(
    `reporting/AdminInvoiceLedger/?search=${search}&master_revenue_source=${revenueSource}&client=${customer}&status=${dataSource}&start_date=${startDateValue}&end_date=${endDateValue}&ordering=${orderBy}&page=${page}&page_size=${rowsPerPage}&is_recovery=${repaymentval}`,
    'get',
    true
  ).then((response) => response);
};

const that = this;

export const ADMIN_INVOICE_LEDGER_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('ADMIN_INVOICE_LEDGER', function* (action) {
    yield put({ type: 'ADMIN_INVOICE_LEDGER_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'ADMIN_INVOICE_LEDGER_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'ADMIN_INVOICE_LEDGER_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'ADMIN_INVOICE_LEDGER_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
