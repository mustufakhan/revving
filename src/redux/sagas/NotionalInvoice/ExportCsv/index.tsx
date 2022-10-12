import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const {
    datasourceValue,
    revenueSource,
    customerValue,
    orderBy = 'created_at',
    startDate,
    endDate
  } = action.payload;
  const startDateValue = startDate ? startDate : '';
  const endDateValue = endDate ? endDate : '';
  return getApiCaller(
    `invoicing/NotionalInvoice/?master_revenue_source=${revenueSource}&customer=${customerValue}&data_source=${datasourceValue}&ordering=${orderBy}&start_advance_date=${startDateValue}&end_advance_date=${endDateValue}&get_csv=true`,
    'get',
    true
  ).then((response) => response);
};

const that = this;

export const EXPORT_CSV_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('EXPORT_CSV', function* (action) {
    yield put({ type: 'EXPORT_CSV_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));

      yield put({
        type: 'EXPORT_CSV_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'EXPORT_CSV_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'EXPORT_CSV_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
