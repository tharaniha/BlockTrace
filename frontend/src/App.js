import React, { useState } from 'react';
import Login from './components/Login';
import UserManagement from './components/UserManagement';
import EvidenceManagement from './components/EvidenceManagement';
import AccessLogging from './components/AccessLogging';
import Reporting from './components/Reporting';
import './App.css';

function App() {
    const [role, setRole] = useState('');
    const [canAddEvidence, setCanAddEvidence] = useState(false);
    const [userId, setUserId] = useState('');

    const handleLogin = (role, canAddEvidence, userId) => {
        setRole(role);
        setCanAddEvidence(canAddEvidence);
        setUserId(userId);
    };

    const handleLogout = () => {
        setRole('');
        setCanAddEvidence(false);
        setUserId('');
    };

    return (
        <div className="App">
            <h1>Chain of Custody</h1>
            {!role ? (
                <Login onLogin={handleLogin} />
            ) : (
                <>
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                    {role === 'admin' && <UserManagement />}
                    <EvidenceManagement userId={userId} canAddEvidence={canAddEvidence} />
                    <AccessLogging userId={userId} />
                    <Reporting />
                </>
            )}
        </div>
    );
}

export default App;