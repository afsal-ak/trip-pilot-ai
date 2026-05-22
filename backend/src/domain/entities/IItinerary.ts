import { Types } from "mongoose";

export type ActivityType =
  | "flight"
  | "hotel"
  | "sightseeing"
  | "food"
  | "transport"
  | "leisure";

export interface ICoordinates {
  lat?: number;
  lng?: number;
}

export interface IActivity {
  time?: string;
  activity: string;
  location?: string;

  type: ActivityType;

  notes?: string;

  coordinates?: ICoordinates;

  isSuggested?: boolean;
}

export interface IDay {
  day: number;
  date?: Date;
  title: string;
  activities: IActivity[];
}

export interface IFlight {
  from: string;
  to: string;

  departureTime?: string;
  arrivalTime?: string;

  flightNumber?: string;
}

export interface IHotel {
  name: string;

  checkIn?: Date;
  checkOut?: Date;

  location?: string;
}

export interface ITravelDetails {
  flights: IFlight[];
  hotels: IHotel[];
}

export interface IItinerary
  extends Document {
  _id?: Types.ObjectId | string;
  userId: Types.ObjectId;

  title: string;
  destination?: string;

  documentType: string[];

  startDate?: Date;
  endDate?: Date;

  summary?: string;

  status:
    | "generated"
    | "edited"
    | "shared";

  days: IDay[];

  travelDetails: ITravelDetails;

  tips: string[];

  extractedText?: string;

  rawAiResponse?: string;

  uploadedDocuments: string[];

  shareId?: string;

  isPublic: boolean;

  createdAt: Date;
  updatedAt: Date;
}
