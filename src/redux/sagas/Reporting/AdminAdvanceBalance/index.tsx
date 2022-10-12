import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const {
    rowsPerPage = 20,
    groupValue = 'customer',
    revenueSource,
    dataSource,
    advanceStartDate,
    advanceEndDate,
    customer,
    orderBy
  } = action.payload;
  const AstartDate = advanceStartDate ? advanceStartDate : '';
  const AendDate = advanceEndDate ? advanceEndDate : '';
  return getApiCaller(
    `reporting/AdminAdvanceBalance/v2/${groupValue}?customer=${customer}&revenue_source=${revenueSource}&currency=${dataSource}&start_date=${AstartDate}&end_date=${AendDate}&ordering=${orderBy}&page_size=${rowsPerPage}`,
    'get',
    true
  ).then((response) => response);
};

const that = this;

export const ADMIN_ADVANCE_BALANCE_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('ADMIN_ADVANCE_BALANCE', function* (action) {
    yield put({ type: 'ADMIN_ADVANCE_BALANCE_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'ADMIN_ADVANCE_BALANCE_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'ADMIN_ADVANCE_BALANCE_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'ADMIN_ADVANCE_BALANCE_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
