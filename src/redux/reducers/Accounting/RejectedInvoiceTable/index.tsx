export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'REJECTED_INVOICE_TABLE_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'REJECTED_INVOICE_TABLE_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'REJECTED_INVOICE_TABLE_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'REJECTED_INVOICE_TABLE_NET_FAILED': {
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
