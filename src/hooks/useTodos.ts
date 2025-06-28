import { useState, useEffect } from "react";
import type { Todo, TodoStatus } from "../../types/todo";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      const parsed = JSON.parse(savedTodos);

      // console.log(parsed);
      // Convert date strings back to Date objects
      const todosWithDates = parsed.map((todo: Todo) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        movedAt: new Date(todo.movedAt),
        dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
      }));

      console.log("todos with dates: ");
      console.log(todosWithDates);
      setTodos(todosWithDates);
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string, description: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      description,
      status: "new",
      createdAt: new Date(),
      movedAt: new Date(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const moveTodo = (id: string, newStatus: TodoStatus, dueDate?: Date) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status: newStatus,
              movedAt: new Date(),
              dueDate: newStatus === "ongoing" ? dueDate : todo.dueDate,
            }
          : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const getTodosByStatus = (status: TodoStatus) => {
    return todos
      .filter((todo) => todo.status === status)
      .sort((a, b) => b.movedAt.getTime() - a.movedAt.getTime());
  };

  return {
    todos,
    addTodo,
    moveTodo,
    deleteTodo,
    getTodosByStatus,
  };
};
