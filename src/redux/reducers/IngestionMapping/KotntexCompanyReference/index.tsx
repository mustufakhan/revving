export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'KONTEX_COMPANY_REFERENCE_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'KONTEX_COMPANY_REFERENCE_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'KONTEX_COMPANY_REFERENCE_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'KONTEX_COMPANY_REFERENCE_NET_FAILED': {
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
