import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok && data.token) {
                login(data.token);
                // Redirect to main app after login
                navigate('/');
            } else {
                setMessage(data.error || 'Login failed');
            }
        } catch (err) {
            setMessage('Error: ' + err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
            <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required />
            <button type="submit">Login</button>
            {message && <p>{message}</p>}
        </form>
    );
}
