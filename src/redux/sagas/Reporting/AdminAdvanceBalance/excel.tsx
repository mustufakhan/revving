import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const {
    page = 1,
    rowsPerPage = 10,
    groupValue = 'customer',
    revenueSource,
    dataSource,
    advanceStartDate,
    advanceEndDate,
    orderBy
  } = action.payload;
  const AstartDate = advanceStartDate ? advanceStartDate : '';
  const AendDate = advanceEndDate ? advanceEndDate : '';
  return getApiCaller(
    `reporting/AdminAdvanceBalance/v2/${groupValue}?revenue_source=${revenueSource}&currency=${dataSource}&start_date=${AstartDate}&end_date=${AendDate}&ordering=${orderBy}&page=${page}&page_size=${rowsPerPage}&get_csv=true`,
    'get',
    true
  ).then((response) => response);
};

const that = this;

export const EXPORT_ADVANCE_CSV_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('EXPORT_ADVANCE_CSV', function* (action) {
    yield put({ type: 'EXPORT_ADVANCE_CSV_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'EXPORT_ADVANCE_CSV_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'EXPORT_ADVANCE_CSV_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'EXPORT_ADVANCE_CSV_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
