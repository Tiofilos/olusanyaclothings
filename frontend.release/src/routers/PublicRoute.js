import useAuth from '../auth/useAuth';
import { Navigate } from 'react-router-dom';
import routes from '../helpers/routes';

export default function PublicRoute({ children }) {
  const { isLogged } = useAuth();

  // If it is logged, then go to home
  if (isLogged()) return <Navigate to={routes.home}/>;

  return children;
}
