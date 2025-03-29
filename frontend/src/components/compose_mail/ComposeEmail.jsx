
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSendEmailMutation } from '../features/emailApi';
import { useSaveDraftMutation } from '../features/authApi';

function ComposeEmail() {
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [sendEmail, { isLoading: isSending }] = useSendEmailMutation();
    const [saveDraft, { isLoading: isSavingDraft }] = useSaveDraftMutation();
    const navigate = useNavigate();

    const handleSaveDraft = async () => {
        try {
            await saveDraft({
                receipent: recipient,
                subject: subject,
                body: body,
            }).unwrap();
            toast.success('Draft saved successfully!');
        } catch (error) {
            toast.error(error?.data?.message || 'Failed to save draft.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await sendEmail({ receipent: recipient, subject, body });
            console.log("send email response ", result);
            if (result.data) {
                toast.success('Email sent successfully!');
                navigate('/');
            } else if (result.error) {
                toast.error(result.error.data.message || 'Failed to send email.');
            }
        } catch (err) {
            toast.error('An unexpected error occurred.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
                <h2 className="text-2xl font-semibold mb-6 text-center">Compose Email</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipient">
                            Recipient
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="recipient"
                            type="email"
                            placeholder="Recipient Email"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
                            Subject
                        </label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="subject"
                            type="text"
                            placeholder="Subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">
                            Body
                        </label>
                        <textarea
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-48 resize-vertical"
                            id="body"
                            placeholder="Email Body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleSaveDraft}
                            disabled={isSavingDraft}
                        >
                            {isSavingDraft ? 'Saving Draft...' : 'Save Draft'}
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            disabled={isSending}
                        >
                            {isSending ? 'Sending...' : 'Send'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ComposeEmail;