import { put, takeEvery, call } from 'redux-saga/effects';
import postApiCaller from '../../../postApiCaller';

const API_DATA = (action: any) => {
  const { oblName, oblUuid, oblAddress, oblCat, is_transfer } = action.payload;
  const body = {
    name: oblName,
    address_one: oblAddress,
    obligor_category: oblCat,
    is_risk_transfer: is_transfer
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

export const EDIT_OBLIGOR_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('EDIT_OBLIGOR', function* (action) {
    yield put({ type: 'EDIT_OBLIGOR_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'EDIT_OBLIGOR_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'EDIT_OBLIGOR_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'EDIT_OBLIGOR_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
