import fs from 'fs';
import {deployContracts} from './deploy-contracts.mjs';


export const deployContractsAndSaveAddressesAndABIs = async () => {
  const [tokenContract, serviceContract] = await deployContracts();

  const fileNames = {
    serviceContract: {
      addressPath: 'smartcontracts/constants/GanacheServiceContractAddress.json',
      abiPath: 'smartcontracts/constants/GanacheServiceContractABI.json',
      abi: JSON.stringify(serviceContract._jsonInterface),
      address: JSON.stringify(serviceContract.options.address)
    },
    tokenContract: {
      addressPath: 'smartcontracts/constants/GanacheTokenContractAddress.json',
      abiPath: 'smartcontracts/constants/GanacheTokenContractABI.json',
      abi: JSON.stringify(tokenContract._jsonInterface),
      address: JSON.stringify(tokenContract.options.address)
    }
  };

  await Promise.all(
    Object.keys(fileNames).map(contract => {
      fs.writeFileSync(
        fileNames[contract].abiPath,
        fileNames[contract].abi,
        function(err) {
          if (err) {
            return console.log(err);
          } else {
            console.log('ABI has been written in ' + contract.path);
          }
        }
      );

      fs.writeFileSync(
        fileNames[contract].addressPath,
        fileNames[contract].address,
        function(err) {
          if (err) {
            return console.log(err);
          } else {
            console.log('Address has been written in ' + contract.path);
          }
        }
      );
    })
  );
  return [tokenContract, serviceContract];
};


