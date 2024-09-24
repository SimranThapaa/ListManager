import React, { useState } from "react";
import Modal from "./Modal";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ items, removeItem, editItem }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const openDeleteModal = (item) => {
    setItemToDelete(item);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    removeItem(itemToDelete.id);
    setShowDeleteModal(false);
  };

  return (
    <div className="list-container mt-5 w-full max-w-md mx-auto">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <ul className="list " key={id}>
            <li className="flex p-5 justify-between items-center bg-[#edf4fc] rounded mb-5 gap-5">
              {title}
              <div className="btn-group flex gap-2">
                <button
                  type="button"
                  className="edit-btn text-primary hover:text-electricBlue"
                  onClick={() => editItem(id)}
                >
                  <FaEdit />
                </button>
                <button
                  type="button"
                  className="remove-btn  text-primary hover:text-red-600"
                  onClick={() => openDeleteModal(item)}
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          </ul>
        );
      })}
      {showDeleteModal && (
        <Modal
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          isDeleting={true}
          confirmDelete={confirmDelete}
        />
      )}
    </div>
  );
};

export default List;
