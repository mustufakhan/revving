export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'UPLOAD_CSV_COLUMN_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'UPLOAD_CSV_COLUMN_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'UPLOAD_CSV_COLUMN_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'UPLOAD_CSV_COLUMN_NET_FAILED': {
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
