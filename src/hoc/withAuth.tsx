import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const WithAuth = (WrappedComponent: any) => {
  const Authenticate = (props: any) => {
    const [isValidUser, setValidUser] = useState(false);
    const history = useHistory();
    useEffect(() => {
      localStorage.getItem('TOKEN') ? setValidUser(true) : history.push('/login');
    }, [history]);
    return <div>{isValidUser ? <WrappedComponent {...props} /> : null}</div>;
  };

  return Authenticate;
};

export default WithAuth;
