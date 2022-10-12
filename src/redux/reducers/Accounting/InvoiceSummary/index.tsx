export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'INVOICE_SUMMARY_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'INVOICE_SUMMARY_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'INVOICE_SUMMARY_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'INVOICE_SUMMARY_NET_FAILED': {
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
