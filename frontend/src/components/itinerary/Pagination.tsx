interface Props {
  currentPage: number;
  totalPages: number;

  onPageChange: (
    page: number
  ) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  return (
    <div className="flex justify-center gap-2 mt-10 flex-wrap">
      {Array.from(
        {
          length:
            totalPages,
        },
        (_, index) => (
          <button
            key={index}
            onClick={() =>
              onPageChange(
                index + 1
              )
            }
            className={`w-10 h-10 rounded-md font-medium transition ${
              currentPage ===
              index + 1
                ? 'bg-primary text-white'
                : 'bg-card border border-border text-foreground hover:bg-muted'
            }`}
          >
            {index + 1}
          </button>
        )
      )}
    </div>
  );
};
export default Pagination;