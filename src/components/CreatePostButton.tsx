import { useState } from "react";
import { CreateModal } from "./CreateModal";
import useBlogStore from "@/store/blogStore";

const CreatePostButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const addBlog = useBlogStore((state) => state.addBlog);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setContent("");
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!content) {
      throw new Error("内容は入力してください");
    }
    try {
      const params = {
        method: "POST",
        body: JSON.stringify({ title, content, userId: "1" }),
      };
      //userは自分だけの想定

      const response = await fetch("/api/blog", params);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const newObj = (({ userId, ...rest }) => rest)(data);
      addBlog(newObj); //userIdを除いた
      alert("投稿作成が完了しました");
    } catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
    }

    // 処理後にモーダルを閉じる
    closeModal();
  };

  return (
    <>
      <button
        onClick={openModal}
        className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        ＋ 投稿を作成
      </button>
      <CreateModal
        isModalOpen={isModalOpen}
        modalTitleH2="投稿する"
        createSubmit={handleSubmit}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        closeModal={closeModal}
        buttonText="投稿"
      />
    </>
  );
};

export default CreatePostButton;
