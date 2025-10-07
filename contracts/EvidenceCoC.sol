// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EvidenceCoC {
    // Structs
    struct Evidence {
        bytes32 evidenceId;
        bytes32 evidenceHash;
        uint256 timestamp;
    }

    struct AccessLog {
        bytes32 evidenceId;
        bytes32 userId;
        string reason;
        uint256 timestamp;
    }

    // State Variables
    Evidence[] public evidences;
    AccessLog[] public accessLogs;

    // Events
    event EvidenceAdded(bytes32 evidenceId, bytes32 evidenceHash, uint256 timestamp);
    event AccessLogged(bytes32 evidenceId, bytes32 userId, string reason, uint256 timestamp);

    // Add Evidence
    function addEvidence(bytes32 _evidenceId, bytes32 _evidenceHash) public {
        evidences.push(Evidence({
            evidenceId: _evidenceId,
            evidenceHash: _evidenceHash,
            timestamp: block.timestamp
        }));
        emit EvidenceAdded(_evidenceId, _evidenceHash, block.timestamp);
    }

    // Log Access
    function logAccess(bytes32 _evidenceId, bytes32 _userId, string memory _reason) public {
        accessLogs.push(AccessLog({
            evidenceId: _evidenceId,
            userId: _userId,
            reason: _reason,
            timestamp: block.timestamp
        }));
        emit AccessLogged(_evidenceId, _userId, _reason, block.timestamp);
    }

    // Get All Evidence
    function getEvidences() public view returns (Evidence[] memory) {
        return evidences;
    }

    // Get Access Logs by Evidence ID
    function getAccessLogsByEvidenceId(bytes32 _evidenceId) public view returns (AccessLog[] memory) {
        AccessLog[] memory result = new AccessLog[](accessLogs.length);
        uint counter = 0;
        for (uint i = 0; i < accessLogs.length; i++) {
            if (accessLogs[i].evidenceId == _evidenceId) {
                result[counter] = accessLogs[i];
                counter++;
            }
        }
        return result;
    }
}