import {expect} from "chai";
import {Contract} from "ethers";
import {hashMessage} from "ethers/lib/utils";

const hre = require("hardhat");

describe('Certificate Factory', function () {

    let certificateFactory: Contract;

    describe('Deploy Certificate Factory', function () {
        it('Set deployer as the owner', async function () {
            const factory = await hre.ethers.getContractFactory('CertificateFactory');
            certificateFactory = await factory.deploy();
            await certificateFactory.deployed();
        });
    });

    describe('Manage certificates', function () {
        it('Add a certificate', async function() {
            const hash: string = hashMessage('test');
            const ipfsHash: string = hashMessage('ipfs');
            await certificateFactory.addCertificate(hash, ipfsHash);
            expect(await certificateFactory.certificates(hash)).to.equal(ipfsHash);
        });

        it('Revert add certificate because already exist', async function() {
            const hash: string = hashMessage('test');
            const ipfsHash: string = hashMessage('ipfs');
            // @ts-ignore
            await expect(certificateFactory.addCertificate(hash, ipfsHash)).to.be.revertedWith('CertificateFactory: This hash already exist');
        });

        it('Remove a certificate', async function() {
            const hash: string = hashMessage('test');
            await certificateFactory.removeCertificate(hash);
            expect(await certificateFactory.certificates(hash)).to.equal('');
        });
    })
});
