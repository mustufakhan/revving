export default function reducer(
  state = {
    data: null
  },
  action: any
) {
  switch (action.type) {
    case 'LOGIN_USER_STARTED': {
      return { ...state, changingStatus: 'ongoing' };
    }
    case 'LOGIN_USER_SUCCESS': {
      const { refresh, access } = action.payload.data;
      localStorage.setItem('TOKEN', access);
      localStorage.setItem('REFRESH_TOKEN', refresh);
      return {
        ...state,
        changingStatus: 'success',
        data: action.payload
      };
    }
    case 'LOGIN_USER_FAILED': {
      return { ...state, changingStatus: 'failed', data: action.payload };
    }
    case 'LOGIN_USER_NET_FAILED': {
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
