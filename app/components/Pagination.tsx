interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm font-medium"
      >
        Prev
      </button>

      {/* First Page */}
      {currentPage - 2 > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="w-8 h-8 md:w-10 md:h-10 rounded-lg text-sm font-medium bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 transition-colors cursor-pointer"
          >
            1
          </button>
          {currentPage - 2 > 2 && (
            <span className="text-zinc-400 dark:text-zinc-600">...</span>
          )}
        </>
      )}

      {/* Page Numbers */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 md:w-10 md:h-10 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer border ${
            currentPage === page
              ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30"
              : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 border-zinc-200 dark:border-zinc-800"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Last Page */}
      {currentPage + 2 < totalPages && (
        <>
          {currentPage + 2 < totalPages - 1 && (
            <span className="text-zinc-400 dark:text-zinc-600">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="w-8 h-8 md:w-10 md:h-10 rounded-lg text-sm font-medium bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 transition-colors cursor-pointer"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-sm font-medium"
      >
        Next
      </button>
    </div>
  );
}
