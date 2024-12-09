import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminDashboard.css'; 

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [nameFilter, setNameFilter] = useState('');
    const [nicFilter, setNicFilter] = useState('');
    const [dobFilter, setDobFilter] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8085/ht/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);

    const formatDate = (date) => {
        const d = new Date(date);
        const day = (`0${d.getDate()}`).slice(-2);
        const month = (`0${d.getMonth() + 1}`).slice(-2);
        const year = d.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const filteredUsers = users.filter(user => {
        const nameMatch = user.name.toLowerCase().includes(nameFilter.toLowerCase());
        const nicMatch = user.nic ? user.nic.toLowerCase().includes(nicFilter.toLowerCase()) : true;
        const dobMatch = user.nic ? true : formatDate(user.dateOfBirth).includes(dobFilter);

        return nameMatch && nicMatch && dobMatch;
    });

    return (
        <div className="user-list-container">
            <h2>User List</h2>
            <div className="filters">
                <input
                    type="text"
                    placeholder="Filter by name"
                    value={nameFilter}
                    onChange={(e) => setNameFilter(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Filter by NIC"
                    value={nicFilter}
                    onChange={(e) => setNicFilter(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Filter by Date of Birth (dd.mm.yyyy)"
                    value={dobFilter}
                    onChange={(e) => setDobFilter(e.target.value)}
                />
            </div>
            <table className="user-list-table">
                <thead>
                    <tr>
                        <th>Patient Name</th>
                        <th>Email</th>
                        <th>NIC</th>
                        <th>Date of Birth</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.nic}</td>
                            <td>{formatDate(user.dateOfBirth)}</td>
                            <td>
                                <Link to={`/patients/${user.id}`}>
                                    <button>View</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
