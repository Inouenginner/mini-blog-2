import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (newPage: number) => void;
}

export const Pagination: React.FC<PaginationProps> = (props) => {
  const { totalPages, currentPage, handlePageChange } = props;

  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`mx-1 px-3 py-1 border ${
            currentPage === page ? "bg-blue-500 text-white" : "bg-white text-blue-500"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
