import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const { search } = action.payload;
  return getApiCaller(`ingestion/Customer/?search=${search}`, 'get', true).then(
    (response) => response
  );
};
const that = this;

export const CUSTOMER_SEARCH_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('CUSTOMER_SEARCH', function* (action) {
    yield put({ type: 'CUSTOMER_SEARCH_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'CUSTOMER_SEARCH_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'CUSTOMER_SEARCH_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'CUSTOMER_SEARCH_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
