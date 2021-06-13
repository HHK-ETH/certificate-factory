# certificate-factory
Small project to store certificate on Ethereum and IPFS and retrieve them with web3-react

## Install project

```js
//install hardhat part
npm install

//install front part
cd front
yarn
```

## Start project

```js
//in root dir
npx hardhat compile
npx hardhat node
//then open new console tab
npx hardhat run --network localhost scripts/deploy.ts
//copy paste contract addr in front/src/constant in FACTORY_ADDR
//copy paste account #1 private key (used to deploy contract) in your metamask/wallet

//start front
cd front
yarn start
```
## Utils

Setup hardhat network in metamask : [hardhat network informations](https://ipfs.fleek.co/ipfs/bafybeigp7gmisamhzmgbtgfrhf7nkdwgu4j5mlqomatzy2zyte4thdshle)

Run test : `npx hardhat test //in root dir`

