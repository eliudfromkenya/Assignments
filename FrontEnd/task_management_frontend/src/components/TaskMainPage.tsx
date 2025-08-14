import { useState, useEffect, useMemo } from 'react';
import { getTasks, createTask, updateTask, deleteTask, getUsers } from '../serives/tasksService';
import TaskForm from './TaskForm';
import { useAuth } from '../AuthenticationContext';
import { User } from '../types/User';
import { Task, TaskPriority, TaskStatus } from '../types/Task';
import Modal from './Modal';
import { showSuccessToast, showErrorToast, showLoadingToast, updateToast } from '../utils/toast';
import DeleteConfirmation from './DeleteConfirmation';
import TaskFilterControls from './TaskFilterControls';
import TaskSortControls from './TaskSortControls';
import TaskBoardColumn from './TaskBoardColumn'; // Import new component
import TaskBoardHeader from './TaskBoardHeader'; // Import new component

const TaskMainPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [showFormModal, setShowFormModal] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
    
    // Filter states
    const [selectedAssigneeId, setSelectedAssigneeId] = useState<number | undefined>(undefined);
    const [selectedPriority, setSelectedPriority] = useState<TaskPriority | 'ALL'>('ALL');
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Sort states
    const [sortBy, setSortBy] = useState<'createdAt' | 'title' | 'priority'>('createdAt');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            const toastId = showLoadingToast('Loading tasks and users...');
            try {
                const [tasksData, usersData] = await Promise.all([
                    getTasks(),
                    getUsers(),
                ]);
                setTasks(tasksData);
                setUsers(usersData);
                updateToast(toastId, 'success', 'Tasks and users loaded!');
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Failed to fetch data';
                updateToast(toastId, 'error', errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleCreateTask = async (taskData: Task) => {
        if (!user) return;

        const toastId = showLoadingToast('Creating task...');
        try {
            const newTask = await createTask({
                ...taskData,
                creatorId: user.id,
                status: 'TODO',
            });
            setTasks([...tasks, newTask]);
            setShowFormModal(false);
            updateToast(toastId, 'success', 'Task created successfully!');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to create task';
            updateToast(toastId, 'error', errorMessage);
            throw error;
        }
    };

    const handleUpdateTask = async (taskData: Task) => {
        const toastId = showLoadingToast('Updating task...');
        try {
            const updatedTask = await updateTask(taskData);
            setTasks(tasks.map(t =>
                t.id === updatedTask.id ? updatedTask : t
            ));
            setShowFormModal(false);
            setEditingTask(null);
            updateToast(toastId, 'success', 'Task updated successfully!');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to update task';
            updateToast(toastId, 'error', errorMessage);
            throw error;
        }
    };

    const handleStatusChange = async (taskId: number, task: Task) => {
        const toastId = showLoadingToast('Updating task status...');
        try {
            const updatedTask = await updateTask({ ...task, id: taskId });
            setTasks(tasks.map(t =>
                t.id === taskId ? updatedTask : t
            ));
            updateToast(toastId, 'success', 'Task status updated!');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to update task';
            updateToast(toastId, 'error', errorMessage);
        }
    };

    const handleOpenEditModal = (task: Task) => {
        setEditingTask(task);
        setShowFormModal(true);
    };

    const handleOpenDeleteConfirm = (task: Task) => {
        setTaskToDelete(task);
        setShowDeleteConfirmModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!taskToDelete) return;

        const toastId = showLoadingToast('Deleting task...');
        try {
            await deleteTask(taskToDelete.id);
            setTasks(tasks.filter(t => t.id !== taskToDelete.id));
            updateToast(toastId, 'success', 'Task deleted successfully!');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to delete task';
            updateToast(toastId, 'error', errorMessage);
        } finally {
            setShowDeleteConfirmModal(false);
            setTaskToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirmModal(false);
        setTaskToDelete(null);
    };

    const handleCloseFormModal = () => {
        setShowFormModal(false);
        setEditingTask(null);
    };

    const filteredAndSortedTasks = useMemo(() => {
        let currentTasks = [...tasks];

        // Apply filters
        if (selectedAssigneeId !== undefined) {
            currentTasks = currentTasks.filter(task => task.assigneeId === selectedAssigneeId);
        }
        if (selectedPriority !== 'ALL') {
            currentTasks = currentTasks.filter(task => task.priority === selectedPriority);
        }
        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            currentTasks = currentTasks.filter(
                task =>
                    task.title.toLowerCase().includes(lowerCaseSearchTerm) ||
                    task.description.toLowerCase().includes(lowerCaseSearchTerm)
            );
        }

        // Apply sorting
        currentTasks.sort((a, b) => {
            let compareValue = 0;
            if (sortBy === 'createdAt') {
                compareValue = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            } else if (sortBy === 'title') {
                compareValue = a.title.localeCompare(b.title);
            } else if (sortBy === 'priority') {
                const priorityOrder = { 'LOW': 1, 'MEDIUM': 2, 'HIGH': 3 };
                compareValue = priorityOrder[a.priority] - priorityOrder[b.priority];
            }

            return sortOrder === 'asc' ? compareValue : -compareValue;
        });

        return currentTasks;
    }, [tasks, selectedAssigneeId, selectedPriority, searchTerm, sortBy, sortOrder]);

    const filterTasksByStatus = (status: TaskStatus): Task[] =>
        filteredAndSortedTasks.filter(task => task.status === status);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <TaskBoardHeader onCreateTaskClick={() => setShowFormModal(true)} />

            <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-greenish-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Filters & Sorting</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <TaskFilterControls
                        users={users}
                        selectedAssigneeId={selectedAssigneeId}
                        onAssigneeChange={setSelectedAssigneeId}
                        selectedPriority={selectedPriority}
                        onPriorityChange={setSelectedPriority}
                        searchTerm={searchTerm}
                        onSearchTermChange={setSearchTerm}
                    />
                    <TaskSortControls
                        sortBy={sortBy}
                        onSortByChange={setSortBy}
                        sortOrder={sortOrder}
                        onSortOrderChange={setSortOrder}
                    />
                </div>
            </div>

            <Modal isOpen={showFormModal} onClose={handleCloseFormModal} title={editingTask ? "Edit Task" : "Create New Task"}>
                <TaskForm
                    onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                    onCancel={handleCloseFormModal}
                    users={users}
                    initialTask={editingTask}
                />
            </Modal>

            {taskToDelete && (
                <Modal isOpen={showDeleteConfirmModal} onClose={handleCancelDelete} title="Confirm Deletion">
                    <DeleteConfirmation
                        itemName={taskToDelete.title}
                        onConfirm={handleConfirmDelete}
                        onCancel={handleCancelDelete}
                    />
                </Modal>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(['TODO', 'IN_PROGRESS', 'DONE'] as TaskStatus[]).map(status => (
                    <TaskBoardColumn
                        key={status}
                        status={status}
                        tasks={filterTasksByStatus(status)}
                        onStatusChange={handleStatusChange}
                        onEdit={handleOpenEditModal}
                        onDelete={handleOpenDeleteConfirm}
                    />
                ))}
            </div>
        </div>
    );
};

export default TaskMainPage;
