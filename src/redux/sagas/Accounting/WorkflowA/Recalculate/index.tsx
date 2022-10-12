import { put, takeEvery, call } from 'redux-saga/effects';
import postApiCaller from '../../../../postApiCaller';

const API_DATA = (action: any) => {
  const { id, date, value } = action.payload;
  const adjusted_expected_repayment_date = `${date}T00:00:00.00Z`;
  const adjusted_amount_due = value;
  const body = {
    adjusted_expected_repayment_date,
    adjusted_amount_due
  };
  return postApiCaller(
    `invoicing/RecalculateAccountingDetails/${id}`,
    'PATCH',
    body,
    true,
    false
  ).then((response) => response);
};

const that = this;

export const ACCOUNTING_RECALCULATE_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('ACCOUNTING_RECALCULATE', function* (action) {
    yield put({ type: 'ACCOUNTING_RECALCULATE_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'ACCOUNTING_RECALCULATE_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'ACCOUNTING_RECALCULATE_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'ACCOUNTING_RECALCULATE_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
