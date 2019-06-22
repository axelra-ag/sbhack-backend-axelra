import {deployContractsAndSaveAddressesAndABIs} from "./deploy-contracts-and-save.mjs";
import {finishMinting, mintTokens, setAdmins} from "./token-minting.mjs";
import {mobilityContractSetup} from "./mobility-contract-setup.mjs";

const run = async () => {
  const [mobContact, serviceContract] = await deployContractsAndSaveAddressesAndABIs();
  await mintTokens(mobContact)
    .then(() =>{
      console.log('The MOB tokens have been minted.');
    });
  await setAdmins(mobContact)
    .then(() =>{
      console.log('Default admins set.');
    });
  await finishMinting(mobContact)
    .then(() => {
      console.log('The minting has been finished.');
    });

  await mobilityContractSetup(serviceContract, mobContact.options.address);

  process.exit();
};

run();