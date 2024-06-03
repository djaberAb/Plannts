import React, { useState, useEffect } from 'react';
import { User } from '@/utils/interfaces';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: Partial<User>) => void;
  initialUser?: Partial<User>;
}

export const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSave, initialUser }) => {
  const [user, setUser] = useState<Partial<User>>(initialUser || {});

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    } else {
      setUser({ role: 'client' });  // default to 'client' if not editing
    }
  }, [initialUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(user);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded">
        <h2 className="text-xl font-bold mb-4">{initialUser ? 'Edit User' : 'Add User'}</h2>
        <form onSubmit={handleSubmit}>
          {/* Other input fields */}
          <div className="mb-4">
            <Label className="block">Role</Label>
            <select
              name="role"
              value={"client" || user.role }
              onChange={handleChange}
              className="border p-1 w-full"
            >
              <option value="admin">admin</option>
              <option value="client">client</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="p-2 bg-gray-300 rounded">Cancel</button>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};
