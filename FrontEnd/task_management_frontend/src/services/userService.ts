import { User } from "../types/User";
import { getResults } from "../utils/apiCalls";

const API_URL = 'https://localhost:7195/api';

export const getAllUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/users`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  return await getResults(response);
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

  return await getResults(response);
};

export const deleteUser = async (userId: number): Promise<void> => {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

 return await getResults(response);
};
