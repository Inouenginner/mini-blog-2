import useBlogStore from "@/store/blogStore";
import React from "react";

export const Pagination: React.FC<{ currentPage: number }> = ({ currentPage }) => {
  const totalPages = useBlogStore((state) => state.totalPages);
  const setCurrentPage = useBlogStore((state) => state.setCurrentPage);
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

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
