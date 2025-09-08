import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../middleware/redux';
import { fetchUsersByRole } from '../redux/users';

const roles = ['Administrator', 'Author', 'Editor', 'Subscriber'];

const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list, status, error } = useAppSelector((s) => s.users);
  const [selectedRole, setSelectedRole] = useState<string>(roles[0]);

  useEffect(() => {
    if (selectedRole) {
      dispatch(fetchUsersByRole(selectedRole));
    }
  }, [selectedRole, dispatch]);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Role:</label>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="border p-2 rounded"
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {status === 'loading' && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {list.length === 0 ? (
        <p className="text-gray-500">No users found</p>
      ) : (
        <ul className="space-y-3">
          {list.map((u) => (
            <li key={u.id} className="p-3 border rounded-md hover:bg-gray-50">
              <p className="font-medium">{u.full_name}</p>
              <p className="text-sm text-gray-600">{u.email}</p>
              <p className="text-xs text-gray-500">Roles: {u.roles.join(', ')}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
