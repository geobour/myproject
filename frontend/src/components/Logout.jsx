import React, { useContext } from 'react';
import {AuthContext} from "../AuthContext.jsx";

export default function Logout() {
    const { logout } = useContext(AuthContext);
    return <button onClick={logout}>Logout</button>;
}
