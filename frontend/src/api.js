import axios from 'axios';
import queryString from 'query-string';


const getStoredAuthToken = () => {
  /*
  TODO: no auth yet
   */
  return "n/a"
}


const removeStoredAuthToken = () => {
  /*
  TODO: to be implemented
   */
}

export const objectToQueryString = (obj, options = {}) =>
  queryString.stringify(obj, {
    arrayFormat: 'bracket',
    ...options,
  });


const defaults = {
  baseURL: process.env.API_URL || 'http://localhost:8000/api/v1',
  headers: () => ({
    'Content-Type': 'application/json',
    Authorization: getStoredAuthToken() ? `Bearer ${getStoredAuthToken()}` : undefined,
  }),
  error: {
    code: 'INTERNAL_ERROR',
    message: 'Something went wrong. Please check your internet connection or contact our support.',
    status: 503,
    data: {},
  },
};

/*
Return a promise for useEffect
 */
const request = (method, url, variables) =>
  new Promise((resolve, reject) => {
    axios({
      url: `${defaults.baseURL}${url}`,
      method,
      headers: defaults.headers(),
      params: method === 'get' ? variables : undefined,
      data: method !== 'get' ? variables : undefined,
      paramsSerializer: objectToQueryString,
    }).then(
      response => {
        resolve(response.data);
      },
      error => {
        if (error.response) {
          if (error.response.data.error.code === 'INVALID_TOKEN') {
            removeStoredAuthToken();
          } else {
            reject(error.response.data.error);
          }
        } else {
          reject(defaults.error);
        }
      },
    );
  });

export default {
  get: (...args) => request('get', ...args),
  post: (...args) => request('post', ...args),
  put: (...args) => request('put', ...args),
  delete: (...args) => request('delete', ...args),
};

