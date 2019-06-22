import GanacheServiceContractAddress from '../smartcontracts/constants/GanacheServiceContractAddress.json';
import GanacheTokenContractAddress from '../smartcontracts/constants/GanacheTokenContractAddress.json';
import GanacheTokenAbi from '../smartcontracts/constants/GanacheTokenContractABI.json';
import GanacheServiceAbi from '../smartcontracts/constants/GanacheServiceContractABI.json';
import web3 from "./web3.mjs"

export let tokenContract;
export let serviceContract;


const setContracts = () => {

  if (!tokenContract || !serviceContract) {
    if (process.env.ETH_NETWORK !== 'ganache') {
      // TODO
      console.error("For now it only works for ganache network.")
    } else {

      tokenContract = new web3.eth.Contract(GanacheTokenAbi, GanacheTokenContractAddress);
      serviceContract = new web3.eth.Contract(GanacheServiceAbi, GanacheServiceContractAddress);

    }
  }
};

setContracts();

