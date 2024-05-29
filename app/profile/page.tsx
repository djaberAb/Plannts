"use client"

import { User } from '@/utils/interfaces';
import React, { useEffect, useState } from 'react';


export default function Profile () {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Fetch user data from API or database
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/user');
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUserData();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>User Profile</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>First Name: {user.firstname}</p>
            <p>Last Name: {user.lastname}</p>
            <p>Address: {user.address}</p>
            <p>Phone: {user.phone}</p>
        </div>
    );
};
