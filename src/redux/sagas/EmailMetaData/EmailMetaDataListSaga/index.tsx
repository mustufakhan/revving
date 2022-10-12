import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../../getApiCaller';

const API_DATA = (action: any) => {
  const {
    dataSource,
    status = '',
    customer = '',
    orderBy = 'created_at',
    page = 1,
    rowsPerPage = 10,
    startDate,
    endDate
  } = action.payload;
  const startDateValue = startDate ? startDate : '';
  const endDateValue = endDate ? endDate : '';
  return getApiCaller(
    `ingestion/IngestionMetadata/?success=${status}&datasource=${dataSource}&customer=${customer}&ordering=-${orderBy}&page=${page}&page_size=${rowsPerPage}&start_date=${startDateValue}&end_date=${endDateValue}`,
    'get',
    true
  ).then((response) => response);
};

const that = this;

export const GET_EMAIL_METADATA_LIST_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('GET_EMAIL_METADATA_LIST', function* (action) {
    yield put({ type: 'GET_EMAIL_METADATA_LIST_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'GET_EMAIL_METADATA_LIST_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'GET_EMAIL_METADATA_LIST_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'GET_EMAIL_METADATA_LIST_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
