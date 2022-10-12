export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'OBL_PAR_EDIT_OBLIGOR_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'OBL_PAR_EDIT_OBLIGOR_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'OBL_PAR_EDIT_OBLIGOR_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'OBL_PAR_EDIT_OBLIGOR_NET_FAILED': {
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
