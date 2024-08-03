import React, { useEffect, useState } from "react";
import { BlogPost } from "../components/BlogPost";
import { Loading } from "./Loading";

interface Blog {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export const BlogPosts: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const blogsPerPage = 20;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/blog?page=${currentPage}&limit=${blogsPerPage}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setBlogs(result.blogs);
        setTotalPages(Math.ceil(result.total / blogsPerPage));
      } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
      }
    };

    fetchPosts();
  }, [currentPage]);

  if (blogs.length === 0) {
    return <Loading />;
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="space-y-6 flex flex-col items-center">
      {blogs.map((blog: Blog) => (
        <div key={blog.id} className="w-full max-w-md">
          <BlogPost id={blog.id} title={blog.title} content={blog.content} date={blog.createdAt} />
        </div>
      ))}
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
    </div>
  );
};
