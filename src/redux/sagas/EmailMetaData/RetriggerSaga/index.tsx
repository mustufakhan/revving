import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) =>
  getApiCaller('ingestion/Retrigger/', 'post', true).then((response) => response);

const that = this;

export const GET_RETRIGGER_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('GET_RETRIGGER', function* (action) {
    yield put({ type: 'GET_RETRIGGER_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'GET_RETRIGGER_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'GET_RETRIGGER_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'GET_RETRIGGER_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
