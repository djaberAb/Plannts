// components/AdminUsers.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useUser } from '@/utils/user_context';
import { useRouter } from 'next/navigation';
import SideNav from '@/components/sideNav_admin';
import { fetchUsers, addUser, editUser, deleteUser } from '../api/users';
import { User } from '@/utils/interfaces';
import {UserModal} from '@/components/user_modal';

const AdminUsers = () => {
  const { isLoggedIn, userData } = useUser();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUserData, setEditUserData] = useState<Partial<User> | undefined>(undefined);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUsers().then(setUsers);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn && typeof window !== 'undefined') {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  const handleAddUser = async (user: Partial<User>) => {
    await addUser(user);
    const updatedUsers = await fetchUsers();
    setUsers(updatedUsers);
  };

  const handleEditUser = async (user: Partial<User>) => {
    await editUser(user);
    const updatedUsers = await fetchUsers();
    setUsers(updatedUsers);
  };

  const handleDeleteUser = async (userId: number) => {
    await deleteUser(userId);
    const updatedUsers = await fetchUsers();
    setUsers(updatedUsers);
  };

  const openModal = (user?: Partial<User>) => {
    setEditUserData(user || {});
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditUserData(undefined);
  };

 const handleSave = (user: Partial<User>) => {
  if (editUserData && editUserData.user_id) {
    handleEditUser(user);
  } else {
    handleAddUser(user as Omit<User, 'user_id'>);
  }
  closeModal();
};

  return (
    <div className="flex">
      <SideNav title={'Dashboard'} />
      <div className="ml-60 pt-2 px-4 space-y-4 flex-grow">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Users</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => openModal()}>
            Add User
          </button>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Username</th>
                <th className="text-left">Email</th>
                <th className="text-left">First Name</th>
                <th className="text-left">Last Name</th>
                <th className="text-left">Role</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.user_id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => openModal(user)}>
                      Edit
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded ml-2" onClick={() => handleDeleteUser(user.user_id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {modalOpen && (
          <UserModal
            isOpen={modalOpen}
            onClose={closeModal}
            onSave={handleSave}
            initialUser={editUserData}
          />
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
