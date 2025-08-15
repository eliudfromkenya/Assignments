import { Task } from "../types/Task";
import { User } from "../types/User";
import { getResults } from "../utils/apiCalls";

const API_URL = 'https://localhost:7195/api';
export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_URL}/tasks`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  return await getResults(response);
};

export const createTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'creator' | 'assignee'>): Promise<Task> => {
  
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(taskData),
  });

  return await getResults(response);
};

export const updateTask = async (taskData: Task): Promise<Task> => {
  const response = await fetch(`${API_URL}/tasks/${taskData.id}`, { // Changed to use task ID in URL
    method: 'PUT', // Changed method to PUT for updates
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(taskData),
  });

  return await getResults(response);
};

export const deleteTask = async (taskId: number | undefined): Promise<void> => {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  return await getResults(response);
};


export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/users`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  return await getResults(response);
};
