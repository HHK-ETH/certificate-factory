import React, {useEffect, useState} from "react";
import {useWeb3React} from "@web3-react/core";
import {Web3Provider} from "ethers/providers";
import {Contract, providers} from "ethers";
import {FACTORY_ABI, s3} from "../constants";
import {sha256} from "js-sha256";
let factoryWithSigner: Contract;

async function checkFile(file: File) {
    if (file === null) {
        alert('Plz provide a valid file')
        return;
    }
    const fileData = await file.text();
    const hash = sha256(fileData);
    const isValidHash = await factoryWithSigner.certificates(hash);
    if (isValidHash) {
        //todo useState so we can update front
        alert('This file is valid : https://ipfs.io/ipfs/'+isValidHash);
    }
    else {
        alert('This file is invalid');
    }
}

async function addFile(file: File) {
    if (file === null) {
        alert('Plz provide a valid file')
        return;
    }
    const fileData = await file.text();
    const hash = sha256(fileData);
    const params = {
        Bucket: 'hhk-eth-team-bucket',
        Key: `nft/${Date.now()}`,
        ContentType: file.type,
        // Body contains the uploaded file
        Body: file,
        ACL: 'public-read',
    };

    const request = s3.putObject(params);
    request.on('httpHeaders', async (statusCode, headers) => {
        const ipfsHash = headers['x-fleek-ipfs-hash'];
        const tx = await factoryWithSigner.addCertificate(hash, ipfsHash);
        factoryWithSigner.once('logAddCertificate', () => {
            alert('File added with this hash : '+hash);
        });
    }).send();
}

async function removeFile(file: File) {
    if (file === null) {
        alert('Plz provide a valid file')
        return;
    }
    const fileData = await file.text();
    const hash = sha256(fileData);
    const tx = await factoryWithSigner.removeCertificate(hash);
    factoryWithSigner.once('logRemoveCertificate', () => {
        alert('File removed with this hash : '+hash);
    });
}

export default function Certificate(): JSX.Element {
    const context = useWeb3React<Web3Provider>();
    const { connector, library, chainId, account, activate, deactivate, active, error } = context;
    const [file, setFile]: [any, Function] = useState(null);

    useEffect(() => {
        async function test() {
            if (active) {
                const web3Provider = new providers.Web3Provider(await connector.getProvider());
                const factory = new Contract('0x5FbDB2315678afecb367f032d93F642f64180aa3', FACTORY_ABI, web3Provider);
                factoryWithSigner = await factory.connect(web3Provider.getSigner());
                console.log(await factoryWithSigner.certificates('unused hash'));
            }
        }
        test();
    }, [active]);

    if (!active) {
        return (
            <div className={'container text-center'}>
                <h3>Please connect your wallet to use this app</h3>
            </div>
        )
    }
    return (
        <div className={'container text-center'}>
            <div className="mb-3">
                <label htmlFor="formFile" className="form-label">Upload your file</label>
                <input className="form-control" type="file" id="formFile" onChange={e => setFile(e.target.files[0])}/>
            </div>
            <button className={'btn btn-primary'} onClick={() => checkFile(file)}>Check File</button>
            <button className={'btn btn-success'} onClick={() => addFile(file)}>Add File</button>
            <button className={'btn btn-danger'} onClick={() => removeFile(file)}>Remove File</button>
        </div>
    );
}
