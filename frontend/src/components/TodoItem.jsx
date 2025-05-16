import React, { useState, useEffect } from "react";
import EditTask from "./EditTask";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../slices/modalSlice";
import { fetchTodos } from "../slices/todoSlice";

const TodoItem = () => {
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);

  const listoftodos = useSelector((state) => state.todolist.listoftodos);
  const dispatch = useDispatch();

  // Fetch todos on mount
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <>
      {listoftodos.map((todo) => (
        <div
          key={todo._id}
          className="flex justify-between items-center p-4 my-2 border border-gray-300 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200"
        >
          <span className="font-medium text-gray-800 cursor-pointer hover:text-blue-600 transition-colors duration-200">
            {todo.task}
          </span>
          <div className="flex gap-3">
            <button className="px-3 py-1 rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200 cursor-pointer">
              Complete
            </button>
            <button
              className="px-3 py-1 rounded-md text-white bg-yellow-500 hover:bg-yellow-600 transition-colors duration-200 cursor-pointer"
              onClick={() => dispatch(toggleModal())}
            >
              Edit
            </button>
            <button className="px-3 py-1 rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 cursor-pointer">
              Delete
            </button>
            {isModalOpen && <EditTask />}
          </div>
        </div>
      ))}
    </>
  );
};

export default TodoItem;
