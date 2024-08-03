import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import { DeleteModal } from "./DeleteModal";
import { CreateModal } from "./CreateModal";

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
      <CreateModal
        isModalOpen={editModalId !== -1}
        modalTitleH2="更新する"
        createSubmit={editSubmit}
        title={editTitle}
        setTitle={setEditTitle}
        content={editContent}
        setContent={setEditContent}
        closeModal={closeModal}
        buttonText="更新"
      />
      <DeleteModal
        deleteModalOpen={deleteModalId !== -1}
        deleteSubmit={deleteSubmit}
        closeModal={closeModal}
      />
    </Card>
  );
};
