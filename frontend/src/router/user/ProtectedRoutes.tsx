import { Route } from 'react-router-dom';
import UserProtectedRoutes from './UserProtectedRoute';
import Home from '@/pages/user/home/Home';

import UploadPage from '@/pages/user/home/UploadPage';
const ProtectedRoutes = (
  <Route element={<UserProtectedRoutes />}>
    <Route path="/home" element={<Home />} />
    <Route path="/upload" element={<UploadPage />} />
   
  </Route>
);
export default ProtectedRoutes;
