'use client' 
import React, { useState } from "react";

const TodoForm = ({ todo, onSubmit }) => {
  const [title, setTitle] = useState(todo ? todo.title : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 text-black p-4 rounded-lg border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          placeholder="Add a new todo..."
        />
        <button
          type="submit"
          className="flex items-center justify-center px-6 py-3 text-white bg-blue-500 rounded-lg transition-colors hover:bg-blue-600 dark:hover:bg-blue-400"
        >
          {todo ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
