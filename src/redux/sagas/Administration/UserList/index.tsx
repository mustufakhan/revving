import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const { page = 1, rowsPerPage = 10, customer = '', search = '', approve = '' } = action.payload;
  return getApiCaller(
    `accounts/Users/?search=${search}&customer__cuid=${customer}&status=${approve}&page=${page}&page_size=${rowsPerPage}`,
    'get',
    true
  ).then((response) => response);
};

const that = this;

export const USER_LIST_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('USER_LIST', function* (action) {
    yield put({ type: 'USER_LIST_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'USER_LIST_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'USER_LIST_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'USER_LIST_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
