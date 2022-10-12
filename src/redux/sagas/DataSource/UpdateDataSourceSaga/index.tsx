import { put, takeEvery, call } from 'redux-saga/effects';
import postApiCaller from '../../../postApiCaller';

const API_DATA = (action: any) => {
  const {
    uuid,
    source_name,
    from_email,
    customer_cuid,
    subject,
    skip_rows,
    skip_footer,
    has_multi_revenue_sources
  } = action.payload;

  const body = {
    source_name,
    from_email,
    customer: customer_cuid,
    subject,
    skip_rows,
    skip_footer,
    has_multi_revenue_sources: JSON.parse(has_multi_revenue_sources)
  };
  return postApiCaller(`ingestion/DataSource/${uuid}`, 'put', body, true, false).then(
    (response) => response
  );
};

const that = this;

export const UPDATE_DATA_SOURCE_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('UPDATE_DATA_SOURCE', function* (action) {
    yield put({ type: 'UPDATE_DATA_SOURCE_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'UPDATE_DATA_SOURCE_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'UPDATE_DATA_SOURCE_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'UPDATE_DATA_SOURCE_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
