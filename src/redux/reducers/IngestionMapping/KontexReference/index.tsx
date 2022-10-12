export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'KANTOX_ACCOUNTS_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'KANTOX_ACCOUNTS_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'KANTOX_ACCOUNTS_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'KANTOX_ACCOUNTS_NET_FAILED': {
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
