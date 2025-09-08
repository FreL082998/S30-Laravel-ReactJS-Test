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
    <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-lg p-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-gray-700">Roles</legend>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {ROLES.map((role) => (
            <RoleCheckbox key={role} role={role} checked={roles.includes(role)} onToggle={toggleRole} />
          ))}
        </div>
      </fieldset>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none"
      >
        Create User
      </button>
    </form>
  );
};

export default UserForm;
