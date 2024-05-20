import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

import { AppRoutesAdmin } from './AppRoutesAdmin';
import { AppRoutesUser } from './AppRoutesUser';
import { AuthRoutes } from './AuthRoutes';

export function Routes() {
  const { user } = useAuth();
  let admin_auth: boolean = false;
  if (user.email) {
    admin_auth = user.permissionGroup?.role === 'IS_ADMIN';
  }

  return (
    <BrowserRouter>
      {user.token ? (
        admin_auth ? (
            <AppRoutesAdmin />
        ) : (
            <AppRoutesUser />
        )
      ) : (
        <AuthRoutes />
      )}
    </BrowserRouter>
  );
}
