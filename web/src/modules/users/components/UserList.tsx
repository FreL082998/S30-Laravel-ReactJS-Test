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
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-xl border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">Users</h2>
        <div className="flex items-center space-x-2">
          <label htmlFor="role" className="font-medium text-gray-700">
            Filter by Role:
          </label>
          <select
            id="role"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      {status === 'loading' && (
        <p className="text-gray-500 text-center py-4">Loading users...</p>
      )}

      {error && (
        <p className="text-red-600 bg-red-50 p-3 rounded-md border border-red-100 mb-4">{error}</p>
      )}

      {list.length === 0 && status !== 'loading' ? (
        <p className="text-gray-500 text-center py-4">No users found</p>
      ) : (
        <ul className="space-y-4">
          {list.map((user) => (
            <li
              key={user.id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:bg-gray-50"
            >
              <p className="font-medium text-gray-800">{user.full_name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-xs text-gray-500 mt-1">
                Roles: {user.roles.join(', ')}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
