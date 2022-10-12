export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'UPDATE_MAPPING_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'UPDATE_MAPPING_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'UPDATE_MAPPING_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'UPDATE_MAPPING_NET_FAILED': {
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
