import React, { useEffect, useState } from 'react';
import PatientPortal from './PatientPortal';

const UserDashboard = () => {
    const [userId, setUserId] = useState('');

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        console.log('Stored User ID:', storedUserId); // Debugging log
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    if (!userId) {
        return <div>Loading...</div>; // Show loading text while fetching user ID
    }

    return (
        <div>
            <PatientPortal userId={userId} />
        </div>
    );
};

export default UserDashboard;
