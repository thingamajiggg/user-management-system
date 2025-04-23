'use client';

interface DeleteConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmation({ onConfirm, onCancel }: DeleteConfirmationProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
      <p className="mb-6">Are you sure you want to delete this user? This action cannot be undone.</p>
      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="btn bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </button>
        <button onClick={onConfirm} className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
}