import React, { useEffect, useState } from "react";
import List from "./List";
import Alert from "./Alert";
import Modal from "./Modal";
import { FaPlus } from "react-icons/fa";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  return list ? JSON.parse(list) : [];
};

const Home = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: "", msg: "" });
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "Please enter a value");
      return;
    }

    if (isEditing) {
      setList(
        list.map((item) =>
          item.id === editId ? { ...item, title: name } : item
        )
      );
      showAlert(true, "success", "Value changed");
    } else {
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([newItem, ...list]);
      showAlert(true, "success", "Item added to the list");
    }

    setName("");
    setIsEditing(false);
    setShowModal(false);
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
    showAlert(true, "danger", "Item removed");
  };

  const editItem = (id) => {
    const updatedItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(updatedItem.title);
    setShowModal(true);
  };

  const clearList = () => {
    setList([]);
    showAlert(true, "danger", "List cleared");
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <div className="container flex items-center justify-center h-screen px-5 mx-auto">
      <section className="list-manager-container max-w-md w-full">
        <div className="text-center text-primary">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-5xl">
            List Manager
          </h1>
          <div className="text-base md:text-lg lg:text-xl md:text- font-semibold my-5">
            "Effortlessly Manage Your Items"
          </div>
          <button
            className="btn btn-success border-black py-2 px-5 outline-none rounded-3xl bg-primary text-white flex items-center gap-2 hover:shadow-lg transition-transform duration-200 ease-in-out"
            onClick={() => {
              setName("");
              setIsEditing(false);
              setShowModal(true);
            }}
          >
            <FaPlus /> Add items
          </button>
        </div>

        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        {list.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center justify-between p-5 bg-primary text-white rounded-t-lg">
              <div className="text-bold">List Items</div>
              <button
                className="btn-clear rounded-3xl py-2 px-2.5 border bg-white border-white text-primary hover:text-white  hover:bg-primary transition-transform duration-200 ease-in-out"
                onClick={clearList}
              >
                Delete all items
              </button>
            </div>
            <div className="shadow-lg  px-5 max-h-80 overflow-y-scroll rounded-lg">
              <List items={list} removeItem={removeItem} editItem={editItem} />
            </div>
          </div>
        )}
      </section>

      <Modal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSubmit={handleSubmit}
        name={name}
        setName={setName}
        isEditing={isEditing}
      />
    </div>
  );
};

export default Home;
