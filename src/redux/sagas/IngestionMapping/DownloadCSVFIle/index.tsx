import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const { donwloadlnk } = action.payload;
  return getApiCaller(`accounts/Download/?url=${donwloadlnk}`, 'get', true).then(
    (response) => response
  );
};

const that = this;

export const DOWNLOAD_CSV_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('DOWNLOAD_CSV', function* (action) {
    yield put({ type: 'DOWNLOAD_CSV_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'DOWNLOAD_CSV_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'DOWNLOAD_CSV_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'DOWNLOAD_CSV_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
