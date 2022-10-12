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
    oblParentName,
    oblUuid,
    oblParUuid,
    oblParentAddress,
    oblParentCategory,
    oblParentCompanyNo,
    oblParentCountry,
    oblParCusStatus,
    oblParentSafeNo,
    is_risk_transfer,
    unknownstatus,
    remove_parent,
    default_currency
  } = action.payload;
  const body = {
    name: oblParentName,
    address_one: oblParentAddress,
    company_category: oblParentCategory,
    company_number: oblParentCompanyNo,
    country_code: oblParentCountry,
    status: oblParCusStatus ? oblParCusStatus : unknownstatus,
    safe_number: oblParentSafeNo,
    is_risk_transfer,
    uuid: oblParUuid,
    remove_parent,
    default_currency
  };

  return postApiCaller(
    `ingestion/RevenueSourceMasterUpdate/${oblUuid}`,
    'PATCH',
    body,
    true,
    false
  ).then((response) => response);
};

const that = this;

export const OBL_PAR_EDIT_OBLIGOR_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('OBL_PAR_EDIT_OBLIGOR', function* (action) {
    yield put({ type: 'OBL_PAR_EDIT_OBLIGOR_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'OBL_PAR_EDIT_OBLIGOR_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'OBL_PAR_EDIT_OBLIGOR_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'OBL_PAR_EDIT_OBLIGOR_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
