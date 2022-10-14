// @flow

import React, { Suspense, useEffect } from 'react';
import { Provider } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

import landLordStore from '../../dashboards/LandLord/store';
import tenantStore from '../../dashboards/Tenant/store';
import superAdminStore from '../../dashboards/SuperAdmin/store';

import { USER_ROLES } from '../../utils/constants';

import Loading from '../../common/components/Loader/Loader';
import TOAST from '../toastManager';

const LandLord = React.lazy(() => import('../../dashboards/LandLord'));
const SuperAdmin = React.lazy(() => import('../../dashboards/SuperAdmin'));
const Tenant = React.lazy(() => import('../../dashboards/Tenant'));

type Props = {
  role: string
};

const StoredComponent = ({ store, role, Component }: Object) => (
  <Provider store={store}>
    <Suspense fallback={<Loading />}>
      <Component role={role} />
    </Suspense>
  </Provider>
);

export default ({ role }: Props) => {
  const { addToast } = useToasts();

  useEffect(() => {
    TOAST.setToastManager(addToast);
  }, []);

  const dashboardSwitcher = () => {
    switch (role) {
      case USER_ROLES.LANDLORD || USER_ROLES.PROPERTY_MANAGER:
        return <StoredComponent store={landLordStore()} Component={LandLord} role={role} />;
      case USER_ROLES.TENANT:
        return <StoredComponent store={tenantStore()} Component={Tenant} role={role} />;
      case USER_ROLES.SUPER_ADMIN:
        return <StoredComponent store={superAdminStore()} Component={SuperAdmin} role={role} />;
      default:
        return <h1>Coming Soon</h1>;
    }
  };
  return dashboardSwitcher();
};
