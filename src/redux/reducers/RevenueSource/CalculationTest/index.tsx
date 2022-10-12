export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'REVENUE_SOURCE_CALCULATION_TEST_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'REVENUE_SOURCE_CALCULATION_TEST_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'REVENUE_SOURCE_CALCULATION_TEST_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'REVENUE_SOURCE_CALCULATION_TEST_NET_FAILED': {
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
