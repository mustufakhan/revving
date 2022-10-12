export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'PRE_ASSESSMENT_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'PRE_ASSESSMENT_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'PRE_ASSESSMENT_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'PRE_ASSESSMENT_NET_FAILED': {
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
