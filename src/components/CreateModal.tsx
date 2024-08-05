import React from "react";

interface CreateModalProps {
  isModalOpen: boolean;
  modalTitleH2: string;
  createSubmit: (e: { preventDefault: () => void }) => Promise<void>;
  title: string;
  setTitle: (value: React.SetStateAction<string>) => void;
  content: string;
  setContent: (value: React.SetStateAction<string>) => void;
  closeModal: () => void;
  buttonText: string;
}

export const CreateModal: React.FC<CreateModalProps> = ({
  isModalOpen,
  modalTitleH2,
  createSubmit,
  title,
  setTitle,
  content,
  setContent,
  closeModal,
  buttonText,
}) => {
  return (
    <>
      {/* コピペしてきたから共通化したい箇所 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <h2 className="text-2xl mb-4">{modalTitleH2}</h2>
            <form onSubmit={createSubmit} id="editForm">
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  タイトル
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  maxLength={21845}
                  onChange={(e) => setTitle(e.target.value)}
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
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  maxLength={21845}
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
                  {buttonText}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
