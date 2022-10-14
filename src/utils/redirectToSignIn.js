// @flow

import { appsConfig } from '../config';
import { removeAuthToken } from './storageManager';

/**
 * remove token from local storage and redirect to login
 * @returns {Undefined} -
 */
export default () => {
  removeAuthToken();
  console.log('auth token removed');
  window.location.href = appsConfig.LANDING_PAGE_URL.LOGIN;
};
