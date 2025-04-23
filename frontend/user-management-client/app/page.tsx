'use client';

import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UsersTable from '../components/UsersTable';
import UserForm from '../components/UserForm';
import Modal from '../components/Modal';
import DeleteConfirmation from '../components/DeleteConfirmation';
import { fetchUsers, createUser, updateUser, deleteUser } from '../services/api';
import { User, CreateUserDto, UpdateUserDto } from '../types';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setIsLoading(true);
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      toast.error('Failed to fetch users');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async (data: CreateUserDto) => {
    try {
      await createUser(data);
      toast.success('User created successfully');
      setIsFormModalOpen(false);
      loadUsers();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create user');
      console.error(error);
    }
  };

  const handleUpdateUser = async (data: UpdateUserDto) => {
    if (!selectedUser) return;
    
    try {
      await updateUser(selectedUser.id, data);
      toast.success('User updated successfully');
      setIsFormModalOpen(false);
      setSelectedUser(null);
      loadUsers();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update user');
      console.error(error);
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    
    try {
      await deleteUser(selectedUser.id);
      toast.success('User deleted successfully');
      setIsDeleteModalOpen(false);
      setSelectedUser(null);
      loadUsers();
    } catch (error) {
      toast.error('Failed to delete user');
      console.error(error);
    }
  };

  const openCreateForm = () => {
    setSelectedUser(null);
    setIsFormModalOpen(true);
  };

  const openEditForm = (user: User) => {
    setSelectedUser(user);
    setIsFormModalOpen(true);
  };

  const openDeleteConfirmation = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = (data: CreateUserDto | UpdateUserDto) => {
    if (selectedUser) {
      handleUpdateUser(data);
    } else {
      handleCreateUser(data as CreateUserDto);
    }
  };

  return (
    <div className="container mx-auto">
      <ToastContainer position="top-right" />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          onClick={openCreateForm}
          className="btn btn-primary"
        >
          Add New User
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <UsersTable
          users={users}
          onEdit={openEditForm}
          onDelete={openDeleteConfirmation}
        />
      )}

      <Modal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)}>
        <UserForm
          user={selectedUser || undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormModalOpen(false)}
        />
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <DeleteConfirmation
          onConfirm={handleDeleteUser}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      </Modal>
    </div>
  );
}