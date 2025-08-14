import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Task, TaskStatus } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: number, task: Task) => void;
}

const statusOptions: Record<TaskStatus, string> = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done'
};

const priorityColors: Record<string, string> = {
  LOW: 'bg-green-100 text-green-800',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
  HIGH: 'bg-red-100 text-red-800'
};

const TaskItem = ({ task, onStatusChange }: TaskItemProps) => {
  const availableStatuses = Object.keys(statusOptions)
    .filter(status => status !== task.status) as TaskStatus[];

  return (
    <div className="bg-white shadow overflow-hidden rounded-lg divide-y divide-gray-200">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
            {task.priority.toLowerCase()}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-500">{task.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            {task.assignee && (
              <div className="flex-shrink-0">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500">
                  <span className="text-xs font-medium leading-none text-white">
                    {task.assignee.username.charAt(0).toUpperCase()}
                  </span>
                </span>
              </div>
            )}
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {task.assignee?.username || 'Unassigned'}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(task.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                {statusOptions[task.status]}
                <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div className="py-1">
                  {availableStatuses.map((status) => (
                    <Menu.Item key={status}>
                      {({ active }) => (
                        <button
                          onClick={() => onStatusChange(task.id, {...task, status:status} )}
                          className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm w-full text-left`}
                        >
                          {statusOptions[status]}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
