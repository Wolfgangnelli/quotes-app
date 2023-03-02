import { Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import { HomePage, NotFound, Profile } from "../pages";
import { Singup, Login } from '../auth';
import { useSelector } from 'react-redux';
import { StoreStateType } from '../utilis/types';

const Routes = () => {

  const { isLoggedIn } = useSelector((state: StoreStateType) => state.auth);

  return (
    <RouterRoutes>
      <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to='/singup' />} />
      <Route path="/singup" element={isLoggedIn ? <Navigate to='/' /> : <Singup />} />
      <Route path="/login" element={isLoggedIn ? <Navigate to='/' /> : <Login />} />
      <Route path="/profile" element={isLoggedIn ?  <Profile /> : <Navigate to='/singup' />} />
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};

export default Routes;
