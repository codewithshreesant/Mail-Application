import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Outlet } from 'react-router-dom';

function AdminDashboard() {
  return (
      <div className="min-h-screen flex">
        <div className="bg-blue-800 text-white w-64 flex flex-col items-start p-4">
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
          <nav>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/admin/dashboard/users"
                  className="block py-2 px-4 bg-blue-700 hover:bg-blue-600 rounded"
                >
                  Users
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/dashboard/sentemails"
                  className="block py-2 px-4 bg-blue-700 hover:bg-blue-600 rounded"
                >
                  Sent Emails
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/dashboard/drafts"
                  className="block py-2 px-4 bg-blue-700 hover:bg-blue-600 rounded"
                >
                  Drafts
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/dashboard/important"
                  className="block py-2 px-4 bg-blue-700 hover:bg-blue-600 rounded"
                >
                  Important
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <Outlet />
      </div>
  );
}

export default AdminDashboard;
