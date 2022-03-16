import { useContext } from 'react';
import { authContext } from './AuthProvider';

export default function useAuth() {
  const contextValue = useContext(authContext);
  return contextValue;
}