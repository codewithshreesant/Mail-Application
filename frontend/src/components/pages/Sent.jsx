import React from 'react';
import { useGetSentEmailsQuery } from '../features/emailApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faTrash,
  faStar,
  faClock,
} from '@fortawesome/free-solid-svg-icons'; 
import { Link } from 'react-router-dom';
import Aside from '../Aside';

function Sent() {
  const { data: emails, error, isLoading } = useGetSentEmailsQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full text-red-500">
        Error: {error.message || 'Failed to fetch emails'}
      </div>
    );
  }

  return (
    <div className="flex h-full">
      <Aside />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b">
          <input
            type="text"
            placeholder="Search Sent"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="divide-y divide-gray-200">
          {emails &&
            emails?.data.map((email) => (
              <div
                key={email._id}
                className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer ${
                  email.read ? 'bg-white' : 'bg-gray-100'
                }`}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center mr-4">
                  <span className="font-semibold text-blue-700">
                    {(email.receipent).split('@')[0].charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">
                      {(email.receipent).split('@')[0]}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(email.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="truncate text-gray-700">{email.subject}</div>
                  <div className="text-sm text-gray-500 truncate">
                    {email.body.substring(0, 100)}...
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}

export default Sent;
