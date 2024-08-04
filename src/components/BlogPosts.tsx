import React, { useEffect, useState } from "react";
import { BlogPost } from "../components/BlogPost";
import { Loading } from "./Loading";
import { Pagination } from "./Pagination";
import useBlogStore from "@/store/blogStore";

export interface Blog {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export const BlogPosts: React.FC = () => {
  const currentPage = useBlogStore((state) => state.currentPage);
  const blogs = useBlogStore((state) => state.blogs);
  const fetchAllBlogs = useBlogStore((state) => state.fetchAllBlogs);

  useEffect(() => {
    fetchAllBlogs();
  }, [currentPage, fetchAllBlogs]);

  if (blogs.length === 0) {
    return <Loading />;
  }

  return (
    <div className="space-y-6 flex flex-col items-center">
      {blogs.map((blog: Blog) => (
        <div key={blog.id} className="w-full max-w-md">
          <BlogPost id={blog.id} title={blog.title} content={blog.content} date={blog.createdAt} />
        </div>
      ))}
      <Pagination currentPage={currentPage} />
    </div>
  );
};
