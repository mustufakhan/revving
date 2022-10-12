import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const { oblParentCompanyNo, oblParentCountry, oblParentSafeNo } = action.payload;
  return getApiCaller(
    `ingestion/ObligorData/?company_number=${oblParentCompanyNo}&country_code=${oblParentCountry}&safe_number=${oblParentSafeNo}`,
    'get',
    true
  ).then((response) => response);
};

const that = this;

export const OBL_PARENT_RETRIVE_INFO_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('OBL_PARENT_RETRIVE_INFO', function* (action) {
    yield put({ type: 'OBL_RETRIVE_INFO_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'OBL_PARENT_RETRIVE_INFO_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'OBL_PARENT_RETRIVE_INFO_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'OBL_PARENT_RETRIVE_INFO_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
