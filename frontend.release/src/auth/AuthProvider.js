import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import roles from '../helpers/roles';

export const authContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const isLogged = () => !!user;

  const hasRole = (role) => user?.role === role;

  const login = (isAdmin, fromLocation) => {
    if (isAdmin) {
      console.log('login as admin');
      setUser({
        id: 1,
        name: 'Pusblisher',
        email: 'publisher@victoriahall.theater',
        role: roles.admin,
      });
    } else {
      console.log('login as client');
      setUser({
        id: 100,
        name: 'Pencil',
        email: 'pencil@hotmail.com',
        role: roles.client,
        isLoyalty: false,
      });
    }

    if (fromLocation) navigate(fromLocation);
  }

  const apiRequest = (method, url, data, {cbOk, cbUserError, cbAuthError, cbServerError}) => {
    // cbOk, cbUserError, cbAuthError, cbServerError
    axios[method](url, data)
      .then((response) => cbOk(response.data))
      .catch((error) => {
        console.info(error);
        if (error.response) {
          if (error.response.status === 401) {
            cbUserError(error.response.data);
          } else if (error.response.status === 400) {
            cbAuthError(error.response.data);
          } else if (error.response.status === 500) {
            cbServerError(error.response.data);
          }
        } else if (error.request) {
          console.error('AuthProvider.apiResquest: Cannot connect to server');
          console.error(error.request);
        } else {
          console.error('AuthProvider.apiResquest: Got error');
          console.error(error.message);
        }
        console.log(error.config);
      });
  }

  const logout = () => {
    setUser(null);
    console.log('logout');
  }

  const contextValue = {
    user,
    setUser,
    isLogged,
    hasRole,
    login,
    logout,
    apiRequest,
  };

  return (
    <authContext.Provider value={contextValue}>
      {children}
    </authContext.Provider>
  );
}
