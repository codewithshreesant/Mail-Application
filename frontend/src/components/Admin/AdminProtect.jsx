import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AdminProtect({ children }) {
    const user = useSelector((state) => state.user); 
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.user?.isAdmin) {
            navigate('/'); 
        }
    }, [user, navigate]); 

    if (user?.user?.isAdmin) {
        return <>{children}</>;
    } else {
        return null; 
    }
}

export default AdminProtect;
