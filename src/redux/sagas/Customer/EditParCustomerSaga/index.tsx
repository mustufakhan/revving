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
  const {
    parentName,
    cuid,
    parCuid,
    parentAddress,
    parentCategory,
    parentCompanyNo,
    parentCountry,
    parCusStatus,
    parentSafeNo,
    is_risk_transfer,
    unknownstatus,
    remove_parent,
    default_currency
  } = action.payload;
  const body = {
    name: parentName,
    address_one: parentAddress,
    company_category: parentCategory,
    company_number: parentCompanyNo,
    country_code: parentCountry,
    status: parCusStatus ? parCusStatus : unknownstatus,
    safe_number: parentSafeNo,
    is_risk_transfer,
    cuid: parCuid,
    remove_parent,
    default_currency
  };

  return postApiCaller(`ingestion/Customer/${cuid}`, 'PATCH', body, true, false).then(
    (response) => response
  );
};

const that = this;

export const PAR_EDIT_CUSTOMER_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('PAR_EDIT_CUSTOMER', function* (action) {
    yield put({ type: 'PAR_EDIT_CUSTOMER_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'PAR_EDIT_CUSTOMER_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'PAR_EDIT_CUSTOMER_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'PAR_EDIT_CUSTOMER_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
