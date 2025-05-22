import axios from "axios";
import React, { useEffect, useState } from "react";

const TodoInput = ({ onTodoAdded }) => {
  const [formData, setFormData] = useState({
    task: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const postdata = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/todos",
        formData
      );
      console.log("Todo created:", response.data);

      // reset form
      setFormData({ task: "", description: "" });
      onTodoAdded();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Task</h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="task"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Task Title
          </label>
          <input
            id="task"
            type="text"
            name="task"
            value={formData.task}
            placeholder="What needs to be done?"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            placeholder="Add details about the task..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[120px]"
            onChange={handleChange}
          />
        </div>

        <button
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
          onClick={postdata}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TodoInput;
