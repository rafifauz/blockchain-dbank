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
<details><summary>Step 1</summary>
<p> 
  
  1. Run Ganache
  
  2. Truffle migrate
      ```
      npm install babel-register --save-dev
      truffle migrate
      ```
  
  3. Open 'truffle console'
```
token.__proto__             token.hasOwnProperty        token.isPrototypeOf         token.propertyIsEnumerable  token.toLocaleString        token.toString				token.valueOf
token.Approval              token.MinterChanged         token.Transfer              token.abi                   token.address               token.allEvents
token.allowance             token.approve               token.balanceOf             token.constructor           token.contract              token.decimals
token.decreaseAllowance     token.getPastEvents         token.increaseAllowance     token.methods               token.mint                  token.minter
token.name                  token.passMinterRole        token.send                  token.sendTransaction       token.symbol                token.totalSupply
token.transactionHash       token.transfer              token.transferFrom
```
------------------------------------------------------------------------------------------------------------
  * Start 
    ```
    truffle console
    ```
------------------------------------------------------------------------------------------------------------  
  * a.  Create variable 'token' <br>
    menggunakan 'await' karena 'asynchron'
    ```
    const token = await Token.deployed()
    token
    ```
------------------------------------------------------------------------------------------------------------  
  * b.  Isi dari variable 'token' <br> 
    <details><summary>Isi Token</summary>
    <p> 

    ```
    token.address
    ```
    > Output: '0xe77c79C2EbD60E4760d151e733Ca1aDEDd0ce627'
    ------------------------------------------------------------------------------------------------------------
    ```
    token.name()
    ```
    > Output: 'Desentralized Bank Currency'
    ------------------------------------------------------------------------------------------------------------    
    ```
    token.symbol()
    ```
    > Output: 'DBC'
    ------------------------------------------------------------------------------------------------------------    
    ```
    token.totalSupply()
    ```
    > Output: <BN: 0> or  BN { negative: 0, words: [ 0, <1 empty item> ], length: 1, red: null }
    ------------------------------------------------------------------------------------------------------------
    </p>
    </details>

------------------------------------------------------------------------------------------------------------
  * c.  Create variable 'accounts'
    <details><summary>Isi Token</summary>
    <p>
    Library 'web3' untuk konek ke ethereum kita di aplikasi "ganache" <br>

    ```
    const accounts = await web3.eth.getAccounts() 
    accounts
    account = accounts[0]
    account
    ```

    > Output 'accounts': 
    ```
    [
        '0xCE3dBd10E3Eb436f53F66970B56bf5B65b1923C4',
        '0xFB3704FbaC9528505a05b34385D47b84C7e7abB5',
        '0x29C49E1e1761d49Dbf22EE4EA83477C39196860E',
        '0x02CCfE5A5cda19b5344b7C9C6A6DC4c2300a4343',
        '0x7580a303c3E4eAC71A518eB4662bB09019B12825',
        '0x56DC3802407110C0768C22BE78BF5f402009f3f6',
        '0xded769a90b96080A990D5DdDDC49785a2B1d45bD',
        '0x4Fa87Abb7C37c58e4E95B03C595ed605D502d4F3',
        '0x12eE3AFDB535F6f55D7206b90e67d66575B1AE46',
        '0x325CD5A9Ba9458d213CB8e13BCf20C0DB7cC76bD'
    ]
    ```
    > Output 'account or account[0]': '0xCE3dBd10E3Eb436f53F66970B56bf5B65b1923C4'
    ------------------------------------------------------------------------------------------------------------
    ```
    web3.eth.getBalance(account)
    etherBalance = await web3.eth.getBalance(account)
    etherBalance
    web3.utils.fromWei(etherBalance)
    ```
    > Output 'getBalance(account)': '99967767340000000000' (nilai WEI bukan decimal) <br>
    > Output 'etherBalance' : '99967767340000000000' <br>
    > Output 'fromWei(etherBalance)' : '99.96776734' (nilai decimal dari WEI)
    ------------------------------------------------------------------------------------------------------------
    ```
    token.decimals()
    dec = await token.decimals()
    dec.toString()
    ```
    > Output 'token.decimals()': BN { negative: 0, words: [ 18, <1 empty item> ], length: 1, red: null }  <br>
    > Output 'dec.toString()' : '18'
    ------------------------------------------------------------------------------------------------------------
    ```
    web3.utils.toWei('98.85')

    token.mint(account, web3.utils.toWei("100"))
    tokenBalance = await token.balanceOf(account)
    tokenBalance
    tokenBalance.toString()

    web3.utils.fromWei(tokenBalance)


    ```
    > Output 'toWei('98.85')': '98850000000000000000' (nilai decimal ke WEI ) <br>
    > Output 'tokenBalance' : 
    ```
        BN {
        negative: 0,
        words: [ 51380224, 30903128, 22204, <1 empty item> ],
        length: 3,
        red: null
        }
      ```
      > Output 'tokenBalance.toString()' : '100000000000000000000' <br>
      > Output 'fromWei(tokenBalance)' : '100'
    ------------------------------------------------------------------------------------------------------------
    ```
    token.totalSupply()
    totalSupply = await token.totalSupply()
    totalSupply.toString()
    web3.utils.fromWei(totalSupply)
    ```
    > Output 'totalSupply()' : 
    ```
        BN {
        negative: 0,
        words: [ 51380224, 30903128, 22204, <1 empty item> ],
        length: 3,
        red: null
        }
    ```
    > Output 'totalSupply.toString()' : '100000000000000000000' <br>
    > Output 'fromWei(totalSupply)' : '100'
    ------------------------------------------------------------------------------------------------------------
    </p>
    </details>
</p>
</details>

