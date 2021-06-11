import React, {useEffect} from "react";
import {useWeb3React} from "@web3-react/core";
import {Web3Provider} from "ethers/providers";
import {Contract, providers} from "ethers";
import {FACTORY_ABI} from "../constants";

export default function Certificate(): JSX.Element {
    const context = useWeb3React<Web3Provider>();
    const { connector, library, chainId, account, activate, deactivate, active, error } = context;

    useEffect(() => {
        async function test() {
            if (active) {
                const web3Provider = new providers.Web3Provider(await connector.getProvider());
                const factory = new Contract('0x5FbDB2315678afecb367f032d93F642f64180aa3', FACTORY_ABI, web3Provider);
                const factoryWithSigner = await factory.connect(web3Provider.getSigner());
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
            
        </div>
    );
}
