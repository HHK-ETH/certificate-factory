//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract CertificateFactory is Ownable {

    //hash => ipfs hash
    mapping (string => string) public certificates;

    event logAddCertificate(string indexed hash, string ipfsHash);
    event logRemoveCertificate(string indexed hash);

    function addCertificate(string calldata _hash, string calldata _ipfsHash) onlyOwner() external {
        require(bytes(certificates[_hash]).length == 0, 'CertificateFactory: This hash already exist');
        certificates[_hash] = _ipfsHash;
        emit logAddCertificate(_hash, _ipfsHash);
    }

    function removeCertificate(string calldata _hash) onlyOwner() external {
        delete certificates[_hash];
        emit logRemoveCertificate(_hash);
    }
}
