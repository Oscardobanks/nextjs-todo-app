import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  todo: null,
  todos: [],
  status: "idle",
};

// Create a thunk for fetching todos
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );
  return response.data;
});

export const fetchTodo = createAsyncThunk("todos/fetchTodo", async (id) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );
  return response.data;
});

// Create a slice for managing the todos
const todosSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    resetTodo: (state) => {
      state.todo = null;
    },
    createTodo: (state, action) => {
      state.todos = [action.payload, ...state.todos];
    },
    updateTodo: (state, action) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.todos[index] = {
          ...state.todos[index],
          completed: !state.todos[index].completed,
        };
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    toggleTodoCompleted: (state, action) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state.todos[index] = {
          ...state.todos[index],
          completed: !state.todos[index].completed,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todo = action.payload;
      })
      .addCase(fetchTodo.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// Export the actions and the reducer
export const { resetTodo, createTodo, updateTodo, deleteTodo, toggleTodoCompleted } =
  todosSlice.actions;
export default todosSlice.reducer;

// Configure the Redux store
export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
  },
});

export const getTodoData = (state) => state.todos;
// Dispatch the fetchTodos action when the store is created
store.dispatch(fetchTodos());
