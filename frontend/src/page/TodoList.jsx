import React from "react";
import TodoItem from "../components/TodoItem";
import TodoInput from "../components/TodoInput";

const TodoList = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="p-8 bg-white rounded-xl shadow-lg max-w-3xl w-full">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6 tracking-wide font-serif">
          Todo List
        </h1>

        <TodoInput />
        {/* filter by status */}
        <div className="flex justify-center gap-6 mt-6">
          <button className="px-6 py-3 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition cursor-pointer">
            All
          </button>
          <button className="px-6 py-3 bg-green-100 text-green-700 rounded-lg font-semibold hover:bg-green-200 transition cursor-pointer">
            Completed
          </button>
          <button className="px-6 py-3 bg-yellow-100 text-yellow-700 rounded-lg font-semibold hover:bg-yellow-200 transition cursor-pointer">
            Pending
          </button>
        </div>
        {/* tasks */}
        <div className="mt-8 space-y-3">
          <TodoItem />
          <TodoItem />
          <TodoItem />
        </div>
      </div>
    </div>
  );
};

export default TodoList;
