import { put, takeEvery, call } from 'redux-saga/effects';
import postApiCaller from '../../../postApiCaller';

const API_DATA = (action: any) => {
  const { ids, update } = action.payload;
  const body = {
    ids,
    update
  };

  return postApiCaller('ingestion/RevenueSourceBulkUpdate/', 'PATCH', body, true, false).then(
    (response) => response
  );
};

const that = this;

export const BULK_UPDATE_REVENUE_SOURCE_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('BULK_UPDATE_REVENUE_SOURCE', function* (action) {
    yield put({ type: 'BULK_UPDATE_REVENUE_SOURCE_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'BULK_UPDATE_REVENUE_SOURCE_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'BULK_UPDATE_REVENUE_SOURCE_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'BULK_UPDATE_REVENUE_SOURCE_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
