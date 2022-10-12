import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const {
    page = 1,
    search = '',
    rowsPerPage = 10,
    revenueSource = '',
    billingStartDate = '',
    billingEndDate = '',
    paymentStatus = '',
    assignmentStatus = '',
    haircutStatus = '',
    customer = '',
    orderBy
  } = action.payload;
  const BstartDate = billingStartDate ? billingStartDate : '';
  const BendDate = billingEndDate ? billingEndDate : '';
  return getApiCaller(
    `invoicing/NotionalInvoiceSet/?assigment_status=${assignmentStatus}&search=${search}&payment_status=${paymentStatus}&haircut_status=${haircutStatus}&customer=${customer}&start_billind_date=${BstartDate}&end_billind_date=${BendDate}&revenue_source=${revenueSource}&ordering=${orderBy}&page=${page}&page_size=${rowsPerPage}`,
    'get',
    true
  ).then((response) => response);
};

const that = this;

export const NATIONAL_INVOICE_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('NATIONAL_INVOICE', function* (action) {
    yield put({ type: 'NATIONAL_INVOICE_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'NATIONAL_INVOICE_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'NATIONAL_INVOICE_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'NATIONAL_INVOICE_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
