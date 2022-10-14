/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */

import React, {
  useEffect, useReducer, useState, useContext, memo
} from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import globalConnect from '../../utils/connectToDefaultStore';

import { get } from '../api/request';

import { , setAuthToken, getAuthToken } from '../../utils/storageManager';
import redirectToSignIn from '../../utils/redirectToSignIn';

/**  COMPONENTS  */
import Loader from '../../common/components/Loader/Loader';

import { ACTION_STATUSES } from '../../utils/constants';

import { setUser as setUserAction, attemptToFetchUser } from '../../common/actions/authActions';

import {
  userSelector,
  userFetchStatusSelector,
  userFetchErrorSelector
} from '../../common/selectors/authSelectors';

type Props = {
  rest: {
      location: {
      search: string
    }
  },
  user: ?Object,
  fetchedStatus: ?string,
  fetchedError: ?string,
  fetchUser: Function
};

/**
 * Specify Dashboard according to user reole and initialize dashbord
 * @param {Function} dispatch - action dispatcher
 * @returns {React.Hook} - Container component
 */
function DashboardInitializer({
  fetchUser, user, fetchedStatus, fetchedError, ...rest
}: Props) {
  const [token, setToken] = useState(null);
  const tokenFromStore = getAuthToken();

  useEffect(() => {
    if (!tokenFromStore && !user) {
      const tokenfromQuery = getTokenFromQuery();
      if (!tokenfromQuery && !user) {
        return redirectToSignIn();
      }
      setAuthToken(tokenfromQuery);
      setToken(tokenfromQuery);
    } else setToken(tokenFromStore);
  }, [user]);

  useEffect(() => {
    if (token && !user) fetchUser();
  }, [token, user]);

  useEffect(() => {
    if (fetchedStatus === ACTION_STATUSES.FAILED) {
      redirectToSignIn();
    }
  }, [fetchedStatus]);

  /**
   * find token from queryparams, and set it to the state,
   *   if not exists redirect to landing page url login  http://54.145.229.75:4000
   * @returns {String | Null} -
   */
  const getTokenFromQuery = () => {
    const queryParams = new URLSearchParams(rest.location.search);
    const authToken = queryParams.get('token');
    return authToken;
  };

  return (
    <>
      {fetchedStatus === ACTION_STATUSES.PENDING && <p> Please wait ... </p>}
      {fetchedStatus === ACTION_STATUSES.SUCCEED && user.role.name && (
        <Redirect to="/" />
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  user: userSelector(state),
  fetchedStatus: userFetchStatusSelector(state),
  fetchedError: userFetchStatusSelector(state)
});

const mapDispatchToProps = dispatch => ({
  fetchUser: () => { dispatch(attemptToFetchUser()); }
});

export default globalConnect(mapStateToProps, mapDispatchToProps)(withRouter(DashboardInitializer));
