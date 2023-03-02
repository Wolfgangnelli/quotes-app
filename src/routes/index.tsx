import React, { useContext } from "react";
import { Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import { HomePage, NotFound } from "../pages";
import Singup from '../auth/Singup/Singup';
/* import { AuthContext } from '../auth/Auth'; */
import { useSelector } from 'react-redux';

const Routes = () => {
/*   const currentUser = useContext(AuthContext); */
  const {data} = useSelector((state: any) => state.auth);

  return (
    <RouterRoutes>
      <Route path="/" element={data ? <HomePage /> : <Navigate to='/singup' />} />
      <Route path="/singup" element={data ? <Navigate to='/' replace /> : <Singup />} />
      {/* <Route path="/login" element={currentUser ? <Navigate to='/' replace /> : <Login />} /> */}
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};

export default Routes;
