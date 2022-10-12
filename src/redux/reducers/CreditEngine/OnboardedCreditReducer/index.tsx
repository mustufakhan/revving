export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'CUSTOMER_SEARCH_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'CUSTOMER_SEARCH_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'CUSTOMER_SEARCH_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'CUSTOMER_SEARCH_NET_FAILED': {
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
