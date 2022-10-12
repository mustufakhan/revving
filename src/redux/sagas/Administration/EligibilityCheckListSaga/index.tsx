import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) =>
  getApiCaller('accounts/EligibilityChecks/', 'get', true).then((response) => response);

const that = this;

export const CHECK_LIST_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('CHECK_LIST', function* (action) {
    yield put({ type: 'CHECK_LIST_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'CHECK_LIST_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'CHECK_LIST_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'CHECK_LIST_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
