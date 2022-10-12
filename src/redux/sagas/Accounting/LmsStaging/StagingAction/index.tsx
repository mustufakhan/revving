import { put, takeEvery, call } from 'redux-saga/effects';
import postApiCaller from '../../../../postApiCaller';

const API_DATA = (action: any) => {
  const { acceptArr = '', rejectArr = '' } = action.payload;

  const body = {
    accept: acceptArr,
    reject: rejectArr
  };

  return postApiCaller('invoicing/StagingAction/', 'post', body, true, false).then(
    (response) => response
  );
};

const that = this;

export const STAGING_ACTION_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('STAGING_ACTION', function* (action) {
    yield put({ type: 'STAGING_ACTION_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'STAGING_ACTION_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'STAGING_ACTION_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'STAGING_ACTION_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
