import { put, takeEvery, call } from 'redux-saga/effects';
import getApiCaller from '../../getApiCaller';

const API_DATA = (action: any) => {
  const {
    page = 1,
    rowsPerPage = 10,
    orderBy = 'created_at',
    currency,
    onboard_status,
    masterRevenue
  } = action.payload;
  return getApiCaller(
    `ingestion/RevMasterDetails/?ordering=${orderBy}&page=${page}&page_size=${rowsPerPage}&currency=${currency}&master__on_board_status=${onboard_status}&master__name=${masterRevenue}`,
    'get',
    true
  ).then((response) => response);
};

const that = this;

export const REV_MASTER_DETAILS_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('REV_MASTER_DETAILS', function* (action) {
    yield put({ type: 'REV_MASTER_DETAILS_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'REV_MASTER_DETAILS_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'REV_MASTER_DETAILS_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'REV_MASTER_DETAILS_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
