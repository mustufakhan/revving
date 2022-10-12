export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'ADD_REVENUE_SOURCE_NEW_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'ADD_REVENUE_SOURCE_NEW_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'ADD_REVENUE_SOURCE_NEW_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'ADD_REVENUE_SOURCE_NEW_NET_FAILED': {
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
