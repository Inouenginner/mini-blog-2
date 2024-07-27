import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card"

interface BlogPostProps {
  content: string;
  date: string;
}

export const BlogPost: React.FC<BlogPostProps> = ({ content, date }) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex justify-between items-baseline pb-2">
        <h2 className="text-xl font-semibold">title</h2>
        <p className="text-sm text-gray-500 whitespace-nowrap">{date}</p>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <CardFooter>
        {/* 
        <div className="flex justify-end space-x-4 w-full">
          <button className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Deploy</button>
        </div>
        */}
      </CardFooter>
    </Card>
  );
};