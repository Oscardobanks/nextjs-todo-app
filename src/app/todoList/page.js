import React from "react";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";

const TodoList = ({ todos, onToggleCompleted, onDelete }) => {
  const handleToggleCompleted = (todoId) => {
    onToggleCompleted(todoId);
  };

  return (
    <div className="flex flex-col gap-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
        >
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleCompleted(todo.id)}
              className="flex items-center justify-center w-4 h-4 rounded-sm border-gray-300 dark:border-gray-600 cursor-pointer"
            />
            <Link href={`/todo/${todo.id}`}>
              <span className="text-lg font-medium text-gray-800 dark:text-gray-200">
                {todo.title}
              </span>
            </Link>
          </div>
          <button
            onClick={() => onDelete(todo.id)}
            className="flex items-center justify-center w-8 h-8 text-red-500 transition-colors hover:text-red-600 dark:hover:text-red-400"
          >
            <FaTrash />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;