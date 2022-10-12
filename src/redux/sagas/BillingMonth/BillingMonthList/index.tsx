import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const {
    billingMonth,
    frequency,
    weekdays,
    payoutTimes,
    startDate,
    endDate,
    weekdayTwo,
    biWeeklyStartDate,
    closingTime
  } = action.payload;
  return getApiCaller(
    `invoicing/BillingMonth/?start_trans_date=${startDate}&end_trans_date=${endDate}&billing_month=${billingMonth}&payout_time_in_days=${payoutTimes}&closing_time=${closingTime}&frequency=${frequency}&weekday=${weekdays}&weekday_two=${weekdayTwo}&bi_weekly_start_date=${
      biWeeklyStartDate ? biWeeklyStartDate : ''
    }`,
    'get',
    true
  ).then((response) => response);
};

const that = this;

export const GET_BILLING_MONTHS_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('GET_BILLING_MONTHS', function* (action) {
    yield put({ type: 'GET_BILLING_MONTHS_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'GET_BILLING_MONTHS_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'GET_BILLING_MONTHS_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'GET_BILLING_MONTHS_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
