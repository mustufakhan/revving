export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'LMS_STAGING_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'LMS_STAGING_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'LMS_STAGING_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'LMS_STAGING_NET_FAILED': {
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
