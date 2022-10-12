export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'PARENT_RETRIVE_INFO_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'PARENT_RETRIVE_INFO_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'PARENT_RETRIVE_INFO_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'PARENT_RETRIVE_INFO_NET_FAILED': {
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
