import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const {
    dataSource = '',
    page = 1,
    rowsPerPage = 10,
    customer = '',
    startDate = '',
    endDate = '',
    revenueSource = '',
    search = '',
    orderBy
  } = action.payload;
  const startDateValue = startDate ? startDate : '';
  const endDateValue = endDate ? endDate : '';

  return getApiCaller(
    `reporting/RevenueSourcePerformance/?search=${search}&client=${customer}&revenue_source_name=${revenueSource}&status=${dataSource}&start_date=${startDateValue}&end_date=${endDateValue}&ordering=${orderBy}&page=${page}&page_size=${rowsPerPage}`,
    'get',
    true
  ).then((response) => response);
};

const that = this;

export const ADVANCE_REPORT_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('ADVANCE_REPORT', function* (action) {
    yield put({ type: 'ADVANCE_REPORT_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'ADVANCE_REPORT_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'ADVANCE_REPORT_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'ADVANCE_REPORT_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
