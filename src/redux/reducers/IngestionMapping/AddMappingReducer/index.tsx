export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'ADD_MAPPING_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'ADD_MAPPING_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'ADD_MAPPING_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'ADD_MAPPING_NET_FAILED': {
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
