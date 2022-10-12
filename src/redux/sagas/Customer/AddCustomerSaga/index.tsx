import { put, takeEvery, call } from 'redux-saga/effects';
import postApiCaller from '../../../postApiCaller';

const API_DATA = (action: any) => {
  const {
    name,
    companyNo,
    vatNumber,
    country,
    address,
    category,
    safeNo,
    unknownstatus,
    phoneNumber,
    default_currency
  } = action.payload;
  const body = {
    name,
    country_code: country,
    company_number: companyNo,
    vat_number: vatNumber,
    address_one: address,
    company_category: category,
    safe_number: safeNo,
    status: unknownstatus,
    phone_number: phoneNumber,
    default_currency
  };

  return postApiCaller('ingestion/Customer/', 'post', body, true, false).then(
    (response) => response
  );
};

const that = this;

export const ADD_CUSTOMER_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('ADD_CUSTOMER', function* (action) {
    yield put({ type: 'ADD_CUSTOMER_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'ADD_CUSTOMER_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'ADD_CUSTOMER_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'ADD_CUSTOMER_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
