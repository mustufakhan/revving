/* eslint-disable no-console */

import { put, takeEvery, call } from 'redux-saga/effects';
import postApiCaller from '../../../postApiCaller';

const API_DATA = (action: any) => {
  const body = { ...action.payload };

  return postApiCaller(
    'accounts/admin/user/create/?send_request=true',
    'post',
    body,
    true,
    false
  ).then((response) => response);
};

const that = this;

export const ADD_USER_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('ADD_USER', function* (action) {
    yield put({ type: 'ADD_USER_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'ADD_USER_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'ADD_USER_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'ADD_USER_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
