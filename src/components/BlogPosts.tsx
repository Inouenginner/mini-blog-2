import React, { useEffect, useState } from "react";
import { BlogPost } from "../components/BlogPost";

interface Post {
  id: number;
  content: string;
  date: string;
}

export const BlogPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPosts(data.blogs);
      } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="space-y-6 flex flex-col items-center">
      {posts.map((post: Post) => (
        <div key={post.id} className="w-full max-w-md">
          <BlogPost content={post.content} date={post.date} />
        </div>
      ))}
    </div>
  );
};
