export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'KANTOX_AVAILABLE_REVENUE_SOURCE_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'KANTOX_AVAILABLE_REVENUE_SOURCE_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'KANTOX_AVAILABLE_REVENUE_SOURCE_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'KANTOX_AVAILABLE_REVENUE_SOURCE_NET_FAILED': {
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
