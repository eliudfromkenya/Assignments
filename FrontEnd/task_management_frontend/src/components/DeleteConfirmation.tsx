import React from 'react';

interface DeleteConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
  itemName: string;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ onConfirm, onCancel, itemName }) => {
  return (
    <div className="p-4">
      <p className="text-gray-700 text-center mb-6">
        Are you sure you want to delete "<span className="font-semibold">{itemName}</span>"? This action cannot be undone.
      </p>
      <div className="flex justify-center space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;