import {
  useEffect,
  useState,
} from 'react';

import {
  useParams,
  useNavigate,
} from 'react-router-dom';

import {
  ArrowLeft,
  Calendar,
  MapPin,
  Plane,
  Hotel,
  Lightbulb,
  Clock3,
} from 'lucide-react';

import {
  getSingleItinerary,
} from '@/services/itinerary.service';

import type {
  Itinerary,
} from '@/types/IItinerary';

const activityColors: Record<
  string,
  string
> = {
  flight:
    'bg-blue-100 text-blue-700',
  hotel:
    'bg-emerald-100 text-emerald-700',
  sightseeing:
    'bg-violet-100 text-violet-700',
  food:
    'bg-orange-100 text-orange-700',
  transport:
    'bg-cyan-100 text-cyan-700',
  leisure:
    'bg-pink-100 text-pink-700',
};
const formatDateTime = (
  dateString?: string
) => {
  if (!dateString)
    return 'N/A';

  return new Date(
    dateString
  ).toLocaleString(
    'en-IN',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }
  );
};

const formatDate = (
  dateString?: string
) => {
  if (!dateString)
    return 'N/A';

  return new Date(
    dateString
  ).toLocaleDateString(
    'en-IN',
    {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }
  );
};
const SingleItineraryPage =
  () => {
    const { id } =useParams();
    const navigate = useNavigate();

    const [itinerary, setItinerary] =useState<Itinerary | null>( null);

    const [loading,setLoading] = useState(true);

    useEffect(() => {
      if (id) {
        fetchItinerary();
      }
    }, [id]);

    const fetchItinerary =
      async () => {
        try {
          setLoading(
            true
          );

          const data =
            await getSingleItinerary(
              id!
            );

          setItinerary(
            data
          );
        } catch (
          error
        ) {
          console.log(
            error
          );
        } finally {
          setLoading(
            false
          );
        }
      };

    if (loading) {
      return (
        <div className="min-h-screen bg-background p-6 animate-pulse">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="h-48 rounded-lg bg-muted" />

            <div className="grid md:grid-cols-2 gap-5">
              <div className="h-44 rounded-lg bg-muted" />
              <div className="h-44 rounded-lg bg-muted" />
            </div>

            <div className="h-96 rounded-lg bg-muted" />
          </div>
        </div>
      );
    }

    if (!itinerary) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="bg-card border border-border rounded-lg p-10 text-center">
            <h2 className="text-2xl font-semibold text-foreground">
              Itinerary
              not found
            </h2>

            <button
              onClick={() =>
                navigate(
                  '/itineraries'
                )
              }
              className="mt-4 bg-primary text-white px-5 py-2 rounded-md"
            >
              Back
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background font-poppins">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Back */}
          <button
            onClick={() =>
              navigate(
                '/itineraries'
              )
            }
            className="flex items-center gap-2 text-primary mb-6 hover:opacity-80"
          >
            <ArrowLeft
              size={18}
            />
            Back
          </button>

          {/* Hero */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-[20px] p-8 text-white shadow-lg">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div>
                <h1 className="text-4xl font-bold">
                  {
                    itinerary.title
                  }
                </h1>

                <div className="flex items-center gap-2 mt-4 text-white/90">
                  <MapPin
                    size={18}
                  />

                  <span>
                    {itinerary.destination ||
                      'Unknown Destination'}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-3 text-white/90">
                  <Calendar
                    size={18}
                  />

                  <span>
                    {itinerary.startDate &&
                      new Date(
                        itinerary.startDate
                      ).toLocaleDateString()}

                    {' - '}

                    {itinerary.endDate &&
                      new Date(
                        itinerary.endDate
                      ).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-5 min-w-[220px]">
                <p className="text-sm text-white/80">
                  Trip Summary
                </p>

                <p className="mt-2 text-sm leading-6">
                  {
                    itinerary.summary
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Flights + Hotels */}
          <div className="grid xl:grid-cols-2 gap-6 mt-8">
  {/* Flights */}
  <div className="bg-card rounded-[20px] border border-border p-6 shadow-sm">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 p-3 rounded-full">
          <Plane className="text-primary w-5 h-5" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Flight Details
          </h2>

          <p className="text-sm text-muted-foreground">
            Your booked flights
          </p>
        </div>
      </div>
    </div>

    {itinerary
      .travelDetails
      ?.flights
      ?.length ? (
      <div className="space-y-5">
        {itinerary.travelDetails.flights.map(
          (
            flight,
            index
          ) => (
            <div
              key={index}
              className="bg-muted rounded-2xl p-5 border border-border hover:shadow-md transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
                    <span>
                      {
                        flight.from
                      }
                    </span>

                    <Plane className="w-4 h-4 text-primary rotate-90" />

                    <span>
                      {
                        flight.to
                      }
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mt-1">
                    Flight No:{' '}
                    {
                      flight.flightNumber ||
                      'N/A'
                    }
                  </p>
                </div>

                <div className="text-sm text-right">
                  <p className="font-medium text-foreground">
                    Departure
                  </p>

                  <p className="text-muted-foreground">
                    {formatDateTime(
                      flight.departureTime
                    )}
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    ) : (
      <div className="bg-muted rounded-2xl p-8 text-center border border-border">
        <Plane className="mx-auto text-muted-foreground mb-3" />

        <p className="font-medium text-foreground">
          No Flights Found
        </p>

        <p className="text-sm text-muted-foreground mt-1">
          Flight details are not available for this trip
        </p>
      </div>
    )}
  </div>

  {/* Hotels */}
  <div className="bg-card rounded-[20px] border border-border p-6 shadow-sm">
    <div className="flex items-center gap-3 mb-6">
      <div className="bg-secondary/10 p-3 rounded-full">
        <Hotel className="text-secondary w-5 h-5" />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Hotel Stay
        </h2>

        <p className="text-sm text-muted-foreground">
          Accommodation details
        </p>
      </div>
    </div>

    {itinerary
      .travelDetails
      ?.hotels
      ?.length ? (
      <div className="space-y-5">
        {itinerary.travelDetails.hotels.map(
          (
            hotel,
            index
          ) => {
            const nights =
              Math.ceil(
                (
                  new Date(
                    hotel.checkOut
                  ).getTime() -
                  new Date(
                    hotel.checkIn
                  ).getTime()
                ) /
                  (
                    1000 *
                    60 *
                    60 *
                    24
                  )
              );

            return (
              <div
                key={
                  index
                }
                className="bg-muted rounded-2xl p-5 border border-border hover:shadow-md transition"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {
                        hotel.name
                      }
                    </h3>

                    <p className="text-muted-foreground flex items-center gap-2 mt-2">
                      <MapPin size={16} />
                      {
                        hotel.location
                      }
                    </p>

                    <span className="inline-block mt-3 bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
                      {
                        nights
                      }{' '}
                      Nights
                    </span>
                  </div>

                  <div className="space-y-3 min-w-[220px]">
                    <div className="bg-card rounded-xl p-3 border border-border">
                      <p className="text-xs text-muted-foreground">
                        Check-in
                      </p>

                      <p className="font-medium text-foreground mt-1">
                        {formatDate(
                          hotel.checkIn
                        )}
                      </p>
                    </div>

                    <div className="bg-card rounded-xl p-3 border border-border">
                      <p className="text-xs text-muted-foreground">
                        Check-out
                      </p>

                      <p className="font-medium text-foreground mt-1">
                        {formatDate(
                          hotel.checkOut
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    ) : (
      <div className="bg-muted rounded-2xl p-8 text-center border border-border">
        <Hotel className="mx-auto text-muted-foreground mb-3" />

        <p className="font-medium text-foreground">
          No Hotels Found
        </p>

        <p className="text-sm text-muted-foreground mt-1">
          Hotel booking details are unavailable
        </p>
      </div>
    )}
  </div>
</div>

          {/* Timeline */}
          <div className="mt-8 bg-card border border-border rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-foreground mb-8">
              Day-wise
              Itinerary
            </h2>

            <div className="space-y-8">
              {itinerary.days?.map(
                (day) => (
                  <div
                    key={
                      day.day
                    }
                    className="relative border-l-2 border-primary pl-6"
                  >
                    <div className="absolute -left-[11px] top-1 w-5 h-5 bg-primary rounded-full" />

                    <h3 className="text-xl font-semibold text-foreground">
                      Day{' '}
                      {
                        day.day
                      }{' '}
                      —{' '}
                      {
                        day.title
                      }
                    </h3>

                    <p className="text-muted-foreground text-sm mt-1">
                      {
                        day.date
                      }
                    </p>

                    <div className="space-y-4 mt-5">
                      {day.activities.map(
                        (
                          activity,
                          index
                        ) => (
                          <div
                            key={
                              index
                            }
                            className="bg-muted rounded-lg p-4"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                  <Clock3
                                    size={
                                      14
                                    }
                                  />
                                  {
                                    activity.time
                                  }
                                </div>

                                <h4 className="font-medium text-foreground">
                                  {
                                    activity.activity
                                  }
                                </h4>

                                <p className="text-sm text-muted-foreground mt-1">
                                  {
                                    activity.location
                                  }
                                </p>

                                {activity.notes && (
                                  <p className="text-sm mt-2 text-foreground">
                                    {
                                      activity.notes
                                    }
                                  </p>
                                )}
                              </div>

                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                                  activityColors[
                                    activity.type
                                  ]
                                }`}
                              >
                                {
                                  activity.type
                                }
                              </span>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Tips */}
          {itinerary.tips
            ?.length ? (
            <div className="mt-8 bg-card border border-border rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <Lightbulb className="text-primary" />

                <h2 className="text-xl font-semibold text-foreground">
                  Travel
                  Tips
                </h2>
              </div>

              <ul className="space-y-3">
                {itinerary.tips.map(
                  (
                    tip,
                    index
                  ) => (
                    <li
                      key={
                        index
                      }
                      className="bg-muted p-4 rounded-lg text-foreground"
                    >
                      • {tip}
                    </li>
                  )
                )}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

export default SingleItineraryPage;