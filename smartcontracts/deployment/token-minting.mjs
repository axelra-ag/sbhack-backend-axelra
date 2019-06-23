import web3 from '../../helpers/web3.mjs'


export const mintTokens = async (tokenContract, serviceContract) => {
  const accounts = await getEthereumNodeAccounts(web3);
  const accountsNew = [];
  accountsNew.push(accounts[7]);

  // token minting also for service Contract for dev purposes
  if (serviceContract)
    accountsNew.push(serviceContract.options.address);

  const  tokenAmounts = accountsNew.map(() => {
    return 20000000000000
  });

  return tokenContract.methods.mint(accountsNew, tokenAmounts).send({
    from: accounts[0],
    gas: 80000000
  });
};

export const setAdmins = async (tokenContract) => {
  const accounts = await getEthereumNodeAccounts(web3);
  return tokenContract.methods.setAdmin(accounts[0], accounts[1]).send({
    from: accounts[0],
    gas: 80000000
  });
};

export const finishMinting = async (tokenContract) => {
  const accounts = await getEthereumNodeAccounts(web3);
  return tokenContract.methods.finishMinting().send({
    from: accounts[0],
    gas: 80000000
  });
};

export const getEthereumNodeAccounts = async (web3) => {
  return web3.eth
    .getAccounts()
    .then(accounts => {
      return accounts;
    })
    .catch(err => console.log(err));
};