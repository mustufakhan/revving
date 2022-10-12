export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'REPORT_REVENUE_COLLECTION_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'REPORT_REVENUE_COLLECTION_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'REPORT_REVENUE_COLLECTION_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'REPORT_REVENUE_COLLECTION_NET_FAILED': {
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
