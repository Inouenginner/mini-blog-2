import React from "react";

interface DeleteModalProps {
  deleteModalOpen: boolean;
  deleteSubmit: (e: { preventDefault: () => void }) => Promise<void>;
  closeModal: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  deleteModalOpen,
  deleteSubmit,
  closeModal,
}) => {
  return (
    <>
      {deleteModalOpen && (
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
    </>
  );
};
