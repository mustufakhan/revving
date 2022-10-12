import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const { page = 1, rowsPerPage = 100, orderBy = 'created_at' } = action.payload;
  return getApiCaller(
    `reporting/StagingInvoices/available/revenue_source_master/?ordering=${orderBy}&page=${page}&page_size=${rowsPerPage}`,
    'get',
    true
  ).then((response) => response);
};
// const API_DATA = (action: any) => {
//   const { search } = action.payload;
//   const searchUrl = search
//     ? `reporting/StagingInvoices/available/revenue_source_master/?search=${search}`
//     : 'reporting/StagingInvoices/available/revenue_source_master/';
//   return getApiCaller(searchUrl, 'get', true).then((response) => response);
// };

const that = this;

export const KANTOX_AVAILABLE_REVENUE_SOURCE_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('KANTOX_AVAILABLE_REVENUE_SOURCE', function* (action) {
    yield put({ type: 'KANTOX_AVAILABLE_REVENUE_SOURCE_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'KANTOX_AVAILABLE_REVENUE_SOURCE_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'KANTOX_AVAILABLE_REVENUE_SOURCE_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'KANTOX_AVAILABLE_REVENUE_SOURCE_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
