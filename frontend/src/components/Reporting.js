import React, { useState } from 'react';
import { BrowserProvider, Contract } from 'ethers';
import '../App.css';

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS; // Replace with your contract address
const contractABI = [
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

const Reporting = () => {
    const [evidenceId, setEvidenceId] = useState('');
    const [accessLogs, setAccessLogs] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAccessLogs = async () => {
		if (!window.ethereum) {
			alert('MetaMask is not installed!');
			return;
		}
	
		if (!evidenceId.trim()) {
			alert('Please enter an Evidence ID');
			return;
		}
	
		try {
			setLoading(true);
			const provider = new BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			const contract = new Contract(contractAddress, contractABI, signer);
	
			console.log(`Fetching logs for evidenceId: "${evidenceId.trim()}"`);
	
			// Call contract with trimmed ID
			const logs = await contract.getAccessLogsByEvidenceId(evidenceId.trim());
	
			console.log('Fetched Logs:', logs);
	
			if (logs.length === 0) {
				alert('No access logs found');
				setAccessLogs([]);
				return;
			}
	
			// Ensure logs are correctly formatted
			const formattedLogs = logs.map(log => ({
				evidenceId: log.evidenceId,
				userId: log.userId,
				reason: log.reason,
				caseNumber: log.caseNumber,
				timestamp: log.timestamp.toString() // Ensure timestamp is a string
			}));
	
			setAccessLogs(formattedLogs);
		} catch (err) {
			console.error('Error fetching logs:', err);
			alert(`Failed to fetch access logs: ${err.message}`);
		} finally {
			setLoading(false);
		}
	};
	

    return (
        <div className="Reporting">
            <input
                type="text"
                placeholder="Evidence ID"
                value={evidenceId}
                onChange={(e) => setEvidenceId(e.target.value)}
            />
            <button onClick={getAccessLogs} disabled={loading}>
                {loading ? 'Fetching...' : 'Get Access Logs'}
            </button>
            <ul>
                {accessLogs.map((log, index) => (
                    <li key={index}>
                        Evidence ID: {log.evidenceId}, User ID: {log.userId}, Reason: {log.reason}, Timestamp: {log.timestamp}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Reporting;