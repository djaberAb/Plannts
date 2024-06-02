"use client"

import React, { useState, useEffect } from 'react';
import { useUser } from '@/utils/user_context';
import { useRouter } from 'next/navigation';
import SideNav from '@/components/sideNav_admin';
import { fetchUsers, addUser, editUser, deleteUser } from '../api/users';
import { User } from '@/utils/interfaces';
import UserModal from '@/components/user_modal';

const AdminUsers = () => {
  const { isLoggedIn, userData, logout } = useUser();
  const router = useRouter();
  const [users, setUsers] = useState<Omit<User, 'password'>[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUserData, setEditUserData] = useState<Partial<User> | undefined>(undefined);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUsers().then(setUsers);
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    if (typeof window !== 'undefined') {
      router.push('/login');
    }
    return null;
  }

  const handleAddUser = async (user: Omit<User, 'user_id'>) => {
    await addUser(user);
    const updatedUsers = await fetchUsers();
    setUsers(updatedUsers);
  };

  const handleEditUser = async (user: Partial<Omit<User, 'password'>>) => {
    if (user.user_id === undefined) {
      throw new Error('user_id is required');
    }
    await editUser(user as Omit<User, 'password'>);
    const updatedUsers = await fetchUsers();
    setUsers(updatedUsers);
  };

  const handleDeleteUser = async (userId: number) => {
    await deleteUser(userId);
    const updatedUsers = await fetchUsers();
    setUsers(updatedUsers);
  };

  const openModal = (user?: Omit<User, 'password'>) => {
    setEditUserData(user || undefined);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditUserData(undefined);
  };

  const handleSave = (user: Partial<User>) => {
    if (editUserData) {
      handleEditUser(user);
    } else {
      handleAddUser(user as Omit<User, 'user_id'>);
    }
    closeModal();
  };

  return (
    <div className="flex">
      <SideNav title={'Dashboard'} />
      <div className="ml-60 pt-2 px-4 space-y-2 bg-green-500 flex-grow pb-4 align">
        {userData && (
          <div>
            <h1 className='text-white font-bold mb-4 mt-1'>Manage Users</h1>
            <button onClick={() => openModal()} className="mb-4 p-2 bg-blue-500 text-white rounded">Add User</button>
            <div className="space-y-2">
              {users.map(user => (
                <div key={user.user_id} className="relative p-4 bg-white rounded shadow">
                  <div className="flex justify-between">
                    <div>
                      <h2 className="text-xl font-bold">{user.username}</h2>
                      <p>{user.email}</p>
                      <p>{user.firstname} {user.lastname}</p>
                      <p>{user.address}</p>
                      <p>{user.phone}</p>
                      <p>{user.role}</p>
                    </div>
                    <div className="space-x-2">
                      <button onClick={() => openModal(user)} className="p-1 bg-yellow-300 rounded">Edit</button>
                      <button onClick={() => handleDeleteUser(user.user_id)} className="p-1 bg-red-500 text-white rounded">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <UserModal isOpen={modalOpen} onClose={closeModal} onSave={handleSave} initialUser={editUserData} />
    </div>
  );
};

export default AdminUsers;
