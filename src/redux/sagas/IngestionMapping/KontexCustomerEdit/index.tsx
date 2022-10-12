import { put, takeEvery, call } from 'redux-saga/effects';
import postApiCaller from '../../../postApiCaller';

const API_DATA = (action: any) => {
  const {
    id,
    customer,
    editGbpPaymentReference = '',
    editUsdPaymentReference = '',
    editEurPaymentReference = '',
    editGbpCollection = '',
    editUsdCollection = '',
    editEurCollection = '',
    editGbpRepaymentReference = '',
    editUsdRepaymentReference = '',
    editEurRepaymentReference = '',
    editGbpSurplusDistribution = '',
    editUsdSurplusDistribution = '',
    editEurSurplusDistribution = ''
  } = action.payload;
  const body = {
    customer,
    GBP_advance_beneficiary_ref: editGbpPaymentReference,
    GBP_collectionI_BAN_number: editGbpCollection,
    GBP_repayment_beneficiary_ref: editGbpRepaymentReference,
    GBP_surplus_beneficiary_ref: editGbpSurplusDistribution,
    USD_advance_beneficiary_ref: editUsdPaymentReference,
    USD_collectionI_BAN_number: editUsdCollection,
    USD_repayment_beneficiary_ref: editUsdRepaymentReference,
    USD_surplus_beneficiary_ref: editUsdSurplusDistribution,
    EUR_advance_beneficiary_ref: editEurPaymentReference,
    EUR_collectionI_BAN_number: editEurCollection,
    EUR_repayment_beneficiary_ref: editEurRepaymentReference,
    EUR_surplus_beneficiary_ref: editEurSurplusDistribution
  };
  return postApiCaller(`ingestion/KantoxAccount/${id}`, 'PATCH', body, true, false).then(
    (response) => response
  );
};

const that = this;

export const EDIT_KONTEX_ACCOUNT_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('EDIT_KONTEX_ACCOUNT', function* (action) {
    // eslint-disable-next-line no-console
    console.log('action', action);
    yield put({ type: 'EDIT_KONTEX_ACCOUNT_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'EDIT_KONTEX_ACCOUNT_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'EDIT_KONTEX_ACCOUNT_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'EDIT_KONTEX_ACCOUNT_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
