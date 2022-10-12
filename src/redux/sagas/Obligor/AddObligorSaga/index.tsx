import { put, takeEvery, call } from 'redux-saga/effects';
import postApiCaller from '../../../postApiCaller';

const API_DATA = (action: any) => {
  const {
    oblName,
    oblAddress,
    oblCat,
    oblCompanyName,
    oblCountry,
    oblSafeNo,
    unknownstatus,
    phoneNumber,
    default_currency
  } = action.payload;
  const body = {
    name: oblName,
    country_code: oblCountry,
    company_number: oblCompanyName,
    address_one: oblAddress,
    obligor_category: oblCat,
    safe_number: oblSafeNo,
    status: unknownstatus,
    phone_number: phoneNumber,
    default_currency
  };

  return postApiCaller('ingestion/RevenueSourceMaster/', 'post', body, true, false).then(
    (response) => response
  );
};

const that = this;

export const ADD_OBLIGOR_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('ADD_OBLIGOR', function* (action) {
    yield put({ type: 'ADD_OBLIGOR_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'ADD_OBLIGOR_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'ADD_OBLIGOR_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'ADD_OBLIGOR_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
