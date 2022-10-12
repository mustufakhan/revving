export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'API_SOURCE_DATA_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'API_SOURCE_DATA_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'API_SOURCE_DATA_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'API_SOURCE_DATA_NET_FAILED': {
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
