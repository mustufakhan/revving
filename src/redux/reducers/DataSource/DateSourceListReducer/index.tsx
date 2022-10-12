export default function reducer(
  state = {
    data: []
  },
  action: any
) {
  switch (action.type) {
    case 'DATA_SOURCE_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'DATA_SOURCE_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'DATA_SOURCE_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'DATA_SOURCE_NET_FAILED': {
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
