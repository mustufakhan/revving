export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'CREATE_NOTIONAL_COMMENT_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'CREATE_NOTIONAL_COMMENT_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'CREATE_NOTIONAL_COMMENT_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'CREATE_NOTIONAL_COMMENT_NET_FAILED': {
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
