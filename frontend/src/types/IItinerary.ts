export interface Activity {
  time: string;
  activity: string;
  location: string;
  type:
    | 'flight'
    | 'hotel'
    | 'sightseeing'
    | 'food'
    | 'transport'
    | 'leisure';

  notes: string;
}

export interface Day {
  day: number;
  date: string;
  title: string;
  activities: Activity[];
}

export interface Flight {
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  flightNumber?: string;
}

export interface Hotel {
  name: string;
  checkIn: string;
  checkOut: string;
  location: string;
}

export interface Itinerary {
  id: string;

  title: string;
  destination?: string;

  startDate?: string;
  endDate?: string;

  summary?: string;

  totalDays?: number;

  status: string;

  createdAt: string;

  days?: Day[];

  travelDetails?: {
    flights: Flight[];
    hotels: Hotel[];
  };

  tips?: string[];

  uploadedDocuments?: string[];

  shareId?: string;

  isPublic?: boolean;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetItinerariesResponse {
  items: Itinerary[];
  pagination: Pagination;
}