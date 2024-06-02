import React, { useState, useEffect } from 'react';
import { User } from '@/utils/interfaces';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: Omit<User, 'password'>) => void;
  initialUser?: Partial<Omit<User, 'password'>>;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSave, initialUser }) => {
  const [user, setUser] = useState<Partial<Omit<User, 'password'>>>(initialUser || {});

  useEffect(() => {
    setUser(initialUser || {});
  }, [initialUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(user as Omit<User, 'password'>);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md">
        <h2 className="text-xl mb-4">Manage User</h2>
        <input type="text" name="username" placeholder="Username" value={user.username || ''} onChange={handleChange} className="mb-2 p-2 border" />
        <input type="email" name="email" placeholder="Email" value={user.email || ''} onChange={handleChange} className="mb-2 p-2 border" />
        <input type="email" name="email" placeholder="Email" value={user.email || ''} onChange={handleChange} className="mb-2 p-2 border" />
        <input type="text" name="firstname" placeholder="First Name" value={user.firstname || ''} onChange={handleChange} className="mb-2 p-2 border" />
        <input type="text" name="lastname" placeholder="Last Name" value={user.lastname || ''} onChange={handleChange} className="mb-2 p-2 border" />
        <input type="text" name="address" placeholder="Address" value={user.address || ''} onChange={handleChange} className="mb-2 p-2 border" />
        <input type="text" name="phone" placeholder="Phone" value={user.phone || ''} onChange={handleChange} className="mb-2 p-2 border" />
        <select name="role" value={user.role || ''} onChange={handleChange} className="mb-2 p-2 border">
          <option value="" disabled>Select Role</option>
          <option value="admin">Admin</option>
          <option value="client">Client</option>
        </select>
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-2 p-2 bg-gray-200 rounded">Cancel</button>
          <button onClick={handleSave} className="p-2 bg-green-500 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
