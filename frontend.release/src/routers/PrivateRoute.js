import useAuth from '../auth/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import routes from '../helpers/routes';

export default function PrivateRoute({ hasRole: role, children }) {
  const { isLogged, hasRole } = useAuth();
  const location = useLocation();

  // If it is not logged, then go to the login page to get be logged
  if (!isLogged()) {
    return (
      <Navigate
        to={{ pathname: routes.login }}
        state={{ from: location }}
      />
    );
  }

  // If the user role doesnot match, go th gome
  if (role && !hasRole(role)) {
    return <Navigate to={routes.home} />;
  }

  return children;
}
