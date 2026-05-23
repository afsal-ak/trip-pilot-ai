import {
  useEffect,
  useState,
} from 'react';

import {
  useParams,
  Link,
} from 'react-router-dom';

import {
  Lock,
} from 'lucide-react';

import {
  getSharedItinerary,
} from '@/services/itinerary.service';

import ItineraryDetail from '@/components/itinerary/ItineraryDetail';

import type {
  Itinerary,
} from '@/types/IItinerary';

const SharedItineraryPage =
  () => {
    const {
      shareId,
    } =
      useParams();

    const [
      itinerary,
      setItinerary,
    ] =
      useState<Itinerary | null>(
        null
      );

    const [
      loading,
      setLoading,
    ] =
      useState(true);

    const [
      isPrivate,
      setIsPrivate,
    ] =
      useState(false);

    useEffect(() => {
      if (
        shareId
      ) {
        fetchShared();
      }
    }, [
      shareId,
    ]);

    const fetchShared =
      async () => {
        try {
          setLoading(
            true
          );

          const data =
            await getSharedItinerary(
              shareId!
            );

          setItinerary(
            data
          );
        } catch (
          error: any
        ) {
          console.log(
            error
          );

          if (
            error
              ?.response
              ?.status ===
            404
          ) {
            setIsPrivate(
              true
            );
          }
        } finally {
          setLoading(
            false
          );
        }
      };

    if (
      loading
    ) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      );
    }

    // Private / Invalid link UI
    if (
      isPrivate
    ) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
          <div className="max-w-md w-full bg-card border border-border rounded-3xl p-10 text-center shadow-sm">

            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-primary" />
            </div>

            <h2 className="text-2xl font-bold text-foreground">
              This trip is private
            </h2>

            <p className="text-muted-foreground mt-3 leading-6">
              You can’t access
              this itinerary.
              The owner may
              have made this
              trip private or
              the link is no
              longer valid.
            </p>

            <Link
              to="/"
              className="inline-flex mt-6 px-5 py-3 rounded-xl bg-primary text-white font-medium hover:opacity-90 transition"
            >
              Go Home
            </Link>
          </div>
        </div>
      );
    }

    if (
      !itinerary
    ) {
      return null;
    }

    return (
      <ItineraryDetail
        itinerary={
          itinerary
        }
        allowSharing={
          false
        }
      />
    );
  };

export default SharedItineraryPage;