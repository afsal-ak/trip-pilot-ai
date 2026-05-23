import type { Itinerary } from '@/types/IItinerary';
import { CalendarDays, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
 
interface Props {
  itinerary: Itinerary;
}

const ItineraryCard = ({
  itinerary,
}: Props) => {
  const navigate =
    useNavigate();

  return (
    <div
      onClick={() =>
        navigate(
          `/itinerary/${itinerary.id}`
        )
      }
      className="bg-card border border-border rounded-lg p-5 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            {itinerary.title}
          </h2>

          <div className="flex items-center gap-1 text-muted-foreground text-sm mt-2">
            <MapPin
              size={16}
            />
            <span>
              {itinerary.destination ||
                'Unknown Destination'}
            </span>
          </div>
        </div>

        <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium capitalize">
          {itinerary.status}
        </span>
      </div>

      <p className="text-muted-foreground text-sm mt-4 line-clamp-2">
        {itinerary.summary}
      </p>

      <div className="flex items-center justify-between mt-5 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <CalendarDays
            size={16}
          />

          <span>
            {itinerary.totalDays}{' '}
            Days
          </span>
        </div>

        <span>
          {new Date(
            itinerary.createdAt
          ).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default ItineraryCard;