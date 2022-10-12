export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'EXPORT_ADVANCE_REPORT_CSV_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'EXPORT_ADVANCE_REPORT_CSV_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'EXPORT_ADVANCE_REPORT_CSV_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'EXPORT_ADVANCE_REPORT_CSV_NET_FAILED': {
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
