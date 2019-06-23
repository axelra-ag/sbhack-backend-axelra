import path from 'path';
import fs from 'fs';

const DIR_NAME = path.resolve(path.dirname(''));

export const smartcontractsAndLibraries = () => {
  return {
    libraries: {
      'Utils.sol': fs.readFileSync(
        path.resolve(DIR_NAME, 'smartcontracts/contracts/Utils.sol'),
        'utf-8'
      ),
      'SafeMath.sol': fs.readFileSync(
        path.resolve(DIR_NAME, 'smartcontracts/contracts/SafeMath.sol'),
        'utf-8'
      )
    },
    contract: {
      'CO2.sol': fs.readFileSync(
        path.resolve(DIR_NAME, 'smartcontracts/contracts/CO2.sol'),
        'utf-8'
      )
      ,
      'BikeToWork.sol': fs.readFileSync(
        path.resolve(
          DIR_NAME,
          'smartcontracts/contracts/BikeToWork.sol'
        ),
        'utf-8'
      )
    }
  };
};

export default smartcontractsAndLibraries;
