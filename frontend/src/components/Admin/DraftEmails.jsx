import React from 'react';
import { useGetDraftQuery } from '../features/authApi';

function DraftEmails() {
  const { data, error, isLoading } = useGetDraftQuery();
  const formatDateTime = (dateString) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(new Date(dateString));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">Draft Emails</h1>

      {isLoading && <p className="text-gray-700 text-center">Loading drafts...</p>}
      {error && (
        <p className="text-red-500 text-center">
          Failed to fetch drafts. Please try again later.
        </p>
      )}

      {data && data?.data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg border-collapse border border-gray-300">
            <thead className="bg-blue-800 text-white">
              <tr>
                <th className="py-2 px-4 border border-gray-300">Sender</th>
                <th className="py-2 px-4 border border-gray-300">Recipient</th>
                <th className="py-2 px-4 border border-gray-300">Subject</th>
                <th className="py-2 px-4 border border-gray-300">Body</th>
                <th className="py-2 px-4 border border-gray-300">Created At</th>
                <th className="py-2 px-4 border border-gray-300">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((email, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                  } text-center`}
                >
                  <td className="py-2 px-4 border border-gray-300">
                    {email.sender || '-'}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {email.receipent || '-'}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {email.subject || '-'}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {email.body || '-'}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {email.createdAt ? formatDateTime(email.createdAt) : '-'}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {email.updatedAt ? formatDateTime(email.updatedAt) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !isLoading && (
          <p className="text-gray-700 text-center">No draft emails found.</p>
        )
      )}
    </div>
  );
}

export default DraftEmails;
