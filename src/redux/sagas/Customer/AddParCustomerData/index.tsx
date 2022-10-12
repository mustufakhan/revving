import { put, takeEvery, call } from 'redux-saga/effects';
import postApiCaller from '../../../postApiCaller';

const API_DATA = (action: any) => {
  const {
    parentName,
    parentAddress,
    parentCategory,
    parentCompanyNo,
    parentSafeNo,
    parentCountry,
    unknownstatus
  } = action.payload;
  const body = {
    name: parentName,
    address_one: parentAddress,
    company_category: parentCategory,
    company_number: parentCompanyNo,
    safe_number: parentSafeNo,
    country_code: parentCountry,
    status: unknownstatus
  };

  return postApiCaller('ingestion/Customer/', 'post', body, true, false).then(
    (response) => response
  );
};

const that = this;

export const PAR_ADD_CUSTOMER_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('PAR_ADD_CUSTOMER', function* (action) {
    yield put({ type: 'PAR_ADD_CUSTOMER_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'PAR_ADD_CUSTOMER_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'PAR_ADD_CUSTOMER_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'PAR_ADD_CUSTOMER_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
