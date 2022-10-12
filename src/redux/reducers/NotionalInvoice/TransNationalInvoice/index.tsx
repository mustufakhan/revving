export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'TRANS_NOTIONAL_INVOICE_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'TRANS_NOTIONAL_INVOICE_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'TRANS_NOTIONAL_INVOICE_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'TRANS_NOTIONAL_INVOICE_NET_FAILED': {
      return {
        ...state,
        changingStatus: 'netFailed',
        data: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
