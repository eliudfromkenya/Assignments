import React, { useState, useEffect } from 'react';
import { User } from '../types/User';
import { getAllUsers, updateUserRole, deleteUser } from '../services/userService';
import { showSuccessToast, showErrorToast, showLoadingToast, updateToast } from '../utils/toast';
import Modal from './Modal';
import DeleteConfirmation from './DeleteConfirmation';
import { Edit, Trash2, User as UserIcon, ShieldCheck } from 'lucide-react';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useAuth } from '../AuthenticationContext';

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [userToEditRole, setUserToEditRole] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<'USER' | 'ADMIN'>('USER');

  const { user: currentUser } = useAuth(); // Get the currently logged-in user

  const fetchUsers = async () => {
    const toastId = showLoadingToast('Loading users...');
    try {
      const data = await getAllUsers();
      setUsers(data);
      updateToast(toastId, 'success', 'Users loaded successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch users';
      updateToast(toastId, 'error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenDeleteModal = (user: User) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    const toastId = showLoadingToast(`Deleting user ${userToDelete.username}...`);
    try {
      await deleteUser(userToDelete.id);
      setUsers(users.filter(u => u.id !== userToDelete.id));
      updateToast(toastId, 'success', `User ${userToDelete.username} deleted successfully!`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete user';
      updateToast(toastId, 'error', errorMessage);
    } finally {
      handleCloseDeleteModal();
    }
  };

  const handleOpenRoleModal = (user: User) => {
    setUserToEditRole(user);
    setSelectedRole(user.role); // Set initial selected role
    setShowRoleModal(true);
  };

  const handleCloseRoleModal = () => {
    setShowRoleModal(false);
    setUserToEditRole(null);
    setSelectedRole('USER'); // Reset selected role
  };

  const handleConfirmRoleUpdate = async () => {
    if (!userToEditRole) return;

    const toastId = showLoadingToast(`Updating role for ${userToEditRole.username}...`);
    try {
      const updatedUser = await updateUserRole(userToEditRole.id, selectedRole);
      setUsers(users.map(u => (u.id === updatedUser.id ? updatedUser : u)));
      updateToast(toastId, 'success', `Role for ${userToEditRole.username} updated to ${updatedUser.role}!`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update role';
      updateToast(toastId, 'error', errorMessage);
    } finally {
      handleCloseRoleModal();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">User Management</h1>

      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-greenish-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'ADMIN' ? 'bg-primary-200 text-primary-800' : 'bg-gray-200 text-gray-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        {/* Disable actions for the currently logged-in admin */}
                        {currentUser?.id !== user.id && (
                          <>
                            <button
                              onClick={() => handleOpenRoleModal(user)}
                              className="text-primary-600 hover:text-primary-900 p-2 rounded-md hover:bg-gray-100 transition-colors"
                              title="Edit Role"
                              aria-label={`Edit role for ${user.username}`}
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleOpenDeleteModal(user)}
                              className="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50 transition-colors"
                              title="Delete User"
                              aria-label={`Delete user ${user.username}`}
                            >
                              <Trash2 size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {userToDelete && (
        <Modal isOpen={showDeleteModal} onClose={handleCloseDeleteModal} title="Confirm User Deletion">
          <DeleteConfirmation
            itemName={userToDelete.username}
            onConfirm={handleConfirmDelete}
            onCancel={handleCloseDeleteModal}
          />
        </Modal>
      )}

      {/* Edit Role Modal */}
      {userToEditRole && (
        <Modal isOpen={showRoleModal} onClose={handleCloseRoleModal} title={`Edit Role for ${userToEditRole.username}`}>
          <div className="p-4">
            <Listbox value={selectedRole} onChange={setSelectedRole}>
              {({ open }) => (
                <>
                  <Listbox.Label className="block text-sm font-medium text-gray-700 mb-2">Select New Role</Listbox.Label>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm">
                      <span className="block truncate">
                        {selectedRole === 'ADMIN' ? (
                          <ShieldCheck size={16} className="inline-block mr-2 text-primary-600" />
                        ) : (
                          <UserIcon size={16} className="inline-block mr-2 text-gray-500" />
                        )}
                        {selectedRole}
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
                        {['USER', 'ADMIN'].map((role) => (
                          <Listbox.Option
                            key={role}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-3 pr-9 ${
                                active ? 'bg-primary-600 text-white' : 'text-gray-900'
                              }`
                            }
                            value={role}
                          >
                            {({ selected, active }) => (
                              <>
                                <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                                  {role === 'ADMIN' ? (
                                    <ShieldCheck size={16} className="inline-block mr-2" />
                                  ) : (
                                    <UserIcon size={16} className="inline-block mr-2" />
                                  )}
                                  {role}
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
                </>
              )}
            </Listbox>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={handleCloseRoleModal}
                className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRoleUpdate}
                className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                Update Role
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserManagementPage;
