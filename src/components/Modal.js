import React from "react";
import { FaTimes } from "react-icons/fa";

const Modal = ({
  show,
  handleClose,
  handleSubmit,
  name,
  setName,
  isEditing,
}) => {
  if (!show) return null;

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
    handleClose();
  };

  return (
    <div className="fixed inset-0 bg-[#08101761] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg relative max-w-md w-full">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={handleClose}
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center text-primary">
          {isEditing ? "Edit Item" : "Add Item"}
        </h2>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="form-input border border-black py-2 px-4 rounded-lg w-full mb-4"
            placeholder="Enter an item"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-electricBlue text-white rounded-lg hover:shadow-lg transition-transform duration-200 ease-in-out"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:shadow-lg transition-transform duration-200 ease-in-out"
            >
              {isEditing ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
