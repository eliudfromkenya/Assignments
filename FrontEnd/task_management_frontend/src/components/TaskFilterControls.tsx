import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Check, ChevronDown, Search } from 'lucide-react';
import { User } from '../types/User';
import { TaskPriority } from '../types/Task';

interface TaskFilterControlsProps {
  users: User[];
  selectedAssigneeId: number | undefined;
  onAssigneeChange: (assigneeId: number | undefined) => void;
  selectedPriority: TaskPriority | 'ALL';
  onPriorityChange: (priority: TaskPriority | 'ALL') => void;
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

const priorityOptions = [
  { value: 'ALL', label: 'All Priorities' },
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
];

const TaskFilterControls: React.FC<TaskFilterControlsProps> = ({
  users,
  selectedAssigneeId,
  onAssigneeChange,
  selectedPriority,
  onPriorityChange,
  searchTerm,
  onSearchTermChange,
}) => {
  const allUsersOption = { id: undefined, username: 'All Assignees', email: '', role: 'USER', createdAt: '' };
  const assigneeOptions = [allUsersOption, ...users];

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
      {/* Search Input */}
      <div className="relative w-full sm:w-auto flex-grow">
        <label htmlFor="search-tasks" className="sr-only">Search tasks</label>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          id="search-tasks"
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
      </div>

      {/* Assignee Filter */}
      <Listbox value={selectedAssigneeId} onChange={onAssigneeChange}>
        {({ open }) => (
          <div className="relative w-full sm:w-48">
            <Listbox.Label id="assignee-filter-label" className="sr-only">Filter by Assignee</Listbox.Label>
            <Listbox.Button
              className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm"
              aria-labelledby="assignee-filter-label"
            >
              <span className="block truncate">
                {assigneeOptions.find(u => u.id === selectedAssigneeId)?.username || 'All Assignees'}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {assigneeOptions.map((user) => (
                  <Listbox.Option
                    key={user.id || 'all'}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-3 pr-9 ${
                        active ? 'bg-primary-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={user.id}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                          {user.username}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                              active ? 'text-white' : 'text-primary-600'
                            }`}
                          >
                            <Check className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>

      {/* Priority Filter */}
      <Listbox value={selectedPriority} onChange={onPriorityChange}>
        {({ open }) => (
          <div className="relative w-full sm:w-48">
            <Listbox.Label id="priority-filter-label" className="sr-only">Filter by Priority</Listbox.Label>
            <Listbox.Button
              className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm"
              aria-labelledby="priority-filter-label"
            >
              <span className="block truncate">
                {priorityOptions.find(p => p.value === selectedPriority)?.label}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {priorityOptions.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-3 pr-9 ${
                        active ? 'bg-primary-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={option.value}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                          {option.label}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                              active ? 'text-white' : 'text-primary-600'
                            }`}
                          >
                            <Check className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        )}
      </Listbox>
    </div>
  );
};

export default TaskFilterControls;