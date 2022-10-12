import { put, takeEvery, call } from 'redux-saga/effects';
import postApiCaller from '../../../postApiCaller';

const API_DATA = (action: any) => {
  const { company_reference, cuid } = action.payload;
  const body = {
    company_reference
  };
  return postApiCaller(`ingestion/Customer/${cuid}`, 'PATCH', body, true, false).then(
    (response) => response
  );
};

const that = this;

export const KONTEX_COMPANY_REFERENCE_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('KONTEX_COMPANY_REFERENCE', function* (action) {
    // eslint-disable-next-line no-console
    console.log('action', action);
    yield put({ type: 'KONTEX_COMPANY_REFERENCE_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'KONTEX_COMPANY_REFERENCE_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'KONTEX_COMPANY_REFERENCE_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'KONTEX_COMPANY_REFERENCE_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
