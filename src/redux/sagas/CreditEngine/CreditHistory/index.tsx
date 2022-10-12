import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getNewApiCaller';

const API_DATA = (action: any) => {
  const { search } = action.payload;
  const data = search ? search : '';
  return getApiCaller(
    `crengine/api/v1/preliminary-scoring-history/?search=${data}`,
    'get',
    false
  ).then((response) => response);
};

const that = this;

export const CREDIT_HISTORY_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('CREDIT_HISTORY', function* (action) {
    yield put({ type: 'CREDIT_HISTORY_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'CREDIT_HISTORY_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'CREDIT_HISTORY_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'CREDIT_HISTORY_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
