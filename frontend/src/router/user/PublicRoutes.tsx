import { Fragment } from 'react';
import { Route } from 'react-router-dom';
import RedirectIfAuth from './RedirectIfAuth ';
import Signup from '@/pages/user/auth/Signup';
import Login from '@/pages/user/auth/Login';

const publicRoutes = (
  <Fragment>
    <Route path="/signup" element={<Signup />} />
    <Route
      path="/login"
      element={
        <RedirectIfAuth>
          <Login />
        </RedirectIfAuth>
      }
    />
  </Fragment>
);

export default publicRoutes;
