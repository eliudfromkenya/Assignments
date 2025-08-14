import React from 'react';
import { PlusCircle } from 'lucide-react';

interface TaskBoardHeaderProps {
  onCreateTaskClick: () => void;
}

const TaskBoardHeader: React.FC<TaskBoardHeaderProps> = ({ onCreateTaskClick }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
      <h1 className="text-3xl font-bold text-gray-800">Task Board</h1>
      <button
        onClick={onCreateTaskClick}
        className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
      >
        <PlusCircle size={20} className="mr-2" /> Create Task
      </button>
    </div>
  );
};

export default TaskBoardHeader;