import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';


const Dashboard = () => {
    const users = useLoaderData(); // Loaded users (if needed)
    const { user } = useContext(AuthContext); // Get logged-in user from context

    if (!user) {
        return <p>Loading...</p>; 
    }

    return (
        <>
            <h2>User Dashboard</h2>
            <div className="avatar">
                <div className="w-24 rounded-full">
                    <img src={users.photo} alt="User Avatar" />
                </div>
            </div>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
        </>
    );
};

export default Dashboard;
