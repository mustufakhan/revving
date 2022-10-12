import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const { search } = action.payload;
  return getApiCaller(`ingestion/CountriesList/?search=${search}`, 'get', false).then(
    (response) => response
  );
};
const that = this;

export const CCCLIST_INFO_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('CCCLIST_INFO', function* (action) {
    yield put({ type: 'CCCLIST_INFO_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'CCCLIST_INFO_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'CCCLIST_INFO_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'CCCLIST_INFO_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
