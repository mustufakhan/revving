import fetch from 'cross-fetch';
import { checkStatus, parseJSON } from '../utils/responseHandler';

const URL = process.env.REACT_APP_BASE_URL;

// Make an api call
export default function async(
  url: any,
  method = 'post',
  body: any,
  autherization: any,
  isFormData: boolean
) {
  let headers = {};
  if (autherization && !isFormData) {
    headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('TOKEN')}`
    };
  } else if (autherization && isFormData) {
    headers = {
      Authorization: `Bearer ${localStorage.getItem('TOKEN')}`
    };
  } else {
    headers = {
      'Content-Type': 'application/json'
    };
  }
  return fetch(`${URL}${url}`, {
    method,
    body: isFormData ? body : JSON.stringify(body),
    headers,
    redirect: 'follow'
  })
    .then(checkStatus)
    .then(parseJSON)
    .catch((error) => {
      throw error;
    });
}
