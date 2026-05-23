import { Route } from 'react-router-dom';
import UserProtectedRoutes from './UserProtectedRoute';
import Home from '@/pages/user/home/Home';

import UploadPage from '@/pages/user/home/UploadPage';
import SingleItineraryPage from '@/pages/user/iteItinerary/SingleItineraryPage';
import ItineraryPage from '@/pages/user/iteItinerary/ItineraryPage';
const ProtectedRoutes = (
  <Route element={<UserProtectedRoutes />}>
    <Route path="/home" element={<Home />} />
    <Route path="/upload" element={<UploadPage />} />

   <Route path="/itineraries"element={ <ItineraryPage />  } /> 

   <Route path="/itinerary/:id"element={ <SingleItineraryPage/>  } />

  </Route>
);
export default ProtectedRoutes;
