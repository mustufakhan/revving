/* eslint-disable no-console */
/* eslint-disable object-shorthand */
import { put, takeEvery, call } from 'redux-saga/effects';
import postApiCaller from '../../../postApiCaller';

const API_DATA = (action: any) => {
  const {
    customer = '',
    gbpPaymentReference = '',
    usdPaymentReference = '',
    eurPaymentReference = '',
    gbpCollection = '',
    usdCollection = '',
    eurCollection = '',
    gbpRepaymentReference = '',
    usdRepaymentReference = '',
    eurRepaymentReference = '',
    gbpSurplusDistribution = '',
    usdSurplusDistribution = '',
    eurSurplusDistribution = ''
  } = action.payload;

  const body = {
    customer: customer,
    GBP_advance_beneficiary_ref: gbpPaymentReference,
    GBP_collectionI_BAN_number: gbpCollection,
    GBP_repayment_beneficiary_ref: gbpRepaymentReference,
    GBP_surplus_beneficiary_ref: gbpSurplusDistribution,
    USD_advance_beneficiary_ref: usdPaymentReference,
    USD_collectionI_BAN_number: usdCollection,
    USD_repayment_beneficiary_ref: usdRepaymentReference,
    USD_surplus_beneficiary_ref: usdSurplusDistribution,
    EUR_advance_beneficiary_ref: eurPaymentReference,
    EUR_collectionI_BAN_number: eurCollection,
    EUR_repayment_beneficiary_ref: eurRepaymentReference,
    EUR_surplus_beneficiary_ref: eurSurplusDistribution
  };

  return postApiCaller('ingestion/KantoxAccounts/', 'post', body, true, false).then(
    (response) => response
  );
};

const that = this;

export const ADD_KANTOX_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('ADD_KANTOX', function* (action) {
    yield put({ type: 'ADD_KANTOX_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'ADD_KANTOX_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'ADD_KANTOX_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'ADD_KANTOX_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
