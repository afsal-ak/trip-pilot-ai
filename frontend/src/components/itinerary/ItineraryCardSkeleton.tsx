const ItineraryCardSkeleton =
  () => {
    return (
      <div className="bg-card border border-border rounded-lg p-5 animate-pulse">
        <div className="h-6 bg-muted rounded w-2/3 mb-4" />

        <div className="h-4 bg-muted rounded w-1/2 mb-4" />

        <div className="h-4 bg-muted rounded w-full mb-2" />

        <div className="h-4 bg-muted rounded w-4/5 mb-5" />

        <div className="flex justify-between">
          <div className="h-4 bg-muted rounded w-20" />

          <div className="h-4 bg-muted rounded w-24" />
        </div>
      </div>
    );
  };

export default ItineraryCardSkeleton;