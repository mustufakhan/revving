import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const {
    dataSource = '',
    revenueSource = '',
    customer = '',
    orderBy = '-end_date',
    page = 1,
    rowsPerPage = 100,
    startDate,
    endDate,
    statusType = '',
    search = ''
  } = action.payload;
  const startDateValue = startDate ? startDate : '';
  const endDateValue = endDate ? endDate : '';
  return getApiCaller(
    `invoicing/NotionalInvoice/?type=Report&source=mail/api&master_revenue_source=${revenueSource}&search=${search}&invoice_status=${statusType}&customer=${customer}&data_source=${dataSource}&ordering=${orderBy}&page=${page}&page_size=${rowsPerPage}&start_advance_date=${startDateValue}&end_advance_date=${endDateValue}`,
    'get',
    true
  ).then((response) => response);
};

const that = this;

export const TRANS_NOTIONAL_INVOICE_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('TRANS_NOTIONAL_INVOICE', function* (action) {
    yield put({ type: 'TRANS_NOTIONAL_INVOICE_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'TRANS_NOTIONAL_INVOICE_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'TRANS_NOTIONAL_INVOICE_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'TRANS_NOTIONAL_INVOICE_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
