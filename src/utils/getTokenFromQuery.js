
import { setAuthToken } from './storageManager';

/**
   * find token from queryparams, and set it to the state,
   * @param {Object} location - router's location proeprty
   * @returns {String | Null} -
   */
export default (location) => {
  const queryParams = new URLSearchParams(location.search);
  const authToken = queryParams.get('fs_token');
  if (authToken) {
    setAuthToken(authToken);
    return authToken;
  }

  return null;
};
