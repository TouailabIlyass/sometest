require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');
module.exports = {
    networks: {
      poa:{
        provider: function(){
          return new HDWalletProvider(
          process.env.MNEMONIC,
          'https://rinkeby.infura.io/v3/412e2400349f44b595baa92bd1d0ce48'
          )
        },
        network_id: '*'
      },
      development: {
        host: '127.0.0.1',
        port: 7545,
        network_id: '5777'
      }
    }
  };