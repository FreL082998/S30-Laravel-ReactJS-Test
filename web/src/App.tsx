import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
export default function App() {
  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Users & Roles</h1>
        <nav className="flex gap-6">
          <Link to="/create" className="text-blue-600 hover:underline">Create User</Link>
          <Link to="/users/Author" className="text-blue-600 hover:underline">Users by Role</Link>
        </nav>
      </header>
    </div>
  );
}
