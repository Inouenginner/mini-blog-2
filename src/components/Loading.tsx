import { Loader } from "lucide-react";

export const Loading = () => (
  <div className="flex justify-center items-center h-screen">
    <Loader className="animate-spin" />
    <p className="ml-4 text-gray-600">Loading...</p>
  </div>
);
