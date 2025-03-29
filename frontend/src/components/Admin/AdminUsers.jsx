import React from 'react';
import { useGetCurrentUserQuery, useLogoutUserMutation } from '../features/authApi'; // Import logout mutation

function AdminUsers() {
  const { data, error, isLoading } = useGetCurrentUserQuery();
  const [logoutUser] = useLogoutUserMutation();

  const handleSignOut = async () => {
    try {
      await logoutUser().unwrap();
      localStorage.removeItem('user');
      window.location.href = '/';
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {isLoading && <p className="text-gray-700">Loading...</p>}
      {error && <p className="text-red-500">Error fetching data.</p>}
      {data && (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-blue-800">Admin User Details</h1>
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Sign Out
            </button>
          </div>
          <table className="w-full mb-6 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-800 text-white">
                <th className="py-2 px-4 border border-gray-300">Email</th>
                <th className="py-2 px-4 border border-gray-300">Admin Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-gray-700 text-center">
                <td className="py-2 px-4 border border-gray-300">{data.email}</td>
                <td className="py-2 px-4 border border-gray-300">{data.isAdmin ? 'Yes' : 'No'}</td>
              </tr>
            </tbody>
          </table>
          <h2 className="text-xl font-semibold mb-2 text-blue-800">SMTP Configuration</h2>
          <table className="w-full mb-6 border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-800 text-white">
                <th className="py-2 px-4 border border-gray-300">Host</th>
                <th className="py-2 px-4 border border-gray-300">Port</th>
                <th className="py-2 px-4 border border-gray-300">Username</th>
                <th className="py-2 px-4 border border-gray-300">Secure</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-gray-700 text-center">
                <td className="py-2 px-4 border border-gray-300">{data.smtpConfig.host}</td>
                <td className="py-2 px-4 border border-gray-300">{data.smtpConfig.port}</td>
                <td className="py-2 px-4 border border-gray-300">{data.smtpConfig.username}</td>
                <td className="py-2 px-4 border border-gray-300">{data.smtpConfig.secure ? 'Yes' : 'No'}</td>
              </tr>
            </tbody>
          </table>
          <h2 className="text-xl font-semibold mb-2 text-blue-800">IMAP Configuration</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-800 text-white">
                <th className="py-2 px-4 border border-gray-300">Host</th>
                <th className="py-2 px-4 border border-gray-300">Port</th>
                <th className="py-2 px-4 border border-gray-300">Username</th>
                <th className="py-2 px-4 border border-gray-300">Secure</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-gray-700 text-center">
                <td className="py-2 px-4 border border-gray-300">{data.imapConfig.host}</td>
                <td className="py-2 px-4 border border-gray-300">{data.imapConfig.port}</td>
                <td className="py-2 px-4 border border-gray-300">{data.imapConfig.username}</td>
                <td className="py-2 px-4 border border-gray-300">{data.imapConfig.secure ? 'Yes' : 'No'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;
