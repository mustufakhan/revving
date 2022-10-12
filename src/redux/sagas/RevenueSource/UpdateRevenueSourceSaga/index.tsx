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
    data_source,
    name,
    currency,
    impression_value,
    included,
    uuid,
    revenue_calculations,
    daily_advance_fee,
    haircut,
    payment_terms,
    fee_setting,
    advance_frequency,
    billing_month,
    week_start_day,
    week_start_day_two,
    bi_weekly_start_date,
    payout_time,
    master,
    sales_tax,
    customer,
    closing_days
  } = action.payload;
  const body = {
    data_source,
    name,
    currency,
    impression_value,
    included,
    revenue_calculations,
    daily_advance_fee,
    haircut,
    payment_terms,
    fee_setting,
    advance_frequency,
    billing_month,
    week_start_day,
    week_start_day_two,
    bi_weekly_start_date,
    payout_time,
    master,
    sales_tax,
    customer,
    closing_days
  };
  // eslint-disable-next-line no-console
  console.log('testing', customer);
  return postApiCaller(`ingestion/RevenueSource/${uuid}`, 'put', body, true, false).then(
    (response) => response
  );
};

const that = this;

export const UPDATE_REVENUE_SOURCE_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('UPDATE_REVENUE_SOURCE', function* (action) {
    yield put({ type: 'UPDATE_REVENUE_SOURCE_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'UPDATE_REVENUE_SOURCE_SUCCESS',
        payload: { status: 'success', data: DATA, message: 'success' }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'UPDATE_REVENUE_SOURCE_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'UPDATE_REVENUE_SOURCE_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
