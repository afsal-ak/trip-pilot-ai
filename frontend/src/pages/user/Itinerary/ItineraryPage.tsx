import {
  useEffect,
  useState,
} from 'react';

import { Link } from 'react-router-dom';

import {
  getAllItineraries,
} from '@/services/itinerary.service';

import type {
  GetItinerariesResponse,
  Itinerary,
} from '@/types/IItinerary';

import ItineraryCard from '@/components/itinerary/ItineraryCard';
import Pagination from '@/components/itinerary/Pagination';
import ItineraryCardSkeleton from '@/components/itinerary/ItineraryCardSkeleton';

const ItineraryPage =
  () => {
    const [
      itineraries,
      setItineraries,
    ] = useState<
      Itinerary[]
    >([]);

    const [
      loading,
      setLoading,
    ] = useState(true);

    const [page, setPage] =
      useState(1);

    const [
      pagination,
      setPagination,
    ] = useState({
      totalPages: 1,
    });

    useEffect(() => {
      fetchItineraries();
    }, [page]);

    const fetchItineraries =
      async () => {
        try {
          setLoading(
            true
          );

          const data: GetItinerariesResponse =
            await getAllItineraries(
              page,
              6
            );

          setItineraries(
            data.items
          );

          setPagination(
            data.pagination
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

    return (
      <div className="min-h-screen bg-background px-4 py-10 font-poppins">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-primary">
                My
                Itineraries
              </h1>

              <p className="text-muted-foreground mt-2">
                View your
                AI-generated
                travel
                itineraries
              </p>
            </div>

            <Link
              to="/generate"
            >
              <button className="bg-primary hover:bg-secondary text-white px-6 py-3 rounded-xl font-medium transition shadow-md hover:shadow-lg">
                + Generate
                Trip
              </button>
            </Link>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({
                length: 6,
              }).map(
                (
                  _,
                  index
                ) => (
                  <ItineraryCardSkeleton
                    key={
                      index
                    }
                  />
                )
              )}
            </div>
          ) : itineraries.length ===
            0 ? (
            
            /* Empty State */
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="bg-card border border-border rounded-3xl p-10 text-center max-w-md w-full shadow-lg">
                <h2 className="text-2xl font-semibold text-foreground">
                  No
                  Itineraries
                  Found
                </h2>

                <p className="text-muted-foreground mt-3">
                  You
                  haven’t
                  created any
                  trips yet.
                  Start
                  planning
                  your next
                  adventure.
                </p>

                <Link
                  to="/generate"
                >
                  <button className="mt-6 bg-primary hover:bg-secondary text-white px-6 py-3 rounded-xl font-medium transition">
                    Generate
                    Your First
                    Trip
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {itineraries.map(
                  (
                    itinerary
                  ) => (
                    <ItineraryCard
                      key={
                        itinerary.id
                      }
                      itinerary={
                        itinerary
                      }
                    />
                  )
                )}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={
                  page
                }
                totalPages={
                  pagination.totalPages
                }
                onPageChange={
                  setPage
                }
              />
            </>
          )}
        </div>
      </div>
    );
  };

export default ItineraryPage;