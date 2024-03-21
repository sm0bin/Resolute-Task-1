import React from 'react';
import useAuth from './hooks/useAuth';
import Navbar from './components/shared/Navbar';
import { Outlet } from 'react-router-dom';

const App = () => {
  const { user, loading } = useAuth();
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;