import Web3 from 'web3';

let web3;
export let web3Provider;

const getWeb3 = () => {
  if (!web3) {
    web3 = new Web3(getBackendProvider());
  }
};

const getBackendProvider = () => {

  if (process.env.ETH_NETWORK === 'ganache') {
    web3Provider = new Web3.providers.WebsocketProvider('ws://127.0.0.1:7545');
  }
  else if (process.env.ETH_NETWORK === 'kovan') {
    web3Provider = new Web3.providers.WebsocketProvider('wss://kovan.infura.io/ws/v3/344e9e84c0804cd5a15f4dd4b9b49a1e');
  }
  else {
    console.error('Ethereum network ' + process.env.ETH_NETWORK + ' couldn\'t be found');
  }

  web3Provider.on('connect', (e) => {
    console.log('Web3 Provider connected to ' + web3.currentProvider.connection.url);
  });
  web3Provider.on('error', e => {
    console.error('Web3 Provider Error', e);
    web3 = new Web3(getBackendProvider());
  });
  web3Provider.on('end', e => {
    console.error('Web3 Provider Ended', e);
    web3 = new Web3(getBackendProvider());
  });
  return web3Provider;
};

getWeb3();
export default web3;
