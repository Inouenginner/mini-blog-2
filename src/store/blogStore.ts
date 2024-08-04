import type { Blog } from "@/components/BlogPosts";
import { create } from "zustand";

interface BlogStore {
  blogs: Blog[];
  addBlog: (newPost: Blog) => void;
  fetchBlogs: (currentPage: number, blogsPerPage: number) => Promise<void>;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (newPage: number) => void;
  setTotalPages: (newTotal: number) => void;
  deleteBlog: (id: number) => void;
  editBlog: (id: number, updatedBlog: Blog) => void;
}

const useBlogStore = create<BlogStore>((set, get) => ({
  blogs: [],
  addBlog: (newBlog: Blog) => {
    const { currentPage } = get();
    if (currentPage === 1) {
      set((state: { blogs: Blog[] }) => ({ blogs: [newBlog, ...state.blogs].slice(0, -1) }));
    }
  },
  fetchBlogs: async (currentPage: number, blogsPerPage: number) => {
    try {
      const response = await fetch(`/api/blog?page=${currentPage}&limit=${blogsPerPage}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      set({ blogs: result.blogs });
      set({ totalPages: Math.ceil(result.total / blogsPerPage) });
    } catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
    }
  },
  currentPage: 1,
  totalPages: 0,
  setCurrentPage: (newPage: number) => set({ currentPage: newPage }),
  setTotalPages: (newTotal: number) => set({ totalPages: newTotal }),
  deleteBlog: (id: number) => {
    set((state) => ({
      blogs: state.blogs.filter((blog) => blog.id !== id),
    }));
  },
  editBlog: (id: number, updatedBlog: Blog) => {
    set((state) => ({
      blogs: state.blogs.map((blog) => (blog.id === id ? updatedBlog : blog)),
    }));
  },
}));

export default useBlogStore;
