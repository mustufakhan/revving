/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/indent */

import { put, takeLatest, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = async (action: any) => {
  const { search, customer } = action.payload;
  const searchUrl = search
    ? `accounts/AllCustomerRevenueSource/?search=${search}`
    : customer
    ? `accounts/AllCustomerRevenueSource/?customer=${customer}`
    : 'accounts/AllCustomerRevenueSource/';
  const response = await getApiCaller(searchUrl, 'get', true);
  return response;
};

const that = this;

export const REVENUE_SOURCE_MASTER_LIST2_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeLatest('REVENUE_SOURCE_MASTER_LIST_API', function* (action) {
    yield put({ type: 'REVENUE_SOURCE_MASTER_LIST_API_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'REVENUE_SOURCE_MASTER_LIST_API_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'REVENUE_SOURCE_MASTER_LIST_API_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'REVENUE_SOURCE_MASTER_LIST_API_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
