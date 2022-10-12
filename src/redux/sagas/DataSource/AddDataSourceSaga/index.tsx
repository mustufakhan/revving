import { put, takeEvery, call } from 'redux-saga/effects';
import postApiCaller from '../../../postApiCaller';

const API_DATA = (action: any) => {
  const {
    sourceName = '',
    fromEmail = '',
    customer = '',
    subject = '',
    skipRows = '',
    skipFooters = '',
    hasMultipleResource = ''
  } = action.payload;
  const body = {
    source_name: sourceName,
    from_email: fromEmail,
    customer,
    subject,
    skip_rows: skipRows,
    skip_footer: skipFooters,
    has_multi_revenue_sources: hasMultipleResource
  };

  return postApiCaller('ingestion/DataSource/', 'post', body, true, false).then(
    (response) => response
  );
};

const that = this;

export const ADD_DATA_SOURCE_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('ADD_DATA_SOURCE', function* (action) {
    yield put({ type: 'ADD_DATA_SOURCE_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'ADD_DATA_SOURCE_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'ADD_DATA_SOURCE_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'ADD_DATA_SOURCE_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
