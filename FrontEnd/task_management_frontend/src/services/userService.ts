import { User } from "../types/User";

const API_URL = 'https://localhost:7195/api';

export const getAllUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/users`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch users');
  }

  return response.json();
};

export const updateUserRole = async (userId: number, newRole: 'USER' | 'ADMIN'): Promise<User> => {
  const response = await fetch(`${API_URL}/users/${userId}/role`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ role: newRole }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to update user role');
  }

  return response.json();
};

export const deleteUser = async (userId: number): Promise<void> => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete user');
  }
};
