import React, { useState } from 'react';
import { useGetAllInboxesQuery } from '../features/authApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPaperPlane,
  faTrash,
  faStar,
  faClock,
  faInbox,
  faExclamationTriangle, 
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Aside from '../Aside';

function Inbox() {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const {
        data: emails,
        error,
        isLoading,
        refetch, 
    } = useGetAllInboxesQuery({
        page: currentPage,
        limit: itemsPerPage,
    });

    console.log('all inbox query ', emails);

    let content;

    if (isLoading) {
        content = (
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
                <span className="ml-4 text-lg text-gray-600">Fetching your mail...</span>
            </div>
        );
    } else if (error) {
        content = (
            <div className="flex flex-col justify-center items-center h-full text-gray-600">
                <FontAwesomeIcon icon={faExclamationTriangle} size="3x" className="mb-6 text-red-400" />
                <h2 className="text-xl font-semibold mb-2">Trouble connecting?</h2>
                <p className="text-center text-sm text-gray-500 mb-4">
                    It seems there might be a temporary issue fetching your emails.
                    Please check your internet connection or try again.
                </p>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline"
                    onClick={refetch}
                >
                    Try Again
                </button>
            </div>
        );
    } else if (emails && emails.data && emails.data.length > 0) {
        content = (
            <div className="divide-y divide-gray-200">
                {emails.data.map((email) => (
                    <Link
                        key={email._id}
                        to={`/emails/${email.messageId}`}
                        className={`flex items-center p-4 hover:bg-blue-50 transition-colors duration-150 cursor-pointer ${email.read ? 'bg-white' : 'bg-blue-50'
                            }`}
                    >
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-200 flex items-center justify-center mr-4">
                            <span className="font-semibold text-indigo-700">
                                {email.recipient.split('@')[0].charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="flex-grow">
                            <div className="flex justify-between items-center">
                                <div className="font-semibold text-gray-800">{email.sender}</div>
                                <div className="text-sm text-gray-500">
                                    {new Date(email.date).toLocaleString()}
                                </div>
                            </div>
                            <div className="truncate text-gray-700">{email.subject}</div>
                            <div className="text-sm text-gray-500 truncate">
                                {email.body.substring(0, 100)}...
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        );
    } else {
        content = (
            <div className="flex flex-col justify-center items-center h-full text-gray-600">
                <FontAwesomeIcon icon={faInbox} size="3x" className="mb-6 text-blue-300" />
                <h2 className="text-xl font-semibold mb-2">Your inbox is looking serene.</h2>
                <p className="text-center text-sm text-gray-500">
                    No new emails to display right now. Enjoy the peace!
                </p>
            </div>
        );
    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="flex h-full bg-gray-50">
            <Aside />
            <main className="flex-1 overflow-y-auto bg-white shadow-md rounded-lg m-4">
                <div className="sticky top-0 bg-white p-4 border-b border-gray-200">
                    <input
                        type="text"
                        placeholder="Search Inbox"
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300 shadow-sm"
                    />
                </div>
                {content}
                {emails && emails.pagination && emails.pagination.totalPages > 1 && (
                    <div className="flex justify-center p-4 border-t border-gray-200 bg-white">
                        {Array.from(
                            { length: emails.pagination.totalPages },
                            (_, index) => index + 1
                        ).map((page) => (
                            <button
                                key={page}
                                className={`mx-1 px-4 py-2 rounded-md shadow-sm ${currentPage === page
                                    ? 'bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1'
                                    }`}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Inbox;