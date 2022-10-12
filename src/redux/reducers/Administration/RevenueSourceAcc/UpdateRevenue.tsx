export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'REVENUE_SOURCE_MASTER_UPDATE_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'REVENUE_SOURCE_MASTER_UPDATE_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'REVENUE_SOURCE_MASTER_UPDATE_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'REVENUE_SOURCE_MASTER_UPDATE_NET_FAILED': {
      return {
        ...state,
        changingStatus: 'netFailed',
        data: action.payload
      };
    }
    case 'REVENUE_ACCOUNT_UPDATE_CLEAR': {
      return {
        ...state,
        changingStatus: '',
        data: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
