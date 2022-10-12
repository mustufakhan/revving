import { put, takeEvery, call } from 'redux-saga/effects';
import postApiCaller from '../../../postApiCaller';

const API_DATA = (action: any) => {
  const {
    masterName = '',
    countryCode = '',
    city = '',
    addressOne = '',
    addressTwo = '',
    postcode = '',
    companyNo = ''
  } = action.payload;
  const body = {
    name: masterName,
    country_code: countryCode,
    city,
    address_one: addressOne,
    address_two: addressTwo,
    postcode,
    company_number: companyNo
  };

  return postApiCaller('ingestion/RevenueSourceMaster/', 'post', body, true, false).then(
    (response) => response
  );
};

const that = this;

export const ADD_REVENUE_SOURCE_MASTER_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('ADD_REVENUE_SOURCE_MASTER', function* (action) {
    yield put({ type: 'ADD_REVENUE_SOURCE_MASTER_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'ADD_REVENUE_SOURCE_MASTER_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'ADD_REVENUE_SOURCE_MASTER_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'ADD_REVENUE_SOURCE_MASTER_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
