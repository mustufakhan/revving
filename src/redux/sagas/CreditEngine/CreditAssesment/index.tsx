import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getNewApiCaller';

const API_DATA = (action: any) => {
  const {
    country,
    oblCountry,
    is_client,
    realTime,
    oblRealTime,
    companyNo,
    oblCompanyName,
    safeNo,
    oblSafeNo
  } = action.payload;
  const real_time = is_client ? realTime : oblRealTime;
  const country1 = is_client ? country : oblCountry;
  const company = is_client ? companyNo : oblCompanyName;
  const safeNum = is_client ? safeNo : oblSafeNo;
  return getApiCaller(
    `crengine/api/v1/get-pre-assessment/?country_code=${country1}&is_client=${is_client}&real_time=${real_time}&safe_number=${safeNum}&company_no=${company}`,
    'get',
    false
  ).then((response) => response);
};

const that = this;

export const GET_PRE_ASSESSMENT = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('PRE_ASSESSMENT', function* (action) {
    yield put({ type: 'PRE_ASSESSMENT_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'PRE_ASSESSMENT_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'PRE_ASSESSMENT_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'PRE_ASSESSMENT_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
