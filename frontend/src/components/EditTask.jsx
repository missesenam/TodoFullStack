import React, { useState, useEffect } from "react";
import { toggleModal } from "../slices/modalSlice";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const EditTask = ({ todo, onEdit }) => {
  const dispatch = useDispatch();

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      dispatch(toggleModal());
    }
  };
  const [editedTask, setEditedTask] = useState(todo.task);
  const [editedDescription, setEditedDescription] = useState(
    todo.description || ""
  );

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/todos/${todo._id}`,
        {
          task: editedTask,
          description: editedDescription,
        },
        { withCredentials: true }
      );

      onEdit(response.data.updatedTask); // Pass updated data back to parent
      dispatch(toggleModal());
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center"
      onClick={handleOutsideClick}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

        <input
          type="text"
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
          placeholder="Enter task title"
          className="border p-2 rounded w-full mb-4"
        />

        <textarea
          placeholder="Enter task description"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="border p-2 rounded w-full mb-4 resize-none h-24"
        />

        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
            onClick={() => dispatch(toggleModal())}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
