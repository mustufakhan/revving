export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'EMAIL_RECALCULATE_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'EMAIL_RECALCULATE_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'EMAIL_RECALCULATE_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'EMAIL_RECALCULATE_NET_FAILED': {
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
