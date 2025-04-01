import React, { useState, useEffect } from 'react';

interface UserProfile {
    id: string;
    name: string;
    email: string;
    bio: string;
}

const UserProfile: React.FC = () => {

    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try{
                const response = await fetch('/api/user');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUser(data);
            }catch (error) {
                setError('Failed to fetch user data');
            }finally
            {
                setLoading(false);
        } 
        };
        fetchUserData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }
return (
    <div className="p-4 border rounded-md shadow-lg">
      <h1 className="text-2xl font-semibold">{user?.name}</h1>
      <p>{user?.bio}</p>
      <p>Email: {user?.email}</p>
    </div>
    );
};


export default UserProfile;