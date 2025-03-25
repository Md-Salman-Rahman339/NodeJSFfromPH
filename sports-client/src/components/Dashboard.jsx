import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';


const Dashboard = () => {
    const users = useLoaderData(); 
    const { user } = useContext(AuthContext); 
    console.log(user)

   

    return (
        <>
            <h2>User Dashboard</h2>
            <p className='text-fuchsia-700'>Email: {user.email}</p>
        </>
    );
};

export default Dashboard;
