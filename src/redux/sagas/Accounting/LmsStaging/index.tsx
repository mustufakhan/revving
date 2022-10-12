import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const {
    page = 1,
    search = '',
    rowsPerPage = 1000,
    invoiceType = '',
    statusType = '',
    customerValue = '',
    revenueSource = '',
    orderBy = ''
  } = action.payload;

  return getApiCaller(
    `reporting/StagingInvoices/?search=${search}&type=${invoiceType}&invoice_status=${statusType}&customer=${customerValue}&revenue_source=${revenueSource}&page=${page}&page_size=${rowsPerPage}&ordering=${orderBy}`,
    'get',
    true
  ).then((response) => response);
};
const that = this;

export const LMS_STAGING_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('LMS_STAGING', function* (action) {
    yield put({ type: 'LMS_STAGING_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'LMS_STAGING_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'LMS_STAGING_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'LMS_STAGING_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
