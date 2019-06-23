import web3 from "./helpers/web3.mjs";
import {getEthereumNodeAccounts} from "./smartcontracts/deployment/token-minting.mjs";
import {serviceContract, tokenContract} from "./helpers/get-contracts.mjs";
import stations from "./stations.json"
import {getTokenBalance} from "./helpers/token-balance.mjs";

const run = async () => {

  const accounts = await getEthereumNodeAccounts(web3);

  await getTokenBalance(tokenContract, accounts[1], accounts[1])
    .then(res => console.log(res));

  let rideId;
  await serviceContract.methods.startRide(stations[0].id, web3.utils.utf8ToHex(stations[0].secretKey)).send({
    from: accounts[1],
    gas: 8000000000
  })
    .on('transactionHash', tx => console.log(tx))
    .on('receipt', receipt => {
      rideId = receipt.events.RideStarted.returnValues.rideId;
  });

  await serviceContract.methods.endRide(rideId, stations[1].id, web3.utils.utf8ToHex(stations[1].secretKey)).send({
    from: accounts[1],
    gas: 8000000000
  })
    .on('transactionHash', tx => console.log(tx))
    .on('receipt', receipt => {
      // console.log(receipt);
    });

  await getTokenBalance(tokenContract, accounts[1], accounts[1])
    .then(res => console.log(res));


  await web3.eth.getBalance(accounts[1]).then((res) => console.log(res)) ;

  await web3.eth.sendTransaction({
    from: accounts[0],
    to: accounts[1],
    value: '1000000000000000'
  })
    .on("transactionHash", tx => console.log(tx))
    .on("receipt", receipt => {
      console.log(receipt);
    })
    .on("confirmation", (c, r) => {
      console.log(c, r);
    })
    .on("error", e => {
      console.log(e);
    })
    .catch(e => {
      throw new Error(e);
    });

  await web3.eth.getBalance(accounts[1]).then((res) => console.log("tes", res)) ;
};

run();