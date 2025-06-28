import React, { useState, useEffect } from "react";
import { type Todo, STATUS_COLORS, STATUS_LABELS } from "../../types/todo";
import { cn } from "../lib/utils";
import ContextMenu from "./ContextMenu";
import { useToast } from "../hooks/use-toast";

interface TodoItemProps {
  todo: Todo;
  onMove: (id: string, status: Todo["status"], dueDate?: Date) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onMove, onDelete }) => {
  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean;
    x: number;
    y: number;
  }>({ isOpen: false, x: 0, y: 0 });
  const [isOverdue, setIsOverdue] = useState(false);
  const { toast } = useToast();

  // Check for overdue tasks
  useEffect(() => {
    if (todo.status === "ongoing" && todo.dueDate) {
      const checkOverdue = () => {
        const now = new Date();
        const due = new Date(todo.dueDate!);

        if (now > due && !isOverdue) {
          setIsOverdue(true);
          toast({
            title: "Task Overdue!",
            description: `"${todo.title}" is past its due date.`,
            variant: "destructive",
          });
        }
      };

      checkOverdue();
      const interval = setInterval(checkOverdue, 60000); // Check every minute

      return () => clearInterval(interval);
    }
  }, [todo, isOverdue, toast]);

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      isOpen: true,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMove = (status: Todo["status"], dueDate?: Date) => {
    onMove(todo.id, status, dueDate);
    setIsOverdue(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <div
        className={cn(
          "bg-white rounded-xl shadow-sm border-2 border-gray-100 p-4 cursor-pointer",
          "hover:shadow-md hover:border-gray-200 transition-all duration-200",
          "transform hover:scale-[1.02]",
          isOverdue && "border-red-300 bg-red-50"
        )}
        onContextMenu={handleRightClick}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight flex-1">
            {todo.title}
          </h3>
          <span
            className={cn(
              "px-2 py-1 rounded-full text-xs font-medium border flex-shrink-0",
              STATUS_COLORS[todo.status]
            )}
          >
            {STATUS_LABELS[todo.status]}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {todo.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Created {formatDate(todo.createdAt)}</span>
          {todo.dueDate && (
            <div
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-md",
                isOverdue
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
              )}
            >
              <span>Due {formatDate(todo.dueDate)}</span>
              {isOverdue && <span className="text-red-500">⚠️</span>}
            </div>
          )}
        </div>
      </div>

      <ContextMenu
        isOpen={contextMenu.isOpen}
        x={contextMenu.x}
        y={contextMenu.y}
        currentStatus={todo.status}
        onMove={handleMove}
        onClose={() => setContextMenu({ ...contextMenu, isOpen: false })}
        onDelete={() => onDelete(todo.id)}
      />
    </>
  );
};

export default TodoItem;
