import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Login = lazy(() => import("./components/Login"));
const Home = lazy(() => import("./components/Home"));
const Graphics = lazy(() => import("./components/Graphics"));
const Page404 = lazy(() => import("./404"));

export default function App() {
  return (
    <Router>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Graphics" element={<Graphics />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
