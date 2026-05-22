export interface ItineraryListDto {
  id: string;
  title: string;
  destination?: string;
  startDate?: Date;
  endDate?: Date;
  summary?: string;
  totalDays: number;
  status: string;
  createdAt: Date;
}

export interface ItineraryDetailDto {
  id: string;
  title: string;
  destination?: string;
  startDate?: Date;
  endDate?: Date;
  summary?: string;
  status: string;

  days: any[];

  travelDetails: {
    flights: any[];
    hotels: any[];
  };

  tips: string[];

  uploadedDocuments: string[];

  shareId?: string;
  isPublic: boolean;

  createdAt: Date;
}