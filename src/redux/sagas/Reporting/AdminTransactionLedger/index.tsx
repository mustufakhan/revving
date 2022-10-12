/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const searching = window.localStorage.getItem('search');
  const {
    dataSource = '',
    page = 1,
    rowsPerPage = 100,
    startDate = '',
    endDate = '',
    week = '',
    transactionValue = '',
    search = searching ? searching : '',
    revenueSource = '',
    customerValue = '',
    orderBy = '-event_date',
    repayment = ''
  } = action.payload;
  const startDateValue = startDate ? startDate : '';
  const endDateValue = endDate ? endDate : '';
  const transctValue = transactionValue ? transactionValue : '';
  const repaymentval = repayment === 'recovery' ? true : repayment === 'normal' ? false : null;
  return getApiCaller(
    `reporting/AdminTransactionLedger/?search=${search}&week=${week}&currency=${dataSource}&revenue_source_name=${revenueSource}&customer=${customerValue}&transaction_type=${transctValue}&start_date=${startDateValue}&end_date=${endDateValue}&ordering=${orderBy}&page=${page}&page_size=${rowsPerPage}&is_recovery=${repaymentval}`,
    'get',
    true
  ).then((response) => response);
};

const that = this;

export const ADMIN_TRANSACTION_LEDGER_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('ADMIN_TRANSACTION_LEDGER', function* (action) {
    yield put({ type: 'ADMIN_TRANSACTION_LEDGER_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'ADMIN_TRANSACTION_LEDGER_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'ADMIN_TRANSACTION_LEDGER_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'ADMIN_TRANSACTION_LEDGER_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
