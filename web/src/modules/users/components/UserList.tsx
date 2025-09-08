import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../middleware/redux';
import { fetchUsersByRole } from '../redux/users';

const UserList: React.FC = () => {
  const { role } = useParams<{ role: string }>();
  const dispatch = useAppDispatch();
  const { list, status, error } = useAppSelector((s) => s.users);

  useEffect(() => {
    if (role) dispatch(fetchUsersByRole(role));
  }, [role, dispatch]);

  if (status === 'loading') return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Users with role: {role}</h2>
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
