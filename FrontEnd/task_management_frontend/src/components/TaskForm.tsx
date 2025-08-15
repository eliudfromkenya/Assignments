import React, { useState, Fragment } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Task, TaskPriority, TaskStatus } from '../types/Task';
import { User } from '../types/User';
import { Listbox, Transition } from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';
import { taskSchema } from '../validationSchemas/taskSchema';
import { showErrorToast } from '../utils/toast'; // Import showErrorToast

interface FormValues {
  id: number;
  status: TaskStatus;
  title: string;
  description: string;
  priority: TaskPriority;
  assigneeId: number | undefined;
}

interface TaskFormProps {
  onSubmit: (taskData: Task) => Promise<void>; // onSubmit can now accept Task for updates
  onCancel: () => void;
  users: User[];
  initialTask?: Task | null; // New optional prop for editing
}

const priorityOptions: { value: TaskPriority; label: string }[] = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
];

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel, users, initialTask }) => {
  const initialValues: FormValues = {
    title: initialTask?.title || '',
    description: initialTask?.description || '',
    priority: initialTask?.priority || 'MEDIUM', // Default priority
    assigneeId: initialTask?.assigneeId || undefined,
    status: initialTask?.status || 'TODO', // Default status
    id: initialTask?.id || 0, // Use 0 or undefined for new
  };

  const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: any) => {
    try {
      if (initialTask) {
        // If initialTask exists, it's an update operation
        await onSubmit({ ...initialTask, ...values });
      } else {
        // Otherwise, it's a create operation
        await onSubmit({ ...values, createdAt: new Date().toISOString(), creatorId: 1 }); // Assuming creatorId is 1 for demo purposes
      }
      resetForm();
      // onCancel(); // Close the form after successful submission - handled by parent
    } catch (error: any) {
      showErrorToast(error.message || 'Failed to save task.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={taskSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true} // Important for updating initial values when editingTask changes
    >
      {({ isSubmitting, setFieldValue, values, errors, touched }) => (
        <Form className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <Field
              id="title"
              name="title"
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2"
              aria-describedby={touched.title && errors.title ? 'title-error' : undefined}
            />
            <ErrorMessage name="title" component="div" id="title-error" className="mt-1 text-sm text-red-600" />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Field
              id="description"
              name="description"
              as="textarea"
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2"
              aria-describedby={touched.description && errors.description ? 'description-error' : undefined}
            />
            <ErrorMessage name="description" component="div" id="description-error" className="mt-1 text-sm text-red-600" />
          </div>

          <div>
            <Listbox
              value={values.priority}
              onChange={(selectedPriority: TaskPriority) => setFieldValue('priority', selectedPriority)}
            >
              {({ open }) => (
                <div>
                  <Listbox.Label id="priority-label" className="block text-sm font-medium text-gray-700">Priority</Listbox.Label>
                  <div className="relative mt-1">
                    <Listbox.Button
                      className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm"
                      aria-labelledby="priority-label"
                      aria-describedby={touched.priority && errors.priority ? 'priority-error' : undefined}
                    >
                      <span className="block truncate">{priorityOptions.find(p => p.value === values.priority)?.label}</span>
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
                              `relative cursor-default select-none py-2 pl-3 pr-9 ${active ? 'bg-primary-600 text-white' : 'text-gray-900'
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
                                    className={`absolute inset-y-0 right-0 flex items-center pr-4 ${active ? 'text-white' : 'text-primary-600'
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
                </div>
              )}
            </Listbox>
            <ErrorMessage name="priority" component="div" id="priority-error" className="mt-1 text-sm text-red-600" />
          </div>

          <div>
            <Listbox
              value={values.assigneeId}
              onChange={(selectedAssigneeId: number | undefined) => setFieldValue('assigneeId', selectedAssigneeId)}
            >
              {({ open }) => (
                <div>
                  <Listbox.Label id="assignee-label" className="block text-sm font-medium text-gray-700">Assignee</Listbox.Label>
                  <div className="relative mt-1">
                    <Listbox.Button
                      className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm"
                      aria-labelledby="assignee-label"
                      aria-describedby={touched.assigneeId && errors.assigneeId ? 'assigneeId-error' : undefined}
                    >
                      <span className="block truncate">
                        {values.assigneeId
                          ? users.find(u => u.id === values.assigneeId)?.username
                          : 'Select an assignee (optional)'}
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
                        <Listbox.Option
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-3 pr-9 ${active ? 'bg-primary-600 text-white' : 'text-gray-900'
                            }`
                          }
                          value={undefined} // Option for unassigned
                        >
                          {({ selected, active }) => (
                            <>
                              <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                                Unassigned
                              </span>
                              {selected ? (
                                <span
                                  className={`absolute inset-y-0 right-0 flex items-center pr-4 ${active ? 'text-white' : 'text-primary-600'
                                    }`}
                                >
                                  <Check className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                        {users.map((user) => (
                          <Listbox.Option
                            key={user.id}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-3 pr-9 ${active ? 'bg-primary-600 text-white' : 'text-gray-900'
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
                                    className={`absolute inset-y-0 right-0 flex items-center pr-4 ${active ? 'text-white' : 'text-primary-600'
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
                </div >
              )}
            </Listbox>
            <ErrorMessage name="assigneeId" component="div" id="assigneeId-error" className="mt-1 text-sm text-red-600" />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (initialTask ? 'Updating...' : 'Creating...') : (initialTask ? 'Update Task' : 'Create Task')}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
