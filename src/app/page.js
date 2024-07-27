'use client';
import { useEffect } from "react";
import TodoForm from "./todoForm/page";
import TodoList from "./todoList/page";
import { useDispatch, useSelector } from "react-redux";
import {
  createTodo,
  deleteTodo,
  fetchTodos,
  getTodoData,
  toggleTodoCompleted,
} from "./store/store";

export default function Home() {
  const dispatch = useDispatch();
  const { todos, todo, status } = useSelector(getTodoData);

  useEffect(() => {
    try {
      const data = fetchTodos();
      dispatch(fetchTodos(data));
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  const handleCreate = async (title) => {
    try {
      const newTodo = { id: Date.now(), title, completed: false };
      dispatch(createTodo(newTodo));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      dispatch(deleteTodo(id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleCompleted = async (id) => {
    try {
      dispatch(toggleTodoCompleted(id));
    } catch (error) {
      console.error(error);
    }
  };

  if (status === "loading") {
    return <p className="text-center mt-48">Loading...</p>;
  }

  return (
    <div className="container px-4 mx-auto">
      <h1 className="mt-12 text-3xl font-bold text-center text-gray-800 dark:text-gray-200">
        Todo List
      </h1>

      <div className="max-w-md mx-auto mt-8">
        <TodoForm todo={todo} onSubmit={handleCreate} />
      </div>

      <div className="max-w-md mx-auto mt-8">
        <TodoList
          todos={todos}
          onToggleCompleted={handleToggleCompleted}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
