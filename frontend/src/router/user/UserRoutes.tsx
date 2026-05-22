import { Routes, Route } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import CommonRoutes from './CommonRoutes';
// import ProtectedRoutes from './ProtectedRoutes';
import UserLayout from '@/layouts/UserLayout';
import NotFoundPage from '@/components/NotFoundPage';
import Home from '@/pages/user/home/Home';
import ProtectedRoutes from './ProtectedRoutes';
 const UserRoutes = () => {
  return (
    <Routes>
      {PublicRoutes}

      <Route element={<UserLayout />}>
        {CommonRoutes}
    <Route path="/home" element={<Home />} />

        {ProtectedRoutes}
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default UserRoutes;
