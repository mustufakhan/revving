export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'GET_NOTIONAL_TRANS_INVOICE_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'GET_NOTIONAL_TRANS_INVOICE_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'GET_NOTIONAL_TRANS_INVOICE_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'GET_NOTIONAL_TRANS_INVOICE_NET_FAILED': {
      return {
        ...state,
        changingStatus: 'netFailed',
        data: action.payload
      };
    }
    case 'GET_NOTIONAL_TRANS_INVOICE_CLEAR': {
      return {
        ...state,
        changingStatus: '',
        data: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
