import { Route } from 'react-router-dom';
import Home from '@/pages/user/home/Home';

import { Fragment } from 'react/jsx-runtime';
import SharedItineraryPage from '@/pages/user/Itinerary/SharedItineraryPage';

const CommonRoutes = (
  <Fragment>
    <Route path="/" element={<Home />} />
          <Route path="/share/:shareId"element={ <SharedItineraryPage/>  } />

  </Fragment>
);

export default CommonRoutes;
