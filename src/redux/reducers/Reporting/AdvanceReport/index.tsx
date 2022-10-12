export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'ADVANCE_REPORT_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'ADVANCE_REPORT_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'ADVANCE_REPORT_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'ADVANCE_REPORT_NET_FAILED': {
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
