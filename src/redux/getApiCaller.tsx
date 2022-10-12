import fetch from 'cross-fetch';
import { checkStatus, parseJSON } from '../utils/responseHandler';

const URL = process.env.REACT_APP_BASE_URL;

// Make an api call
const async = (url: string, method = 'get', authorization: boolean) => {
  let headers = {};
  if (authorization) {
    headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('TOKEN')}`
    };
  } else {
    headers = {
      'Content-Type': 'application/json'
    };
  }
  return fetch(`${URL}${url}`, {
    method,
    headers
  })
    .then(checkStatus)
    .then(parseJSON)
    .catch((error) => {
      throw error;
    });
};
export default async;
