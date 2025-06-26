import React from 'react';
import { useUsers } from "../api/queries/users.js";

const Users = () => {
    const { data: users, isLoading, isError, error } = useUsers();

    if (isLoading) return <p>Loading users...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <ul>
            {users.map((user) => (
                <li key={user._id}>{user.name} ({user.email})</li>
            ))}
        </ul>
    );
};

export default Users;
