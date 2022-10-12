import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const { page = 1, rowsPerPage = 100, orderBy = 'created_at', customer = '' } = action.payload;
  return getApiCaller(
    `ingestion/DataSource/?ordering=${orderBy}&page=${page}&page_size=${rowsPerPage}&customer=${customer}`,
    'get',
    true
  ).then((response) => response);
};

const that = this;

export const DATA_SOURCE_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('DATA_SOURCE', function* (action) {
    yield put({ type: 'DATA_SOURCE_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'DATA_SOURCE_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'DATA_SOURCE_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'DATA_SOURCE_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
