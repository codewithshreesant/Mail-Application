import React from 'react';
import { useGetSingleEmailQuery } from './features/authApi';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUser, faPaperPlane, faTag } from '@fortawesome/free-solid-svg-icons';
import ReactHtmlParser from 'react-html-parser';

function SingleEmail() {
    const { messageId } = useParams();
    const { data: email, error, isLoading } = useGetSingleEmailQuery(messageId);
    console.log("single email ", email);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message || 'Failed to fetch email'}</div>;
    }

    if (!email) {
        return <div>Email not found.</div>;
    }

    return (
        <div className="container mx-auto mt-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b">
                    <h2 className="text-2xl font-semibold mb-2">{email?.data.subject}</h2>
                    <div className="flex items-center text-gray-600">
                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                        <span>
                            From: {email?.data.sender}
                        </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                        <span>
                            To: {email?.data.recipient}
                        </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                        <FontAwesomeIcon icon={faClock} className="mr-2" />
                        <span>
                            Date: {email?.data.date ? format(new Date(email?.data.createdAt), 'PPPP') : 'Date not available'}
                        </span>
                    </div>
                </div>
                <div className="p-6">
                    {email?.data.body ? (
                        <div className="email-body">
                            {ReactHtmlParser(email?.data.body)}
                        </div>
                    ) : (
                        <p>No email body content.</p>
                    )}
                </div>
                {email?.data.attachments && email?.data.attachments.length > 0 && (
                    <div className="px-6 py-4 border-t">
                        <h3 className="text-lg font-semibold mb-2">Attachments</h3>
                        <ul>
                            {email?.data.attachments.map((attachment, index) => (
                                <li key={index}>
                                    <a
                                        href={attachment.contentDisposition} 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        {attachment.filename}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SingleEmail;