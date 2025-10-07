import React, { useState } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import '../App.css';

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS; // Replace with your contract address
const contractABI =[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "evidenceId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "userId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "reason",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "caseNumber",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "AccessLogged",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_evidenceId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_evidenceHash",
				"type": "string"
			}
		],
		"name": "addEvidence",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "evidenceId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "evidenceHash",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "EvidenceAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_evidenceId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_evidenceHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_userId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_reason",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_caseNumber",
				"type": "string"
			}
		],
		"name": "logAccess",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "accessLogs",
		"outputs": [
			{
				"internalType": "string",
				"name": "evidenceId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "evidenceHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "userId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "reason",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "caseNumber",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "evidences",
		"outputs": [
			{
				"internalType": "string",
				"name": "evidenceId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "evidenceHash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_evidenceId",
				"type": "string"
			}
		],
		"name": "getAccessLogsByEvidenceId",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "evidenceId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "evidenceHash",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "userId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "reason",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "caseNumber",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct EvidenceCoC.AccessLog[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getEvidences",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "evidenceId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "evidenceHash",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct EvidenceCoC.Evidence[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const AccessLogging = ({ userId }) => {
    const [evidenceId, setEvidenceId] = useState('');
    const [evidenceHash, setEvidenceHash] = useState('');
    const [reason, setReason] = useState('');
    const [caseNumber, setCaseNumber] = useState('');
    const [loading, setLoading] = useState(false);

    const logAccess = async () => {
        if (!window.ethereum) {
            alert('MetaMask is not installed!');
            return;
        }

        if (!evidenceId || !evidenceHash || !reason || !caseNumber) {
            alert('Please fill all fields');
            return;
        }

        try {
            setLoading(true);
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new Contract(contractAddress, contractABI, signer);

            const tx = await contract.logAccess(evidenceId, evidenceHash, userId, reason, caseNumber);
            await tx.wait();
            alert('Access logged successfully!');
        } catch (err) {
            console.error('Error logging access:', err);
            alert('Failed to log access: Check console for details');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="AccessLogging">
            <h2>Log Access</h2>
            <input
                type="text"
                placeholder="Evidence ID"
                value={evidenceId}
                onChange={(e) => setEvidenceId(e.target.value)}
            />
            <input
                type="text"
                placeholder="Evidence Hash"
                value={evidenceHash}
                onChange={(e) => setEvidenceHash(e.target.value)}
            />
            <input
                type="text"
                placeholder="Reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
            />
            <input
                type="text"
                placeholder="Case Number"
                value={caseNumber}
                onChange={(e) => setCaseNumber(e.target.value)}
            />
            <button onClick={logAccess} disabled={loading}>
                {loading ? 'Logging...' : 'Log Access'}
            </button>
        </div>
    );
};

export default AccessLogging;