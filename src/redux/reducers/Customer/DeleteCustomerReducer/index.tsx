export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'DELETE_CUSTOMER_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'DELETE_CUSTOMER_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'DELETE_CUSTOMER_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'DELETE_CUSTOMER_NET_FAILED': {
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
