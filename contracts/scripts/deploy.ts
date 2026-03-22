import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await deployer.provider.getBalance(deployer.address);
  console.log('部署账户：', deployer.address);
  console.log('账户余额：', ethers.formatEther(balance), 'MATIC');

  if (balance < ethers.parseEther('0.1')) {
    console.warn('⚠️  余额不足 0.1 MATIC，可能无法完成部署');
  }

  // 1. 部署 NFT
  console.log('\n[1/2] 部署 ManiStoneNFT...');
  const NFT = await ethers.getContractFactory('ManiStoneNFT');
  const baseURI = process.env.NFT_BASE_URI || 'ipfs://QmPlaceholder/';
  const nft = await NFT.deploy(deployer.address, baseURI);
  await nft.waitForDeployment();
  const nftAddress = await nft.getAddress();
  console.log('✅ ManiStoneNFT:', nftAddress);

  // 2. 部署代币
  console.log('\n[2/2] 部署 ShangrToken...');
  const Token = await ethers.getContractFactory('ShangrToken');
  const token = await Token.deploy(deployer.address);
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log('✅ ShangrToken:', tokenAddress);

  // 3. 开启七佛销售
  await (await nft.setSaleState(true, false)).wait();
  console.log('✅ 七佛圣像销售已开启');

  console.log('\n========================================');
  console.log('部署完成！请更新 .env.local：');
  console.log(`NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=${nftAddress}`);
  console.log(`NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS=${tokenAddress}`);
  console.log('========================================');
}

main().catch((e) => { console.error(e); process.exit(1); });
