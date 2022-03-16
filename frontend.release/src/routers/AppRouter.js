import {
  Routes,
  Route,
} from 'react-router-dom';
// Custom routes
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// Custom layouts
import Layout from '../components/layouts/Layout';

// Custom public pages
import HomePage from '../pages/HomePage';
import NoFoundPage from '../pages/NoFountPage';
import LoginPage from '../pages/LoginPage';
// Custom private pages
import ProfilePage from '../pages/ProfilePage';
import ReservingPage from '../pages/reserving/ReservingPage'
// Custom admin pages
import SettingsPage from '../pages/admin/SettingsPage';
import routes from '../helpers/routes';
import roles from '../helpers/roles';

export default function AppRouter() {
  return (
    <Layout>
      <Routes>
        <Route exact path={routes.home} element={<HomePage />} />
        <Route exact path={routes.login} element={<PublicRoute><LoginPage/></PublicRoute>}/>
        <Route exact path={routes.profile} element={<PrivateRoute><ProfilePage/></PrivateRoute>} />
        <Route exact path={routes.settings} element={<PrivateRoute hasRole={roles.admin}><SettingsPage/></PrivateRoute>} />
        <Route exact path={routes.reserving} element={<PrivateRoute hasRole={roles.client}><ReservingPage/></PrivateRoute>} />

        <Route path="*" element={NoFoundPage()} />
      </Routes>
    </Layout>
  );
}