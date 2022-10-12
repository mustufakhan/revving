import { put, takeEvery, call } from 'redux-saga/effects';
import postApiCaller from '../../../postApiCaller';

const API_DATA = (action: any) => {
  const { csv_column, database_column, data_source, uuid } = action.payload;
  const body = {
    csv_column,
    database_column,
    data_source
  };

  return postApiCaller(`ingestion/ResourceColumnMap/${uuid}`, 'put', body, true, false).then(
    (response) => response
  );
};

const that = this;

export const UPDATE_MAPPING_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('UPDATE_MAPPING', function* (action) {
    yield put({ type: 'UPDATE_MAPPING_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'UPDATE_MAPPING_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'UPDATE_MAPPING_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'UPDATE_MAPPING_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
