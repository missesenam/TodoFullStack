import React from "react";

const TodoInput = () => {
  return (
    <form className="flex gap-3 p-4  rounded-lg ">
      <input
        type="text"
        placeholder="Add a new task"
        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      />
      <button
        type="submit"
        className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Add
      </button>
    </form>
  );
};

export default TodoInput;
