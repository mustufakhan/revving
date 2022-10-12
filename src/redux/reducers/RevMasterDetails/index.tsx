export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'REV_MASTER_DETAILS_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'REV_MASTER_DETAILS_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'REV_MASTER_DETAILS_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'REV_MASTER_DETAILS_NET_FAILED': {
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
