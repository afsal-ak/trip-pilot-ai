export const AUTH_ROUTES = {
  REFRESH_TOKEN: '/refresh-token',
  REGISTER: '/register',
  LOGIN: '/login',
  LOGOUT: '/logout',

};


export const ITINERARY_ROUTES =
  {
    GENERATE:'/generate',
    GET_USER_ITINERARIES: '/itineraries',
    GET_SINGLE_ITINERARY: '/itineraries/:id',
    TOGGLE_PUBLIC_STATUS:'/itineraries/:id/public',
    GET_SHARED_ITINERARY:'/public/itinerary/:shareId',
  };



