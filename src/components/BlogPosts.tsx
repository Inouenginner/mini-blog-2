import React, { useEffect, useState } from "react";
import { BlogPost } from "../components/BlogPost";
import { Loading } from "./Loading ";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
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
  if (posts.length === 0) {
    return <Loading />;
  }

  return (
    <div className="space-y-6 flex flex-col items-center">
      {posts.map((post: Post) => (
        <div key={post.id} className="w-full max-w-md">
          <BlogPost title={post.title} content={post.content} date={post.createdAt} />
        </div>
      ))}
    </div>
  );
};
