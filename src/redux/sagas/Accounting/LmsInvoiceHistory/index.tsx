import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const {
    dataSource = '',
    revenueSource = '',
    search = '',
    customer = '',
    orderBy = 'created_at',
    page = 1,
    rowsPerPage = 10,
    startDate,
    // endDate,
    lmsInvoiceType = ''
  } = action.payload;
  const startDateValue = startDate ? startDate : '';
  // const endDateValue = endDate ? endDate : '';
  return getApiCaller(
    `invoicing/InvoiceHistory/?lms_date_start=${startDateValue}&search=${search}&data_source=${dataSource}&master_revenue_source=${revenueSource}&invoice_type=${lmsInvoiceType}&customer=${customer}&ordering=-${orderBy}&page=${page}&page_size=${rowsPerPage}`,
    // `invoicing/NotionalInvoice/?sent_to_lms=True&source=${lmsInvoiceType}&master_revenue_source=${revenueSource}&customer=${customer}&data_source=${dataSource}&ordering=${orderBy}&page=${page}&page_size=${rowsPerPage}&start_lms_date=${startDateValue}&end_lms_date=${endDateValue}`,
    'get',
    true
  ).then((response) => response);
};

const that = this;

export const LMS_INVOICE_HISTORY_SAGA = function* fetchUsers() {
  yield takeEvery('LMS_INVOICE_HISTORY', function* (action) {
    yield put({ type: 'LMS_INVOICE_HISTORY_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'LMS_INVOICE_HISTORY_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'LMS_INVOICE_HISTORY_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'LMS_INVOICE_HISTORY_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
