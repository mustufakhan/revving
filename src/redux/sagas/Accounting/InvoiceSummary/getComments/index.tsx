import { put, takeEvery, call } from 'redux-saga/effects';
import postApiCaller from '../../../../postApiCaller';

const API_DATA = (action: any) => {
  const { codatinvoice, comment } = action.payload;

  const body = {
    codatinvoice,
    comment
  };

  return postApiCaller('reporting/CodatComment/', 'post', body, true, false).then(
    (response) => response
  );
};

const that = this;

export const CREATE_CODAT_COMMENT_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('CREATE_CODAT_COMMENT', function* (action) {
    yield put({ type: 'CREATE_CODAT_COMMENT_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'CREATE_CODAT_COMMENT_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'CREATE_CODAT_COMMENT_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'CREATE_CODAT_COMMENT_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
