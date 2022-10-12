import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const searching = window.localStorage.getItem('search');
  const {
    dataSource = '',
    customer = '',
    page = 1,
    rowsPerPage = 10,
    startDate = '',
    endDate = '',
    search = searching ? searching : '',
    orderBy = '',
    revenueSource = ''
  } = action.payload;
  const startDateValue = startDate ? startDate : '';
  const endDateValue = endDate ? endDate : '';

  return getApiCaller(
    `reporting/AdminInvoiceLedger/?search=${search}&master_revenue_source=${revenueSource}&client=${customer}&status=${dataSource}&start_date=${startDateValue}&end_date=${endDateValue}&ordering=${orderBy}&page=${page}&page_size=${rowsPerPage}&get_csv=true`,
    'get',
    true
  ).then((response) => response);
};

const that = this;

export const EXPORT_INVOICE_CSV_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('EXPORT_INVOICE_CSV', function* (action) {
    yield put({ type: 'EXPORT_INVOICE_CSV_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'EXPORT_INVOICE_CSV_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'EXPORT_INVOICE_CSV_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'EXPORT_INVOICE_CSV_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
