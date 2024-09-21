import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ items, removeItem, editItem }) => {
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
                  className="remove-btn  text-primary hover:text-electricBlue"
                  onClick={() => removeItem(id)}
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default List;
