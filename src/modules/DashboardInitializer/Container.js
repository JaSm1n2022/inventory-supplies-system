/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */

import React, {
  useEffect, useState
} from 'react';
import { withRouter } from 'react-router-dom';
import { ToastProvider, DefaultToastContainer } from 'react-toast-notifications';
import globalConnect from '../../utils/connectToDefaultStore';

import { setAuthToken, getAuthToken } from '../../utils/storageManager';
import redirectToSignIn from '../../utils/redirectToSignIn';

/**  COMPONENTS  */
import Loader from '../../common/components/Loader/DualRingLoader';

import DashboardsSwitcher from './DashboardSwitcher';

import { ACTION_STATUSES } from '../../utils/constants';

import { attemptToFetchUser } from '../../common/actions/authActions';

import {
  userSelector,
  userFetchStatusSelector
} from '../../common/selectors/authSelectors';
import TOAST from '../toastManager';

type Props = {
  rest: {
      location: {
      search: string
    }
  },
  user: ?Object,
  fetchedStatus: ?string,
  fetchedError: ?string,
  fetchUser: Function,
  history: Object
};

export const CustomToastContainer = props => (
  // eslint-disable-next-line
  <DefaultToastContainer {...props} style={{ zIndex: 9999 }} />
);

/**
 * Specify Dashboard according to user reole and initialize dashbord
 * @param {Function} dispatch - action dispatcher
 * @returns {React.Hook} - Container component
 */
function DashboardInitializer({
  fetchUser,
  user,
  fetchedStatus,
  fetchedError,
  history,
  ...rest
}: Props) {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const tokenFromStore = getAuthToken();
    if (!tokenFromStore && !user) {
      const tokenFromQuery = getTokenFromQuery();
      if (!tokenFromQuery && !user) {
        return redirectToSignIn();
      }
      setAuthToken(tokenFromQuery);
      setToken(tokenFromQuery);
      history.push('/');
    } else setToken(tokenFromStore);
  }, [user]);

  useEffect(() => {
    if (token && !user) fetchUser();
  }, [token, user]);

  useEffect(() => {
    if (user) {
      setRole(user.role.name);
    }
  }, [user]);

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
    return queryParams.get('token');
  };

  return (
    <>
      {fetchedStatus === ACTION_STATUSES.PENDING && <Loader />}
      {fetchedStatus === ACTION_STATUSES.SUCCEED && role && (
        <ToastProvider components={{ ToastContainer: CustomToastContainer }}>
          <DashboardsSwitcher
            role={role}
          />
        </ToastProvider>
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

export default globalConnect(
  mapStateToProps,
  mapDispatchToProps
)(
  withRouter(DashboardInitializer)
);
