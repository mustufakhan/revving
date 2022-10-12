export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'ADD_CUSTOMER_VALUE_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'ADD_CUSTOMER_VALUE_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'ADD_CUSTOMER_VALUE_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'ADD_CUSTOMER_VALUE_NET_FAILED': {
      return {
        ...state,
        changingStatus: 'netFailed',
        data: action.payload
      };
    }
    case 'USER_ADD_LIST_CLEAR': {
      return {
        ...state,
        changingStatus: ''
      };
    }
    default: {
      return state;
    }
  }
}
