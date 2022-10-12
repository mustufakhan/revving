export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'REPORT_INVOICE_ADVANCE_LEDGER_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'REPORT_INVOICE_ADVANCE_LEDGER_SUCCESS': {
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'REPORT_INVOICE_ADVANCE_LEDGER_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'REPORT_INVOICE_ADVANCE_LEDGER_NET_FAILED': {
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
