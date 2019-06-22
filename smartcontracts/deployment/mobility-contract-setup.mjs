import web3 from "../../helpers/web3.mjs";
import {getEthereumNodeAccounts} from "./token-minting.mjs";
import stations from "../../stations.json"
import MapController from "../../controllers/MapController"
import fs from "fs";

export const setTokenContract = async (serviceContract, tokenContractAddress) => {
  const accounts = await getEthereumNodeAccounts(web3);
  return serviceContract.methods.setTokenContract(tokenContractAddress).send({
    from: accounts[0],
    gas: 80000000
  });
};

export const setRewardPerDistance = async (serviceContract, reward) => {
  const accounts = await getEthereumNodeAccounts(web3);
  return serviceContract.methods.setRewardPerDistance(reward).send({
    from: accounts[0],
    gas: 80000000
  });
};

export const createStations = async (serviceContract) => {
  const accounts = await getEthereumNodeAccounts(web3);
  return Promise.all(
    stations.map(s => {

      const ids = stations.map(e => {return e.id});
      const distances = stations.map(e => {
        return getDistanceBetween(s, e);
      });

      return serviceContract.methods.createStation(web3.utils.utf8ToHex(s.secretKey), ids, distances).send({
        from: accounts[0],
        gas: 80000000
      })
        .then(() => console.log("station created."));
    })
  );
};

const getDistanceBetween = (station1, station2) => {
  // try {
  //   MapController.getDistanceBetween({start: station1, end: station2}, (err, data) => {
  //     if(err) {
  //       console.log(err);
  //       return false;
  //     } else {
  //       return data.distance;
  //     }
  //   });
  // } catch (e) {
  //   console.log(e);
  //   return false;
  // }
  return 50;
};

export const mobilityContractSetup = async (serviceContract, tokenContractAddress) => {
  await setTokenContract(serviceContract, tokenContractAddress)
    .then((() => console.log("CO2 Contract set.")));
  await setRewardPerDistance(serviceContract, 100)
    .then((() => console.log("The reward per distance set.")));
  await createStations(serviceContract)
    .then((() => console.log("All stations were created.")));
};



