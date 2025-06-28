import React from "react";
import { type Todo, type TodoStatus, STATUS_LABELS } from "../../types/todo";
import { cn } from "../lib/utils";
import TodoItem from "./TodoItem";
import AddTodoForm from "./AddTodoForm";

interface TodoColumnProps {
  status: TodoStatus;
  todos: Todo[];
  onAddTodo?: (title: string, description: string) => void;
  onMoveTodo: (id: string, status: TodoStatus, dueDate?: Date) => void;
  onDeleteTodo: (id: string) => void;
}

const TodoColumn: React.FC<TodoColumnProps> = ({
  status,
  todos,
  onAddTodo,
  onMoveTodo,
  onDeleteTodo,
}) => {
  const getColumnStyles = () => {
    switch (status) {
      case "new":
        return "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200";
      case "ongoing":
        return "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200";
      case "done":
        return "bg-gradient-to-br from-green-50 to-green-100 border-green-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const getHeaderIcon = () => {
    switch (status) {
      case "new":
        return "📝";
      case "ongoing":
        return "⚡";
      case "done":
        return "✅";
      default:
        return "📋";
    }
  };

  return (
    <div
      className={cn(
        "flex-1 min-w-80 max-w-sm mx-auto",
        "bg-white rounded-2xl shadow-sm border-2 p-6",
        "transition-all duration-300 hover:shadow-md",
        getColumnStyles()
      )}
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{getHeaderIcon()}</span>
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {STATUS_LABELS[status]}
          </h2>
          <p className="text-sm text-gray-600">
            {todos.length} {todos.length === 1 ? "task" : "tasks"}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {status === "new" && onAddTodo && <AddTodoForm onAdd={onAddTodo} />}

        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onMove={onMoveTodo}
            onDelete={onDeleteTodo}
          />
        ))}

        {todos.length === 0 && status !== "new" && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">
              {status === "ongoing" ? "🔄" : "🎉"}
            </div>
            <p className="text-sm">
              {status === "ongoing"
                ? "No tasks in progress"
                : "No completed tasks"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoColumn;
