import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import PrivateRoute from './components/Auth/PrivateRoute';
import { useAuth } from './components/Auth/useAuth';

const Login = lazy(() => import("./components/Login"));
const Home = lazy(() => import("./components/Home"));
const Graphics = lazy(() => import("./components/Graphics"));
const Page404 = lazy(() => import("./404"));

export default function App() {
  const { authenticated, loading } = useAuth();
  
  if (loading) return <div>Cargando app...</div>;

  return (
    <Router>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/" element={authenticated ? <Navigate to="/home" /> : <Login />} />
          <Route path="/home" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
          />
          <Route
            path="/graphics"
            element={
              <PrivateRoute>
                <Graphics />
              </PrivateRoute>
            }
            />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
