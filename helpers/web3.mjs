import Web3 from 'web3';

let web3;
export let web3Provider;

const getWeb3 = () => {
  if (!web3) {
    web3 = new Web3(getBackendProvider());
  }
};

const getBackendProvider = () => {

  web3Provider = new Web3.providers.WebsocketProvider('ws://127.0.0.1:7545');

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
