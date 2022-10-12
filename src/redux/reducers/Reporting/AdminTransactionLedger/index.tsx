export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'ADMIN_TRANSACTION_LEDGER_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'ADMIN_TRANSACTION_LEDGER_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'ADMIN_TRANSACTION_LEDGER_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'ADMIN_TRANSACTION_LEDGER_NET_FAILED': {
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
