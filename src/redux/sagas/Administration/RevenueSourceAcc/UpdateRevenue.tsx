import { put, takeEvery, call } from 'redux-saga/effects';
import postApiCaller from '../../../postApiCaller';

const API_DATA = (action: any) => {
  const { id, mainId } = action.payload;
  const body = {
    master: id
  };
  return postApiCaller(`ingestion/RevenueSourceAccRUD/${mainId}`, 'PATCH', body, true, false).then(
    (response) => response
  );
};

const that = this;

export const REVENUE_SOURCE_MASTER_UPDATE_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('REVENUE_SOURCE_MASTER_UPDATE', function* (action) {
    yield put({ type: 'REVENUE_SOURCE_MASTER_UPDATE_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'REVENUE_SOURCE_MASTER_UPDATE_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'REVENUE_SOURCE_MASTER_UPDATE_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'REVENUE_SOURCE_MASTER_UPDATE_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
