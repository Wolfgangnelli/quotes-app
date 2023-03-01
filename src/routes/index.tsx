import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import { HomePage, NotFound } from "../pages";
import Singup from '../auth/Singup/Singup';

const Routes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<HomePage />} />
      <Route path="/singup" element={<Singup />} />
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};

export default Routes;
