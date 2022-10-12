export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'ACCOUNTING_DETAILS_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'ACCOUNTING_DETAILS_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'ACCOUNTING_DETAILS_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'ACCOUNTING_DETAILS_NET_FAILED': {
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
