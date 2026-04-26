import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export default function PrivateRoute({ children }) {
  const { authenticated, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  return authenticated ? children : <Navigate to="/" />;
}