# certificate-factory
Small project to store certificate hashes on Ethereum and retrieve them with web3-react

## Install project

```cmd
//install hardhat part
npm install

//install front part
cd front
yarn
```

## Start project

```cmd
//in root dir
npx hardhat compile
npx hardhat node
//then open new console tab
npx hardhat deploy
//copy paste contract addr in front/src/constant in FACTORY_ADDR
//copy paste account #1 private key (used to deploy contract) in your metamask/wallet

//start front
cd front
yarn start
```
## Utils

[hardhat network informations](https://ipfs.fleek.co/ipfs/bafybeigp7gmisamhzmgbtgfrhf7nkdwgu4j5mlqomatzy2zyte4thdshle)

Running test : `npx hardhat test //in root dir`

