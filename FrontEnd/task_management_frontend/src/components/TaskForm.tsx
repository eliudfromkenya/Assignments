import { useFormik } from 'formik';
import { taskSchema } from '../validationSchemas/taskSchema';
import { TaskPriority } from '../types/Task';
import { User } from '../types/User';
import { XIcon } from '@heroicons/react/solid';

interface TaskFormProps {
    onSubmit: (taskData: {
        title: string;
        description: string;
        priority: TaskPriority;
        assigneeId?: number;
    }) => Promise<void>;
    onCancel: () => void;
    users?: User[];
}

const TaskForm = ({ onSubmit, onCancel, users }: TaskFormProps) => {
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            priority: 'MEDIUM' as TaskPriority,
            assigneeId: undefined as number | undefined,
        },
        validationSchema: taskSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                await onSubmit(values);
            } catch (error) {
                setErrors({
                    submit: error instanceof Error ? error.message : 'Failed to create task',
                });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="fixed inset-0 overflow-y-auto z-50">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div className="absolute top-0 right-0 pt-4 pr-4">
                        <button
                            type="button"
                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            onClick={onCancel}
                        >
                            <span className="sr-only">Close</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>

                    <div>
                        <h2 className="text-lg font-medium text-gray-900">Create New Task</h2>

                        {formik.errors.submit && (
                            <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700">{formik.errors.submit}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <form className="mt-6 space-y-6" onSubmit={formik.handleSubmit}>
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    className={`mt-1 block w-full shadow-sm sm:text-sm rounded-md ${formik.touched.title && formik.errors.title ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'} border py-2 px-3`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.title}
                                />
                                {formik.touched.title && formik.errors.title && (
                                    <p className="mt-2 text-sm text-red-600">{formik.errors.title}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    className={`mt-1 block w-full shadow-sm sm:text-sm rounded-md ${formik.touched.description && formik.errors.description ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'} border py-2 px-3`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.description}
                                />
                                {formik.touched.description && formik.errors.description && (
                                    <p className="mt-2 text-sm text-red-600">{formik.errors.description}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                                    Priority
                                </label>
                                <select
                                    id="priority"
                                    name="priority"
                                    className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border ${formik.touched.priority && formik.errors.priority ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'} focus:outline-none sm:text-sm rounded-md`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.priority}
                                >
                                    <option value="LOW">Low</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="HIGH">High</option>
                                </select>
                                {formik.touched.priority && formik.errors.priority && (
                                    <p className="mt-2 text-sm text-red-600">{formik.errors.priority}</p>
                                )}
                            </div>

                            {users && users.length > 0 && (
                                <div>
                                    <label htmlFor="assigneeId" className="block text-sm font-medium text-gray-700">
                                        Assignee
                                    </label>
                                    <select
                                        id="assigneeId"
                                        name="assigneeId"
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.assigneeId || ''}
                                    >
                                        <option value="">Unassigned</option>
                                        {users.map(user => (
                                            <option key={user.id} value={user.id}>
                                                {user.username}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={formik.isSubmitting || !formik.isValid}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {formik.isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Creating...
                                        </>
                                    ) : 'Create Task'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskForm;