import { put, takeLatest, call } from 'redux-saga/effects';
import postApiCaller from '../../../postApiCaller';

const API_DATA = (action: any) => {
  const { id } = action.payload;
  return postApiCaller(`ingestion/Calculation/${id}`, 'post', {}, true, false).then(
    (response) => response
  );
};
const that = this;

export const EMAIL_RECALCULATE_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeLatest('EMAIL_RECALCULATE', function* (action) {
    yield put({ type: 'EMAIL_RECALCULATE_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'EMAIL_RECALCULATE_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'EMAIL_RECALCULATE_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'EMAIL_RECALCULATE_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
