import mongoose, { Schema} from "mongoose";
import { IActivity, ICoordinates, IDay, IFlight, IHotel, IItinerary } from "../../domain/entities/IItinerary";

/* --------------------------
   SUB SCHEMAS
--------------------------- */

const CoordinateSchema =
  new Schema<ICoordinates>(
    {
      lat: Number,
      lng: Number,
    },
    { _id: false }
  );

const ActivitySchema =
  new Schema<IActivity>(
    {
      time: {
        type: String,
      },

      activity: {
        type: String,
        required: true,
        trim: true,
      },

      location: {
        type: String,
        trim: true,
      },

      type: {
        type: String,
        enum: [
          "flight",
          "hotel",
          "sightseeing",
          "food",
          "transport",
          "leisure",
        ],
        required: true,
      },

      notes: {
        type: String,
        trim: true,
      },

      coordinates:
        CoordinateSchema,

      isSuggested: {
        type: Boolean,
        default: false,
      },
    },
    {
      _id: false,
    }
  );

const DaySchema =
  new Schema<IDay>(
    {
      day: {
        type: Number,
        required: true,
      },

      date: {
        type: Date,
      },

      title: {
        type: String,
        required: true,
        trim: true,
      },

      activities: [
        ActivitySchema,
      ],
    },
    {
      _id: false,
    }
  );

const FlightSchema =
  new Schema<IFlight>(
    {
      from: {
        type: String,
        trim: true,
      },

      to: {
        type: String,
        trim: true,
      },

      departureTime: {
        type: String,
      },

      arrivalTime: {
        type: String,
      },

      flightNumber: {
        type: String,
        trim: true,
      },
    },
    {
      _id: false,
    }
  );

const HotelSchema =
  new Schema<IHotel>(
    {
      name: {
        type: String,
        trim: true,
      },

      checkIn: {
        type: Date,
      },

      checkOut: {
        type: Date,
      },

      location: {
        type: String,
        trim: true,
      },
    },
    {
      _id: false,
    }
  );

/* --------------------------
   MAIN SCHEMA
--------------------------- */

const itinerarySchema =
  new Schema<IItinerary>(
    {
      userId: {
        type:
          Schema.Types
            .ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      title: {
        type: String,
        required: true,
        trim: true,
      },

      destination: {
        type: String,
        trim: true,
      },

      documentType: [
        {
          type: String,
          enum: [
            "flight",
"hotel",
"sightseeing",
"food",
"transport",
"leisure"
          ],
        },
      ],

      startDate: {
        type: Date,
      },

      endDate: {
        type: Date,
      },

      summary: {
        type: String,
        trim: true,
      },

      status: {
        type: String,
        enum: [
          "generated",
          "edited",
          "shared",
        ],
        default:
          "generated",
      },

      days: [
        DaySchema,
      ],

      travelDetails: {
        flights: [
          FlightSchema,
        ],

        hotels: [
          HotelSchema,
        ],
      },

      tips: [
        {
          type: String,
          trim: true,
        },
      ],

      extractedText: {
        type: String,
      },

      rawAiResponse: {
        type: String,
      },

      uploadedDocuments: [
          {
            type: String,
          },
        ],

      shareId: {
        type: String,
        unique: true,
        sparse: true,
        index: true,
      },

      isPublic: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
  );

/* --------------------------
   INDEXES
--------------------------- */

itinerarySchema.index({
  userId: 1,
  createdAt: -1,
});


/* --------------------------
   MODEL
--------------------------- */

const ItineraryModel =
  mongoose.model<IItinerary>(
    "Itinerary",
    itinerarySchema
  );

export default ItineraryModel;