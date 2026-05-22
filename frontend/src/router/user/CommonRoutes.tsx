import { Route } from 'react-router-dom';
import Home from '@/pages/user/home/Home';

import { Fragment } from 'react/jsx-runtime';

const CommonRoutes = (
  <Fragment>
    <Route path="/" element={<Home />} />
   
  </Fragment>
);

export default CommonRoutes;
