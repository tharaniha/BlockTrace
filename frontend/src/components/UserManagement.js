import React, { useState } from 'react';
import '../App.css';

const UserManagement = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [canAddEvidence, setCanAddEvidence] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState('');

    const addUser = async () => {
        const response = await fetch('/api/users/addUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, password, role, canAddEvidence })
        });
        const data = await response.json();
        if (data.success) {
            alert('User added successfully');
        } else {
            alert('Failed to add user');
        }
    };

    const deleteUser = async () => {
        const response = await fetch(`/api/users/deleteUser/${deleteUserId}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        if (data.success) {
            alert('User deleted successfully');
        } else {
            alert('Failed to delete user');
        }
    };

    return (
        <><div className="UserManagement">
            <h2>Add User</h2>
            <input type="text" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
            <label>
                Can Add Evidence:
                <input type="checkbox" checked={canAddEvidence} onChange={(e) => setCanAddEvidence(e.target.checked)} />
            </label>
            <button onClick={addUser}>Add User</button>
        </div><div className="UserManagement">
                <h2>Delete User</h2>
                <input type="text" placeholder="User ID" value={deleteUserId} onChange={(e) => setDeleteUserId(e.target.value)} />
                <button onClick={deleteUser}>Delete User</button>
            </div></>
    );
};

export default UserManagement;