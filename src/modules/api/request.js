/* eslint-disable prefer-promise-reject-errors */
import axios from 'axios';

import { getAuthToken } from '../../utils/storageManager';
import redirectToSignIn from '../../utils/redirectToSignIn';

import { apiConfig } from '../../config';

const { API_URL } = apiConfig;

let options = {
  headers: {
    'Content-Type': 'application/json'
  }
};

/**
 * Sends request
 * @param {String} path - path
 * @param {Boolean} withAuth - path
 * @returns {Promise} - request, resolved value is contains response.data
 */
const request = (path, withAuth = true) => {
  if (withAuth) {
    options.headers.Authorization = `Bearer ${getAuthToken()}`;
  }

  options.url = `${API_URL}${path}`;

  return new Promise((resolve, reject) => {
    axios(options)
      .then(({ data: { data, meta } }) => resolve({ data, meta }))
      .catch((error) => {
        // for timeout error do dispatch(showNetworkError(true));
        if (error.message === 'Network Error') {
          // dispatch(showNetworkError(true));
          alert('No Internet in your browser or back-end server is disconnected');
        }
        if (error.response && error.response.status === 401) {
          redirectToSignIn();
        }
        reject(error);
      });
  });
};

/**
 * Sends get request
 * @param {String} path - fetch url path
 * @param {Boolean} withAuth - set bearer token if exists
 * @param {Object | Null} headers - request headers
 * @param {Object | null} params - request query params
 * @returns {Promise} - get request
 */
export const get = (path, withAuth, headers, params) => {
  options.method = 'GET';
  options.params = {
    ...params
  };

  return request(path, withAuth);
};

/**
 * Sends post request
 * @param {String} path - fetch url path
 * @param {Object} data - request body
 * @param {Boolean} withAuth - set bearer token if exists
 * @param {Object | Null} headers - request headers
 * @param {Object | Null} configs - request options configs
 * @returns {Promise} - post request
 */
export const post = (path, data, withAuth, headers, configs) => {
  options.method = 'POST';
  options.data = data;
  options.headers = {
    ...options.headers,
    ...headers
  };
  if (configs) options = { ...options, ...configs };

  return request(path, withAuth);
};

/**
 * Send delete request
 * @param {String} path - fetch url path
 * @param {Object} data - request body
 * @param {Boolean} withAuth - set bearer token if exists
 * @param {Object | Null} headers - request headers
 * @param {Object | null} params - request query params
 * @returns {Promise} - post request
 */
export const sendDelete = (path, data, withAuth, headers, params) => {
  options.method = 'DELETE';
  options.data = data;
  options.headers = {
    ...options.headers,
    ...headers
  };
  options.params = {
    ...params
  };

  return request(path, withAuth);
};

/**
 * Sends patch request
 * @param {String} path - fetch url path
 * @param {Object} data - request body
 * @param {Boolean} withAuth - set bearer token if exists
 * @param {Object | Null} headers - request headers
 *  * @param {Object | null} params - request query params
 * @returns {Promise} - post request
 */
export const patch = (path, data, withAuth, headers, params) => {
  options.method = 'PATCH';
  options.data = data;
  options.headers = {
    ...options.headers,
    ...headers
  };
  options.params = {
    ...params
  };
  return request(path, withAuth);
};

/**
 * Sends put request
 * @param {String} path - fetch url path
 * @param {Object} data - request body
 * @param {Boolean} withAuth - set bearer token if exists
 * @param {Object | Null} headers - request headers
 * @returns {Promise} - post request
 */
export const put = (path, data, withAuth, headers) => {
  options.method = 'PUT';
  options.data = data;
  options.headers = {
    ...options.headers,
    ...headers
  };
  return request(path, withAuth);
};
export const sendPut = (path, data, withAuth, headers) => {
  options.method = 'PUT';
  options.data = data;
  options.headers = {
    ...options.headers,
    ...headers
  };
  return request(path, withAuth);
};
