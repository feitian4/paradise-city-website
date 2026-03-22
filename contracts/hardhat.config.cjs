require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || '0x' + '0'.repeat(64);

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.20',
    settings: { optimizer: { enabled: true, runs: 200 } },
  },
  networks: {
    hardhat: {},
    polygonAmoy: {
      url: process.env.POLYGON_AMOY_RPC || 'https://rpc-amoy.polygon.technology',
      accounts: [PRIVATE_KEY],
      chainId: 80002,
    },
    polygon: {
      url: process.env.POLYGON_MAINNET_RPC || 'https://polygon-rpc.com',
      accounts: [PRIVATE_KEY],
      chainId: 137,
    },
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
};
