import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const { dataSource } = action.payload;
  return getApiCaller(`ingestion/SheetColumns/${dataSource}`, 'get', true).then(
    (response) => response
  );
};

const that = this;

export const GET_CSV_COLUMN_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('GET_CSV_COLUMN', function* (action) {
    yield put({ type: 'GET_CSV_COLUMN_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'GET_CSV_COLUMN_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'GET_CSV_COLUMN_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'GET_CSV_COLUMN_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
