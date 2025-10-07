import React, { useState } from 'react';
import '../App.css';

const Login = ({ onLogin }) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const handleAdminLogin = async () => {
        const response = await fetch('/api/users/adminLogin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, password })
        });
        const data = await response.json();
        if (data.success) {
            onLogin(data.role, data.canAddEvidence, userId);
        } else {
            alert('Admin login failed');
        }
    };

    const handleUserLogin = async () => {
        const response = await fetch('/api/users/userLogin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, password })
        });
        const data = await response.json();
        if (data.success) {
            onLogin(data.role, data.canAddEvidence, userId);
        } else {
            alert('User login failed');
        }
    };

    return (
        <div className="Login">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div>
                <button onClick={handleAdminLogin}>Login as Admin</button>
                <button onClick={handleUserLogin}>Login as User</button>
            </div>
        </div>
    );
};

export default Login;   