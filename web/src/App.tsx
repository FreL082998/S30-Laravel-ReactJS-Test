import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import UserForm from './modules/users/components/UserForm';
import UserList from './modules/users/components/UserList';

export default function App() {
  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">CRUD</h1>
        <nav className="flex gap-6">
          <Link to="/create" className="text-blue-600 hover:underline">Create User</Link>
          <Link to="/users" className="text-blue-600 hover:underline">List of Users</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/create" replace />} />
          <Route path="/create" element={<UserForm />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </main>
    </div>
  );
}
