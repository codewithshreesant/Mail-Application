import React from 'react';
import { useGetDraftQuery } from '../features/authApi';

function Drafts() {
    const { data: drafts, isLoading, isError, error } = useGetDraftQuery();

    console.log("draft emails are ", drafts);

    if (isLoading) {
        return <div className="p-4">Loading drafts...</div>;
    }

    if (isError) {
        return <div className="p-4 text-red-500">Error fetching drafts: {error.message}</div>;
    }

    if (!drafts || !drafts.data || drafts.data.length === 0) {
        return <div className="p-4">No drafts found.</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-6">Drafts</h2>
            <div className="space-y-4">
                {drafts.data.map((draft) => (
                    <div
                        key={draft._id}
                        className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <p className="font-semibold text-lg">{draft.subject || 'No Subject'}</p>
                                <p className="text-gray-600">To: {draft.receipent}</p>
                            </div>
                            <p className="text-sm text-gray-500">
                                {new Date(draft.createdAt).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                })}
                            </p>
                        </div>
                        <p className="text-gray-700 line-clamp-2">
                            {draft.body ? draft.body.substring(0, 150) + (draft.body.length > 150 ? '...' : '') : 'No Body'}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Drafts;