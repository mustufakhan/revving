import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const { oblCompanyName, oblCountry, oblSafeNo } = action.payload;
  return getApiCaller(
    `ingestion/ObligorData/?company_number=${oblCompanyName}&country_code=${oblCountry}&safe_number=${oblSafeNo}`,
    'get',
    true
  ).then((response) => response);
};

const that = this;

export const CREDET_OBLIGOR_RETRIVE_INFO_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('RETRIVE_INFO_OBLIGOR', function* (action) {
    yield put({ type: 'RETRIVE_INFO_OBLIGOR_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'RETRIVE_INFO_OBLIGOR_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'RETRIVE_INFO_OBLIGOR_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'RETRIVE_INFO_OBLIGOR_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
