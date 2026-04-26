import { useState, useEffect } from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { isAuthenticated } from './components/Auth/Auth';

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const respuesta = await isAuthenticated();
      console.log("respuesta", respuesta);
      setAuthenticated(respuesta);
      setLoading(false);
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated , loading}}>
      {children}
    </AuthContext.Provider>
  );
}