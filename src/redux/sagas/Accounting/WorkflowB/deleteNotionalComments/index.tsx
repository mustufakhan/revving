import { put, takeEvery, call } from 'redux-saga/effects';
import deleteApiCaller from '../../../../getApiCaller';

const API_DATA = (action: any) => {
  const { uuid } = action.payload;
  return deleteApiCaller(`invoicing/InvoiceMonthComment/delete/${uuid}`, 'delete', true).then(
    (response) => response
  );
};

const that = this;

export const DELETE_NOTIONAL_COMMENTS_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('DELETE_NOTIONAL_COMMENTS', function* (action) {
    yield put({ type: 'DELETE_NOTIONAL_COMMENTS_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'DELETE_NOTIONAL_COMMENTS_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'DELETE_NOTIONAL_COMMENTS_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'DELETE_NOTIONAL_COMMENTS_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
