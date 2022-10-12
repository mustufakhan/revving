export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'LMS_INVOICE_HISTORY_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'LMS_INVOICE_HISTORY_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'LMS_INVOICE_HISTORY_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'LMS_INVOICE_HISTORY_NET_FAILED': {
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
