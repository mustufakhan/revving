import { put, takeEvery, call } from 'redux-saga/effects';
import deleteApiCaller from '../../../getApiCaller';

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
  const { id } = action.payload;
  return deleteApiCaller(`ingestion/RevenueSource/${id}`, 'delete', true).then(
    (response) => response
  );
};

const that = this;

export const DELETE_REVENUE_SOURCE_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('DELETE_REVENUE_SOURCE', function* (action) {
    yield put({ type: 'DELETE_REVENUE_SOURCE_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'DELETE_REVENUE_SOURCE_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'DELETE_REVENUE_SOURCE_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'DELETE_REVENUE_SOURCE_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
