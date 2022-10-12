export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'DOWNLOAD_CSV_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'DOWNLOAD_CSV_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'DOWNLOAD_CSV_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'DOWNLOAD_CSV_NET_FAILED': {
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
