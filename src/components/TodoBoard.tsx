import React from "react";
import { useTodos } from "../hooks/useTodos";
import TodoColumn from "./TodoColumn";

const TodoBoard: React.FC = () => {
  const { addTodo, moveTodo, deleteTodo, getTodosByStatus } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Task Board
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          <TodoColumn
            status="new"
            todos={getTodosByStatus("new")}
            onAddTodo={addTodo}
            onMoveTodo={moveTodo}
            onDeleteTodo={deleteTodo}
          />
          <TodoColumn
            status="ongoing"
            todos={getTodosByStatus("ongoing")}
            onMoveTodo={moveTodo}
            onDeleteTodo={deleteTodo}
          />
          <TodoColumn
            status="done"
            todos={getTodosByStatus("done")}
            onMoveTodo={moveTodo}
            onDeleteTodo={deleteTodo}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoBoard;
