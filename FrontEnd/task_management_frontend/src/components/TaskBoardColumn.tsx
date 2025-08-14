import React from 'react';
import { Task, TaskStatus } from '../types/Task';
import TaskItem from './TaskItem';

interface TaskBoardColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onStatusChange: (taskId: number, task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const statusDisplayNames: Record<TaskStatus, string> = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
};

const statusHeaderColors: Record<TaskStatus, string> = {
  TODO: 'bg-blue-500',
  IN_PROGRESS: 'bg-yellow-500',
  DONE: 'bg-green-500',
};

const TaskBoardColumn: React.FC<TaskBoardColumnProps> = ({
  status,
  tasks,
  onStatusChange,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className={`px-6 py-4 ${statusHeaderColors[status]} text-white flex items-center justify-between`}>
        <h2 className="text-xl font-semibold">
          {statusDisplayNames[status]}
        </h2>
        <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white bg-opacity-20 text-white">
          {tasks.length}
        </span>
      </div>

      <div className="p-4 space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center py-6 bg-gray-50 rounded-lg border border-gray-100">No tasks in this column.</p>
        )}
      </div>
    </div>
  );
};

export default TaskBoardColumn;