import React, { useState } from 'react';
import RoleCheckbox from '../components/RoleCheckbox';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../middleware/redux';
import { createUser } from '../redux/users';

const ROLES = ['Author', 'Editor', 'Subscriber', 'Administrator'];

const UserForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const toggleRole = (role: string) => {
    setRoles((prev) => (prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !email.trim() || roles.length === 0) {
      return setError('All fields are required and at least one role must be selected');
    }

    try {
      await dispatch(createUser({ full_name: fullName, email, roles })).unwrap();
      navigate(`/users/${roles[0]}`);
    } catch (err: any) {
      setError(err?.message || 'Failed to create user');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create New User</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            placeholder="Juan Dela Cruz"
            className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 transition-all duration-200 hover:border-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="email@example.com"
            className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 transition-all duration-200 hover:border-gray-400"
          />
        </div>

        <fieldset className="border border-gray-200 rounded-lg p-4">
          <legend className="text-sm font-medium text-gray-700 px-1">Roles</legend>
          <div className="grid grid-cols-2 gap-3 mt-3">
            {ROLES.map((role) => (
              <RoleCheckbox key={role} role={role} checked={roles.includes(role)} onToggle={toggleRole} />
            ))}
          </div>
        </fieldset>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 p-2 rounded-md border border-red-100">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default UserForm;
