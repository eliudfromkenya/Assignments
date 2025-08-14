import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Check, ChevronDown, ArrowDownNarrowWide, ArrowUpNarrowWide } from 'lucide-react';

type SortBy = 'createdAt' | 'title' | 'priority';
type SortOrder = 'asc' | 'desc';

interface TaskSortControlsProps {
  sortBy: SortBy;
  onSortByChange: (sortBy: SortBy) => void;
  sortOrder: SortOrder;
  onSortOrderChange: (sortOrder: SortOrder) => void;
}

const sortByOptions: { value: SortBy; label: string }[] = [
  { value: 'createdAt', label: 'Creation Date' },
  { value: 'title', label: 'Title' },
  { value: 'priority', label: 'Priority' },
];

const sortOrderOptions: { value: SortOrder; label: string }[] = [
  { value: 'asc', label: 'Ascending' },
  { value: 'desc', label: 'Descending' },
];

const TaskSortControls: React.FC<TaskSortControlsProps> = ({
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
      {/* Sort By */}
      <Listbox value={sortBy} onChange={onSortByChange}>
        {({ open }) => (
          <div className="relative w-full sm:w-48">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm">
              <span className="block truncate">
                <ArrowDownNarrowWide size={16} className="inline-block mr-2 text-gray-500" />
                {sortByOptions.find(o => o.value === sortBy)?.label}
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
                {sortByOptions.map((option) => (
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

      {/* Sort Order */}
      <Listbox value={sortOrder} onChange={onSortOrderChange}>
        {({ open }) => (
          <div className="relative w-full sm:w-48">
            <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm">
              <span className="block truncate">
                {sortOrder === 'asc' ? (
                  <ArrowUpNarrowWide size={16} className="inline-block mr-2 text-gray-500" />
                ) : (
                  <ArrowDownNarrowWide size={16} className="inline-block mr-2 text-gray-500" />
                )}
                {sortOrderOptions.find(o => o.value === sortOrder)?.label}
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
                {sortOrderOptions.map((option) => (
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

export default TaskSortControls;