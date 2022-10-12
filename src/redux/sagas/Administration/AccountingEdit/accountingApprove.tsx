import { put, takeEvery, call } from 'redux-saga/effects';
import postApiCaller from '../../../postApiCaller';

const API_DATA = (action: any) => {
  const { id, current_state, revenue_source, status } = action.payload;
  const body = {
    current_state,
    revenue_source,
    status
  };

  return postApiCaller(
    `accounts/CustomerRevenueSourceRequestAction/${id}`,
    'PATCH',
    body,
    true,
    false
  ).then((response) => response);
};

const that = this;

export const ACCOUNTING_STATUS_EDIT_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('ACCOUNTING_STATUS_EDIT', function* (action) {
    yield put({ type: 'ACCOUNTING_STATUS_EDIT_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'ACCOUNTING_STATUS_EDIT_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'ACCOUNTING_STATUS_EDIT_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'ACCOUNTING_EDIT_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
