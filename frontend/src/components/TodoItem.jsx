import React, { useState } from "react";
import EditTask from "./EditTask";
// import { useSelector, useDispatch } from "react-redux";

const TodoItem = () => {
  // const count = useSelector((state) => state.modal.value);
  // const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="flex justify-between items-center p-4 my-2 border border-gray-300 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
      <span className="font-medium text-gray-800 cursor-pointer hover:text-blue-600 transition-colors duration-200">
        Sample Task
      </span>
      <div className="flex gap-3">
        <button className="px-3 py-1 rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200 cursor-pointer">
          Complete
        </button>
        <button
          className="px-3 py-1 rounded-md text-white bg-yellow-500 hover:bg-yellow-600 transition-colors duration-200 cursor-pointer"
          onClick={toggleModal}
        >
          Edit
        </button>
        <button className="px-3 py-1 rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 cursor-pointer">
          Delete
        </button>
        {isModalOpen && <EditTask toggleModal={toggleModal} />}
      </div>
    </div>
  );
};

export default TodoItem;
