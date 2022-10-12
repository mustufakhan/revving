export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'GET_NOTIONAL_COMMENTS_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'GET_NOTIONAL_COMMENTS_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'GET_NOTIONAL_COMMENTS_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'GET_NOTIONAL_COMMENTS_NET_FAILED': {
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
