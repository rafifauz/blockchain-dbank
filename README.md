# Blockchain Tutorial
source:
* https://github.com/dappuniversity/dbank
* https://www.youtube.com/watch?v=xWFba_9QYmc

## 1. Prepare
### Install NodeJS & NPM
```
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt install nodejs
node --version
npm --version
```
### Install Truffle
```
npm install -g truffle
```
### Install Ganache
```
https://www.trufflesuite.com/ganache
```

## 2. Step 1
1. Run Ganache
2. Truffle migrate
```
truffle migrate
```
3. Open 'truffle console'
token.__proto__             token.hasOwnProperty        token.isPrototypeOf         token.propertyIsEnumerable  token.toLocaleString        token.toString				token.valueOf
token.Approval              token.MinterChanged         token.Transfer              token.abi                   token.address               token.allEvents
token.allowance             token.approve               token.balanceOf             token.constructor           token.contract              token.decimals
token.decreaseAllowance     token.getPastEvents         token.increaseAllowance     token.methods               token.mint                  token.minter
token.name                  token.passMinterRole        token.send                  token.sendTransaction       token.symbol                token.totalSupply
token.transactionHash       token.transfer              token.transferFrom

```
truffle console
```
* Create variable 
menggunakan awain akrena asyncron
```
const token = await Token.deployed()
```
* Open variable 'token'
```
token
```
* Isi dari variable 'token' 
```
token.address
```
'0xe77c79C2EbD60E4760d151e733Ca1aDEDd0ce627'

```
token.name()
```
'Desentralized Bank Currency'


```
token.symbol()
```
'DBC'

```
token.totalSupply()
```
BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }

* Library 'web3' untuk konek ke ethereum kita di aplikasi "ganache"
```
web3.eth.getAccounts()
```
[
  '0x3a31FA601817c9Fb0f464bf4bD0892AE8542C27C',
  '0x80bFb158d710cC5060afC40c60eeeCF9AA55f690',
  '0x7b232C8fFa2576852f4c47d5BEbC3cf8C291E6bA',
  '0x61535065f4d05195B6Fb3DBf6AF9F6b8dd8615Ee',
  '0x72c1FfaCe2E01A5B35F9bAb60Af60b8F963E7f92',
  '0xc9bcbe8E5e4b76a0acCF95a1511b06C07E877674',
  '0x464DCAD7Fb3A87d160Ab6378F826169fD869F47B',
  '0x34DA3E3a7ED3e2265Ffc2375169A67a35809EfCA',
  '0x45eab82190EA369159b47AA416D0D415D33E90AB',
  '0x43864E6cd459A00CfC34497fa813EaFa32669B74'
]

