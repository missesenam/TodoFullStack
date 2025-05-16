import React from "react";
import { toggleModal } from "../slices/modalSlice";
import { useSelector, useDispatch } from "react-redux";

const EditTask = () => {
  const dispatch = useDispatch();
  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      dispatch(toggleModal());
    }
  };
  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black opacity-90 flex items-center justify-center"
      onClick={handleOutsideClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-md">
        <h2 className="text-xl mb-2">Edit Task</h2>
        <input
          type="text"
          placeholder="Enter task"
          className="border p-2 rounded w-full mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
            onClick={() => dispatch(toggleModal())}
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
