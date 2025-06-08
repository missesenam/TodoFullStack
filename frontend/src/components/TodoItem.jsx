import React, { useState, useEffect } from "react";
import EditTask from "./EditTask";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../slices/modalSlice";
import { fetchTodos } from "../slices/todoSlice";
import axios from "axios";

const TodoItem = ({ filter }) => {
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);

  const dispatch = useDispatch();
  const { listoftodos, loading, error } = useSelector(
    (state) => state.todolist
  );

  // Fetch todos on mount
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // delete task
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`, {
        withCredentials: true,
      });
      // Optionally refresh the todo list
      dispatch(fetchTodos()); // Call this if passed from parent
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };
  // update
  const handleEdit = (updatedTodo) => {
    // setData((prev) =>
    //   prev.map((item) => (item._id === updatedTodo._id ? updatedTodo : item))
    // );
    dispatch(fetchTodos());
  };

  //
  const [editingTodo, setEditingTodo] = useState(null);

  const openEditModal = (todo) => {
    setEditingTodo(todo);
    dispatch(toggleModal());
  };
  const filteredTodos = listoftodos.filter((todo) => {
    if (filter === "Completed") return todo.completed;
    if (filter === "Pending") return !todo.completed;
    return true; // for "All"
  });

  const markAsComplete = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/todos/${id}/complete`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(fetchTodos()); // Refresh list
    } catch (error) {
      console.error("Failed to mark complete:", error);
    }
  };

  return (
    <>
      {loading && <p className="text-blue-500">Loading...</p>}
      {filteredTodos.length > 0 ? (
        filteredTodos.map((todo) => (
          <div
            key={todo._id}
            className="flex flex-col p-4 my-2 border border-gray-300 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200"
          >
            {/* Task Title Row */}
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-800 cursor-pointer hover:text-blue-600 transition-colors duration-200">
                {todo.task}
              </span>
              <div className="flex gap-3">
                <button
                  className="px-3 py-1 rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200 cursor-pointer"
                  onClick={() => markAsComplete(todo._id)}
                >
                  Complete
                </button>
                <button
                  className="px-3 py-1 rounded-md text-white bg-yellow-500 hover:bg-yellow-600 transition-colors duration-200 cursor-pointer"
                  onClick={() => openEditModal(todo)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 cursor-pointer"
                  onClick={() => deleteTodo(todo._id)}
                >
                  Delete
                </button>
                {isModalOpen && editingTodo && (
                  <EditTask todo={editingTodo} onEdit={handleEdit} />
                )}
              </div>
            </div>

            {/* Description Section */}
            {todo.description && (
              <div className="mt-2">
                <p className="text-gray-600 text-sm">{todo.description}</p>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">{error}</p>
      )}
    </>
  );
};

export default TodoItem;
