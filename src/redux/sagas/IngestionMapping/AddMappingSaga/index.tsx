import { put, takeEvery, call } from 'redux-saga/effects';
import postApiCaller from '../../../postApiCaller';

// interface IREVENUESOURCE {
//   type: string;
//   payload: {
//     dataSource: string;
//     name: string;
//     currency: string;
//     impressionValue: string;
//     included: boolean;
//   };
// }

const API_DATA = (action: any) => {
  const { csvColumn, dbColumn, dataSource } = action.payload;
  const body = {
    data_source: dataSource,
    csv_column: csvColumn,
    database_column: dbColumn
  };

  return postApiCaller('ingestion/ResourceColumnMap/', 'post', body, true, false).then(
    (response) => response
  );
};

const that = this;

export const ADD_MAPPING_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('ADD_MAPPING', function* (action) {
    yield put({ type: 'ADD_MAPPING_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'ADD_MAPPING_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'ADD_MAPPING_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'ADD_MAPPING_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
