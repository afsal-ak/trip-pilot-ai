import { Route } from 'react-router-dom';
import UserProtectedRoutes from './UserProtectedRoute';
import Home from '@/pages/user/home/Home';

import UploadPage from '@/pages/user/Itinerary/GenerateItineraryPage';
import SingleItineraryPage from '@/pages/user/Itinerary/SingleItineraryPage';
import ItineraryPage from '@/pages/user/Itinerary/ItineraryPage';

const ProtectedRoutes = (
  <Route element={<UserProtectedRoutes />}>
    <Route path="/home" element={<Home />} />
    <Route path="/upload" element={<UploadPage />} />

   <Route path="/itineraries"element={ <ItineraryPage />  } /> 

   <Route path="/itinerary/:id"element={ <SingleItineraryPage/>  } />
   </Route>
);
export default ProtectedRoutes;
