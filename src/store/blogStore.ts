import type { Blog } from "@/components/BlogPosts";
import { create } from "zustand";

interface BlogStore {
  blogsPerPage: number;
  blogs: Blog[];
  allBlogs: Blog[];
  addBlog: (newPost: Blog) => void;
  fetchAllBlogs: () => Promise<void>;
  paginateBlogs: (currentPage: number) => void;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (newPage: number) => void;
  setTotalPages: (newTotal: number) => void;
  deleteBlog: (id: number) => void;
  editBlog: (id: number, updatedBlog: Blog) => void;
}

const useBlogStore = create<BlogStore>((set, get) => ({
  blogsPerPage: 20,
  blogs: [],
  allBlogs: [],
  addBlog: (newBlog: Blog) => {
    set((state) => ({
      allBlogs: [newBlog, ...state.allBlogs],
    }));
    get().paginateBlogs(get().currentPage);
  },
  fetchAllBlogs: async () => {
    try {
      let allBlogs;
      if (get().allBlogs.length === 0) {
        const response = await fetch(`/api/blog`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        allBlogs = await response.json();
      } else {
        allBlogs = get().allBlogs;
      }
      set({ allBlogs });
      const blogsPerPage = get().blogsPerPage;
      const totalPages = Math.ceil(allBlogs.length / blogsPerPage);
      set({ totalPages });
      get().paginateBlogs(get().currentPage);
    } catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
    }
  },
  paginateBlogs: (currentPage: number) => {
    const allBlogs = get().allBlogs;
    const skip = (currentPage - 1) * get().blogsPerPage;
    const paginatedBlogs = allBlogs.slice(skip, skip + get().blogsPerPage);
    set({ blogs: paginatedBlogs });
  },
  currentPage: 1,
  totalPages: 0,
  setCurrentPage: (newPage: number) => {
    set({ currentPage: newPage });
    get().paginateBlogs(newPage);
  },
  setTotalPages: (newTotal: number) => set({ totalPages: newTotal }),
  deleteBlog: (id: number) => {
    set((state) => ({
      allBlogs: state.allBlogs.filter((blog) => blog.id !== id),
    }));
    get().paginateBlogs(get().currentPage);
  },
  editBlog: (id: number, updatedBlog: Blog) => {
    set((state) => ({
      allBlogs: state.allBlogs.map((blog) => (blog.id === id ? updatedBlog : blog)),
    }));
    get().paginateBlogs(get().currentPage);
  },
}));

export default useBlogStore;
