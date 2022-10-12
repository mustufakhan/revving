export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'STAGING_ACTION_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'STAGING_ACTION_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'STAGING_ACTION_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'STAGING_ACTION_NET_FAILED': {
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
