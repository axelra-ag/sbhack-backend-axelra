# SBHACK19 - Team Axelra

## velove - cycle and earn CO2 coins !

The velove backend includes the following:

- in ``smartcontracts/contracts`` the smart contracts are saved. It includes two libraries (Utils and SafeMath), an ERC-20 / -865 / -677ish token contract (``CO2.sol``) and the service contract which handles the reward distribution when someone is successfully registering the end of a ride.
- the ``smartcontracts/deployment`` folder includes the deployment scripts and some initialing methods to set the contracts to a usable state for testing and development. For example the tokens are minted and some velove stations are already saved to the smart contract.
- the other folders include routes and the model of the backend which is used as a so called "convenience layer" which eases the use of the blockchain and tracks the smart contract changes.
---------------------------------------

###Deploy smart contracts to Ganache Ethereum network:

Install dependencies:
```
npm install
```

Start Ganache on your local WIFI network:
```
ganache-cli -b 3 -h <NETWORK_ADAPTER_IP> -l 20000000000
```

Set Ganache host and port in environment variable ``RPC_SERVER``.
```
RPC_SERVER=<NETWORK_ADAPTER_IP>:7545
```

Deploy to Ganache:
```
npm run deploy
```

####Run backend locally
```
npm run server
```


---------

#### Backup

#####Backend Endpoints
**maps**

_post_ `/maps/get-directions`

`{
    start: 'Morgentalstrasse 67 8038 Zürich',
    end: 'Bahnhofstrasse 3, 8001 Zürich'
}`

_get_ `/maps/get-stations`

_post_ `/maps/get-closest-station`

`{
    address = 'Morgentalstrasse 67 8038 Zürich'
}`

_get_ `/maps/get-checkpoints`

_post_ `/maps/achieve-point`

`{
    coordinates: [47.384827, 8.531721],
    checkPoint: 5
}`

_post_ `/maps/get-distance-between`

`
{
    "start": [47.403289, 8.607952],
    "end": [47.403289, 8.607915]
}
`

**user**

_post_ `/user/add`

`{
    name: 'John Wick '
    email: johnwick@axelra.com
}`

_post_ `/user/edit`

`{
    userID: '5d0de931f854b34f1cc7bd2c'
    name: 'Peter Wick'
    email: 'peterwick@axelra.com'
}`

_post_ `/user/profile`

`{
    userID: '5d0de931f854b34f1cc7bd2c'
}`

**challenge**

_get_ `/`

_post_ `/challenge/my-challenges`

`{
    userID: '5d0de931f854b34f1cc7bd2c'
}`

_post_ `/challenge/start`

`{
    userID: '5d0de931f854b34f1cc7bd2c'
    challengeID: '5d0de917f854b34f1cc7bd29'
}`

_post_ `/challenge/end`

`{
    userID: '5d0de931f854b34f1cc7bd2c'
    challengeID: '5d0de917f854b34f1cc7bd29'
}`