import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '@/redux/store';

const UserProtectedRoutes = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.userAuth);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default UserProtectedRoutes;
