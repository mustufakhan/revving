export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'ACCOUNTING_REJECT_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'ACCOUNTING_REJECT_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'ACCOUNTING_REJECT_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'ACCOUNTING_REJECT_NET_FAILED': {
      return {
        ...state,
        changingStatus: 'netFailed',
        data: action.payload
      };
    }
    case 'ACCOUNTING_CLEAR': {
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
