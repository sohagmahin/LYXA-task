import React from "react";
import { STATUS_LABELS } from "../../types/todo";
import type { TodoStatus } from "../../types/todo";
import { cn } from "../lib/utils";

interface ContextMenuProps {
  isOpen: boolean;
  x: number;
  y: number;
  currentStatus: TodoStatus;
  onMove: (status: TodoStatus, dueDate?: Date) => void;
  onClose: () => void;
  onDelete: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  isOpen,
  x,
  y,
  currentStatus,
  onMove,
  onClose,
  onDelete,
}) => {
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState("");

  if (!isOpen) return null;

  const availableStatuses = (["new", "ongoing", "done"] as TodoStatus[]).filter(
    (status) => status !== currentStatus
  );

  const handleMove = (status: TodoStatus) => {
    if (status === "ongoing") {
      setShowDatePicker(true);
    } else {
      onMove(status);
      onClose();
    }
  };

  const handleDateSubmit = () => {
    if (selectedDate) {
      onMove("ongoing", new Date(selectedDate));
    } else {
      onMove("ongoing");
    }
    setShowDatePicker(false);
    setSelectedDate("");
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        className={cn(
          "fixed z-50 min-w-48 bg-white rounded-lg shadow-lg border border-gray-200",
          "animate-in fade-in-0 zoom-in-95 duration-200"
        )}
        style={{ left: x, top: y }}
      >
        {!showDatePicker ? (
          <div className="py-2">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">
              Move to
            </div>
            {availableStatuses.map((status) => (
              <button
                key={status}
                onClick={() => handleMove(status)}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <div
                  className={cn(
                    "w-3 h-3 rounded-full",
                    status === "new" && "bg-blue-500",
                    status === "ongoing" && "bg-orange-500",
                    status === "done" && "bg-green-500"
                  )}
                />
                {STATUS_LABELS[status]}
              </button>
            ))}
            <div className="border-t mt-2 pt-2">
              <button
                onClick={() => {
                  onDelete();
                  onClose();
                }}
                className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                Delete Task
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <h3 className="text-sm font-semibold mb-3">
              Set Due Date (Optional)
            </h3>
            <input
              type="datetime-local"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-secondary p-2 border  border-gray-300 rounded-md text-sm mb-3"
              min={new Date().toISOString().slice(0, 16)}
            />
            <div className="flex gap-2">
              <button
                onClick={handleDateSubmit}
                className="flex-1 px-3 py-2 bg-orange-500 text-white text-sm rounded-md hover:bg-orange-600 transition-colors"
              >
                Move to Ongoing
              </button>
              <button
                onClick={() => {
                  setShowDatePicker(false);
                  setSelectedDate("");
                }}
                className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ContextMenu;
