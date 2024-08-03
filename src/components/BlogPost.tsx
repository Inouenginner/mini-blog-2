import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";

interface BlogPostProps {
  id: number;
  title: string;
  content: string;
  date: string;
}

export const BlogPost: React.FC<BlogPostProps> = ({ id, title, content, date }) => {
  const [editModalId, setEditModalId] = useState(-1);
  const [deleteModalId, setDeleteModalId] = useState(-1);
  const closeModal = () => {
    setEditModalId(-1);
    setDeleteModalId(-1);
    setEditTitle("");
    setEditContent("");
  };
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

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

  const editSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!content) {
      throw new Error("内容は入力してください");
    }
    try {
      const params = {
        method: "PATCH",
        body: JSON.stringify({
          id: editModalId,
          title: editTitle,
          content: editContent,
          userId: "1",
        }),
      };
      //userは自分だけの想定

      const response = await fetch("/api/blog", params);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      alert("修正が完了しました！");
    } catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
    }
    // 処理後にモーダルを閉じる
    closeModal();
  };
  const deleteSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(e);
    if (!content) {
      throw new Error("内容は入力してください");
    }
    try {
      const params = {
        method: "DELETE",
        body: JSON.stringify({ id: deleteModalId }),
      };
      //userは自分だけの想定

      const response = await fetch("/api/blog", params);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      alert("投稿が完了しました");
    } catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
    }
    // 処理後にモーダルを閉じる
    closeModal();
  };

  return (
    <Card className="w-full bg-white shadow-sm border border-gray-100">
      {title && (
        <CardHeader className="items-center pb-0 pt-4">
          <div className="w-full">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          </div>
        </CardHeader>
      )}
      <CardContent className="flex justify-between bg-white py-4 rounded-lg items-end">
        <p className="text-gray-800 whitespace-pre-wrap">{content}</p>
        <div className="flex justify-between">
          <Pencil size={16} strokeWidth={1} onClick={() => setEditModalId(id)} />
          <Trash2 size={16} strokeWidth={1} onClick={() => setDeleteModalId(id)} />
        </div>
      </CardContent>
      <hr className="border-dashed" />
      <p className="text-sm text-gray-500 whitespace-nowrap pr-6 py-2 text-right">
        {formattedDateTime}
      </p>
      {/* コピペしてきたから共通化したい箇所 */}
      {editModalId !== -1 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <h2 className="text-2xl mb-4">編集する</h2>
            <form onSubmit={editSubmit} id="editForm">
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  タイトル
                </label>
                <input
                  type="text"
                  id="title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  内容
                  <span className="text-red-600">* </span>
                </label>
                <textarea
                  id="content"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  更新
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteModalId !== -1 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <h2 className="text-2xl mb-4">削除しますか？</h2>
            <form onSubmit={deleteSubmit}>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  削除
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Card>
  );
};
