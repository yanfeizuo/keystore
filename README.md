# Contract Toolkit

This is a toolkit library for contract debugging

## Prerequisite

You need to create 2 files: `accounts.json` and `providers.json`. 

A typical `accounts.json` looks like this, where key is `account-name` and value is private key in HEX:

```json
{
	"alice": "0x124bac....def92",
  "bob": "0x324bde....7632"
}
```

A typical `providers.json` looks like this, where key is `provider-name` and value is rpc url config. `provider-name` is defined in `src/const/network.js`:

```json
{
  "mainnet": { "url": "http://mainnet.meter.io", "alias": ["Meter"], "meterified": true },
  "testnet": { "url": "http://shoal.meter.io", "alias": ["MeterTest"], "meterified": true },

  "ethereum": { "url": "https://speedy-nodes-nyc.moralis.io/[key]/eth/mainnet" },
  "bsctest": { "url": "https://data-seed-prebsc-1-s1.binance.org:8545/", "alias": ["BSCTest"] },

  "localhost": { "url": "http://localhost:8545", "meterified": false },
}
```

Put these two files under safe folders, such as `/Users/simon/safe/`. And configure .env with 

```
ACCOUNTS_CONFIG=/Users/simon/safe/accounts.json
PROVIDERS_CONFIG=/Users/simon/safe/providers.json
```
## Read Usage (call)

Calling a contract is as simple as the following, notice that you could easily load the account you just set in `accounts.json` by `loadAccount`. Here's an example calling `balanceOf` on ERC20.

```js
const { loadAccount, loadWeb3Contract, Network } = require('../const');

const { inst } = loadWeb3Contract(Network.mainnet, 'ERC20', 'VOLT_AIR');
const userAcct = loadAccount('bob');
const owner = userAcct.addr;

(async () => {
  const r = await inst.methods.balanceOf(owner).call({});
  console.log(r);
})();

```

### Write Usage (send)

`send` is a little bit more complex then `call`, but it's still pretty straightforward. Here's an example calling `approve` on ERC20.

```js
const { enableAccount, loadAddress, loadWeb3Contract, Network } = require('../const');
const { utils } = require('ethers');

const network = Network.mainnet;
const { web3, inst } = loadWeb3Contract(network, 'ERC20', 'VOLT_AIR');

const ownerAcct = enableAccount(web3, 'bob');
const spender = loadAddress(network, 'Geyser_MTRG_USDC_LP');
const amount = utils.parseUnits('100', 18).toHexString();

(async () => {
  const r = await inst.methods.approve(spender, amount).send({ from: ownerAcct.addr, gasLimit: 4700000 });
  console.log(r);
})();

```