'use client'
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import TodoForm from "@/app/todoForm/page";
import { fetchTodo, getTodoData, resetTodo, updateTodo } from "@/app/store/store";

const TodoDetail = () => {
  const pathname = usePathname();
  const todoId = pathname.split('/').pop();
  const router = useRouter();

  const dispatch = useDispatch();
  const {todo, todos,  status} = useSelector(getTodoData);

  useEffect(() => {
    dispatch(fetchTodo(todoId));
  }, [todoId, dispatch])

  const handleUpdate = async (title) => {
    try {
      const updatedTodo = { ...todo, title };
      const updatedTodos = todos.filter((t) => t.id !== todo.id).concat(updatedTodo);
      dispatch(updateTodo(updatedTodos));
      dispatch(resetTodo());
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  const handleResetTodo = () => {
    dispatch(resetTodo());
  }

  if (status === "loading") {
    return <div className="text-center mt-48">Loading...</div>;
  }

  return (
    <div className="container px-4 mx-auto">
      <h1 className="mt-12 text-3xl font-bold text-center text-gray-800 dark:text-gray-200">
        Todo Detail
      </h1>

      <div className="max-w-md mx-auto mt-8">
        <TodoForm todo={todo} onSubmit={handleUpdate} />
      </div>

      <div className="max-w-md mx-auto mt-8">
        <Link onClick={handleResetTodo} href="/">
          <span className="text-blue-500 hover:text-blue-700">Back to Home</span>
        </Link>
      </div>
      <div className="max-w-md mx-auto my-8">
        <div className="flex flex-col gap-4 items-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
          <p className="text-lg font-bold">{todo?.id}</p>
          <p className="text-xl font-bold">{todo?.title}</p>
          <p className={`text-lg ${todo?.completed == true ? 'text-green-500' : 'text-red-500'}`}> {todo?.completed == true ? 'Task Completed' : 'Task has not been completed'}</p>
        </div>
      </div>
    </div>
  );
};

export default TodoDetail;