import { put, takeEvery, call } from 'redux-saga/effects';
import postApiCaller from '../../../postApiCaller';

const API_DATA = (action: any) => {
  const {
    masterRevenue = '',
    country = '',
    currency = '',
    city = '',
    companyNumber = '',
    address = '',
    subAddress = '',
    postCode = ''
  } = action.payload;
  const body = {
    name: masterRevenue,
    country,
    currency,
    city,
    company_number: companyNumber,
    address_one: address,
    address_two: subAddress,
    postcode: postCode
  };

  return postApiCaller('ingestion/RevenueSourceMaster/', 'post', body, true, false).then(
    (response) => response
  );
};

const that = this;

export const ADD_REVENUE_SOURCE_NEW_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('ADD_REVENUE_SOURCE_NEW', function* (action) {
    yield put({ type: 'ADD_REVENUE_SOURCE_NEW_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'ADD_REVENUE_SOURCE_NEW_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'ADD_REVENUE_SOURCE_NEW_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'ADD_REVENUE_SOURCE_NEW_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
