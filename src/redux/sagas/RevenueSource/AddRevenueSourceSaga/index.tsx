/* eslint-disable no-console */
import { put, takeEvery, call } from 'redux-saga/effects';
import postApiCaller from '../../../postApiCaller';

// interface IREVENUESOURCE {
//   type: string;
//   payload: {
//     dataSource: string;
//     name: string;
//     currency: string;
//     impressionValue: string;
//     included: boolean;
//   };
// }

const API_DATA = (action: any) => {
  const {
    revenueSource,
    name,
    currency,
    impressionValue,
    included,
    revenueCalculations,
    dailyAdvanceFee,
    haircut,
    paymentTerms,
    feeSetting,
    advanceFrequency,
    billingMonth,
    weekStartDay,
    weekStartDayTwo,
    biWeeklyStartDate,
    payoutTime,
    selectMasterValue,
    popcustomerValue,
    salesTax,
    closingDay
  } = action.payload;
  const body: any = {
    data_source: revenueSource === 'Factor Invoice' ? null : revenueSource,
    name,
    currency,
    customer: parseInt(popcustomerValue, 10),
    master: selectMasterValue,
    impression_value: Number(impressionValue),
    included: Boolean(included)
  };
  if (salesTax) {
    body.sales_tax = `${salesTax}`;
  }
  if (closingDay) {
    body.closing_days = closingDay;
  }
  if (revenueCalculations) {
    body.revenue_calculations = revenueCalculations;
  }
  if (dailyAdvanceFee) {
    body.daily_advance_fee = dailyAdvanceFee;
  }
  if (haircut) {
    body.haircut = haircut;
  }
  if (paymentTerms) {
    body.payment_terms = paymentTerms;
  }
  if (feeSetting) {
    body.fee_setting = feeSetting;
  }
  if (advanceFrequency) {
    body.advance_frequency = advanceFrequency;
  }
  if (billingMonth) {
    body.billing_month = billingMonth;
  }
  if (weekStartDay) {
    body.week_start_day = weekStartDay;
  }
  if (weekStartDayTwo) {
    body.week_start_day_two = weekStartDayTwo;
  }
  if (biWeeklyStartDate) {
    body.bi_weekly_start_date = biWeeklyStartDate;
  }
  if (payoutTime) {
    body.payout_time = payoutTime;
  }

  return postApiCaller('ingestion/RevenueSource/', 'post', body, true, false).then(
    (response) => response
  );
};

const that = this;

export const ADD_REVENUE_SOURCE_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('ADD_REVENUE_SOURCE', function* (action) {
    yield put({ type: 'ADD_REVENUE_SOURCE_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'ADD_REVENUE_SOURCE_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'ADD_REVENUE_SOURCE_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'ADD_REVENUE_SOURCE_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
