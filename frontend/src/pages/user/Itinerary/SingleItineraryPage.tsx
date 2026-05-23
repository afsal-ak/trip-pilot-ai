import {
  useEffect,
  useState,
} from 'react';

import {
  useParams,
  useNavigate,
} from 'react-router-dom';

import {
} from '@/services/itinerary.service';
import {
  getSingleItinerary,

} from '@/services/itinerary.service';

import type {
  Itinerary,
} from '@/types/IItinerary';
import ItineraryDetail from '@/components/itinerary/ItineraryDetail';


const SingleItineraryPage =
  () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [itinerary, setItinerary] = useState<Itinerary | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (id) {
        fetchItinerary();
      }
    }, [id]);

    const fetchItinerary =
      async () => {
        try {
          setLoading(true);
          const data = await getSingleItinerary(id! );
          setItinerary(data );
        } catch (error) {
          console.log( error  );
        } finally {
          setLoading(false );
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
      <ItineraryDetail
        itinerary={
          itinerary!
        }
        allowSharing={
          true
        }
      />

    );
  };

export default SingleItineraryPage;