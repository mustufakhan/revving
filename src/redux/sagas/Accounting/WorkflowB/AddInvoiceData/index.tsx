import { put, takeEvery, call } from 'redux-saga/effects';
import postApiCaller from '../../../../postApiCaller';

const API_DATA = (action: any) => {
  const {
    popcustomer = '',
    poprevenueSource = '',
    // popcurrency = '',
    // popissueDate = '',
    popissueMonth = '',
    popissueYear = '',
    adjustedDate = '',
    popInvNo = '',
    popGrossValue = '',
    issueDate = '',
    modalCurrency = ''
  } = action.payload;

  const body = {
    company_name: popcustomer,
    revenue_source: poprevenueSource,
    currency: modalCurrency,
    issue_date: issueDate,
    month: popissueMonth,
    year: popissueYear,
    adjusted_expected_payment_date: adjustedDate,
    total_amount: popGrossValue,
    amount_due: popGrossValue,
    codat_invoice_no: popInvNo
  };

  return postApiCaller(
    'reporting/CodatInvoicesLCapi/?type=collateral',
    'post',
    body,
    true,
    false
  ).then((response) => response);
};

const that = this;

export const ADD_INVOICE_DATA_SOURCE_SAGA = function* fetchUsers() {
  // eslint-disable-next-line
  yield takeEvery('ADD_INVOICE_DATA_SOURCE', function* (action) {
    yield put({ type: 'ADD_INVOICE_DATA_SOURCE_STARTED' });
    try {
      const DATA: typeof API_DATA = yield call(API_DATA.bind(that, action));
      yield put({
        type: 'ADD_INVOICE_DATA_SOURCE_SUCCESS',
        payload: { status: 'success', data: DATA }
      });
    } catch (error: any) {
      if (error.toString() === 'TypeError: Network request failed') {
        yield put({
          type: 'ADD_INVOICE_DATA_SOURCE_NET_FAILED',
          payload: { status: 'failure', message: error.toString() }
        });
      } else {
        yield put({
          type: 'ADD_INVOICE_DATA_SOURCE_FAILED',
          payload: { status: 'failure', message: error }
        });
      }
    }
  });
};
