import React, { useState, useEffect } from "react";
import TodoItem from "../components/TodoItem";
import TodoInput from "../components/TodoInput";
import Logout from "../components/LogOut";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const TodoList = () => {
  const [filter, setFilter] = useState("All");
  const { user } = useSelector((state) => state.auth);

  return (
    //
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {/*  h-[90vh] overflow-y-auto  max-w-3xl rounded-xl */}
      <div className="p-8 shadow-lg w-full md:h-[90vh] flex flex-col md:flex-row gap-8 border border-gray-200 rounded-xl">
        <div className="md:w-[50%]">
          <div className="flex justify-end md:hidden">
            <div className="text-right">
              {user && user.name ? (
                <>
                  <p>
                    Welcome, <strong>{user.name}</strong>
                  </p>
                  <Logout />
                </>
              ) : (
                <p>welcome, User</p>
              )}
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6 tracking-wide font-serif">
            Todo List
          </h1>
          <TodoInput />
        </div>
        <div className="md:w-[50%]  h-full  ">
          <div className="hidden md:flex md:justify-end">
            <div className="text-right">
              {user && user.name ? (
                <>
                  <p>
                    Welcome, <strong>{user.name}</strong>
                  </p>
                  <Logout />
                </>
              ) : (
                <p>welcome, User</p>
              )}
            </div>
          </div>
          {/* filter by status */}
          <div className="flex justify-center gap-6 mt-6">
            <button
              onClick={() => setFilter("All")}
              className={`px-6 py-3 rounded-lg font-semibold transition cursor-pointer ${
                filter === "All"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("Completed")}
              className={`px-6 py-3 rounded-lg font-semibold transition cursor-pointer ${
                filter === "Completed"
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
            >
              Completed
            </button>

            <button
              onClick={() => setFilter("Pending")}
              className={`px-6 py-3 rounded-lg font-semibold transition cursor-pointer ${
                filter === "Pending"
                  ? "bg-yellow-500 text-white"
                  : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
              }`}
            >
              Pending
            </button>
          </div>
          {/* tasks */}
          <div className="mt-8 space-y-3 overflow-y-auto h-[300px] ">
            <TodoItem filter={filter} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
