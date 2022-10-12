import { put, takeEvery, call } from 'redux-saga/effects';
import postApiCaller from '../../../postApiCaller';

// interface IREVENUESOURCE {
//   type: string;
//   payload: {
//     dataSource: string;
//     name: string;
//     currency: string;
//     impressionValue: string;
//     included: boolean;
//   };
// }

const API_DATA = (action: any) => {
  const { name, cuid, country_code, company_number, vat_number } = action.payload;
  const body = {
    name,
    country_code,
    company_number,
    vat_number
  };

  return postApiCaller(`ingestion/Customer/${cuid}`, 'put', body, true, false).then(
    (response) => response
  );
};

const that = this;

export const UPDATE_CUSTOMER_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('UPDATE_CUSTOMER', function* (action) {
    yield put({ type: 'UPDATE_CUSTOMER_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'UPDATE_CUSTOMER_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'UPDATE_CUSTOMER_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'UPDATE_CUSTOMER_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
