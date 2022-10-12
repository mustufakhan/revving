import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const { page = 1, rowsPerPage = 10, orderBy = 'created_at' } = action.payload;
  return getApiCaller(
    `ingestion/KantoxAccounts/?ordering=${orderBy}&page=${page}&page_size=${rowsPerPage}`,
    'get',
    true
  ).then((response) => response);
};

const that = this;

export const KANTOX_ACCOUNTS_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('KANTOX_ACCOUNTS', function* (action) {
    yield put({ type: 'KANTOX_ACCOUNTS_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'KANTOX_ACCOUNTS_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'KANTOX_ACCOUNTS_LIST_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'KANTOX_ACCOUNTS_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
