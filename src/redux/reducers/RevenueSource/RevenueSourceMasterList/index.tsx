export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'REVENUE_SOURCE_MASTER_LIST_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'REVENUE_SOURCE_MASTER_LIST_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'REVENUE_SOURCE_MASTER_LIST_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'REVENUE_SOURCE_MASTER_LIST_NET_FAILED': {
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
