import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok) {
                // Registration successful: redirect to login page
                navigate('/login');
            } else {
                setMessage(data.error || 'Registration failed');
            }
        } catch (err) {
            setMessage('Error: ' + err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
            <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
            <input name="password" placeholder="Password" type="password" value={form.password} onChange={handleChange} required />
            <select name="role" value={form.role} onChange={handleChange}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            <button type="submit">Register</button>
            {message && <p>{message}</p>}
        </form>
    );
}
