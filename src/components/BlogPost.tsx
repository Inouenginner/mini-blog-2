import React from "react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";

interface BlogPostProps {
  title: string;
  content: string;
  date: string;
}

export const BlogPost: React.FC<BlogPostProps> = ({ title, content, date }) => {
  const dateDate = new Date(date);

  // 日本時間に変換
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  // フォーマット
  const formattedDateTime = new Intl.DateTimeFormat("ja-JP", options)
    .format(dateDate)
    .replace(/\//g, "-")
    .replace(",", "");

  return (
    <Card className="w-full bg-white shadow-sm border border-gray-100">
      <CardHeader className="flex justify-between items-center pb-2">
        <div className="flex justify-between w-full">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500 whitespace-nowrap">{formattedDateTime}</p>
        </div>
      </CardHeader>
      <CardContent className="bg-white">
        <p className="text-gray-600">{content}</p>
      </CardContent>
    </Card>
  );
};
