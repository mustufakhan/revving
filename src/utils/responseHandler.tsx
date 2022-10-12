export const checkStatus = (response: any) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status === 500) {
    return response.json().then((errorData: any) => {
      const message = (errorData || {}).error;
      const error: any = new TypeError(message || 'Server error');
      throw error;
    });
  }
  if (response.status >= 400 && response.status < 500) {
    return response.json().then((errorData: any) => {
      const error: any = {
        code: response.status,
        codeText: response.status === 401 ? 'Unauthorised' : response.statusText,
        data: errorData.detail ? errorData.detail : 'Something went wrong'
      };
      throw error;
    });
  }
  return response.json().then((errorData: any) => {
    const error: any = {
      code: response.status,
      data: errorData
    };
    throw error;
  });
};

export const parseJSON = (response: any) => {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json();
  }
  return null;
};
