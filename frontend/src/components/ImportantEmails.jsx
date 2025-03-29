import React, { useState, useEffect } from 'react';
import { useGetAllInboxesQuery } from './features/authApi';
import Aside from './Aside';

function ImportantEmails({ emails }) {
    return (
        <div className="divide-y divide-gray-200">
            {emails &&
                emails.map((email) => (
                    <div
                        key={email._id}
                        className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer ${email.read ? 'bg-white' : 'bg-gray-100'
                            }`}
                    >
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center mr-4">
                            <span className="font-semibold text-blue-700">
                                {email.recipient.split('@')[0].charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="flex-grow">
                            <div className="flex justify-between items-center">
                                <div className="font-semibold">{email.sender}</div>
                                <div className="text-sm text-gray-500">
                                    {new Date(email.date).toLocaleString()}
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
    );
}

function isEmailImportant(email) {
    const importantKeywords = ['urgent', 'important', 'action required', 'critical'];
    const subject = email.subject ? email.subject.toLowerCase() : '';
    const body = email.body ? email.body.toLowerCase() : '';

    for (const keyword of importantKeywords) {
        if (subject.includes(keyword) || body.includes(keyword)) {
            return true;
        }
    }
    return false;
}

function ImportantEmailsPage() {
    const { data: emails, error, isLoading } = useGetAllInboxesQuery();
    const [importantEmails, setImportantEmails] = useState();
    useEffect(() => {
        if (emails && emails.data && emails.data.length > 0) {
            const important = emails.data.filter(email => isEmailImportant(email));
            setImportantEmails(important);
        }
    }, [emails]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className='flex gap-[2rem]'>
            <Aside />
            <ImportantEmails emails={importantEmails} />
        </div>
    )
}

export default ImportantEmailsPage;