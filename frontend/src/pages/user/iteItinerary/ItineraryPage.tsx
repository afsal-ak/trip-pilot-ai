import {
  useEffect,
  useState,
} from 'react';

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
    ] =
      useState(true);

    const [page, setPage] =
      useState(1);

    const [
      pagination,
      setPagination,
    ] =
      useState({
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
          <div className="mb-8">
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

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({
                length:
                  6,
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
            <div className="bg-card rounded-lg border border-border p-10 text-center">
              <h2 className="text-xl font-semibold text-foreground">
                No
                itineraries
                found
              </h2>

              <p className="text-muted-foreground mt-2">
                Generate
                your first
                itinerary
              </p>
            </div>
          ) : (
            <>
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