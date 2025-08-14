import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, getUsers } from '../serives/tasksService';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import { useAuth } from '../AuthenticationContext';
import { User } from '../types/User';
import { Task, TaskPriority, TaskStatus } from '../types/Task';

const TaskMainPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tasksData, usersData] = await Promise.all([
                    getTasks(),
                    getUsers(),
                ]);
                setTasks(tasksData);
                setUsers(usersData);
                setLoading(false);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to fetch data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCreateTask = async (taskData: {
        title: string;
        description: string;
        priority: TaskPriority;
        assigneeId?: number;
    }) => {
        if (!user) return;

        try {
            const newTask = await createTask({
                ...taskData,
                creatorId: user.id,
                status: 'TODO',
            });
            setTasks([...tasks, newTask]);
            setShowForm(false);
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to create task');
            throw error;
        }
    };

    const handleStatusChange = async (taskId: number, task: Task) => {
        try {
            const updatedTask = await updateTask({ ...task, id: taskId });
            setTasks(tasks.map(task =>
                task.id === taskId ? updatedTask : task
            ));
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to update task');
        }
    };

    const filterTasks = (status: TaskStatus): Task[] =>
        tasks.filter(task => task.status === status);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Task Board</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                    Create Task
                </button>
            </div>

            {showForm && (
                <TaskForm
                    onSubmit={handleCreateTask}
                    onCancel={() => setShowForm(false)}
                    users={users}
                />
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(['TODO', 'IN_PROGRESS', 'DONE'] as TaskStatus[]).map(status => (
                    <div key={status} className="bg-gray-50 rounded-lg p-4">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">
                            {status.replace('_', ' ')}
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                                {filterTasks(status).length}
                            </span>
                        </h2>

                        <div className="space-y-3">
                            {filterTasks(status).map(task => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    onStatusChange={handleStatusChange}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskMainPage;
