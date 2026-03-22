const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('ManiStoneNFT', function () {
  let nft, owner, buyer;

  beforeEach(async () => {
    [owner, buyer] = await ethers.getSigners();
    const NFT = await ethers.getContractFactory('ManiStoneNFT');
    nft = await NFT.deploy(owner.address, 'ipfs://test/');
    await nft.waitForDeployment();
  });

  it('初始 sale 未开启', async () => {
    expect(await nft.saleActive()).to.equal(false);
  });

  it('Owner 可开启销售', async () => {
    await nft.setSaleState(true, false);
    expect(await nft.saleActive()).to.equal(true);
  });

  it('可铸造七佛 NFT', async () => {
    await nft.setSaleState(true, false);
    const price = await nft.BUDDHA_PRICE();
    await nft.connect(buyer).mintBuddha(1, { value: price });
    expect(await nft.balanceOf(buyer.address)).to.equal(1);
    expect(await nft.buddhaMinted()).to.equal(1);
    expect(await nft.remainingBuddhas()).to.equal(6999);
  });

  it('付款不足时回滚', async () => {
    await nft.setSaleState(true, false);
    await expect(
      nft.connect(buyer).mintBuddha(1, { value: ethers.parseEther('0.01') })
    ).to.be.revertedWith('Insufficient payment');
  });

  it('无效佛类型回滚', async () => {
    await nft.setSaleState(true, false);
    const price = await nft.BUDDHA_PRICE();
    await expect(
      nft.connect(buyer).mintBuddha(8, { value: price })
    ).to.be.revertedWith('Invalid buddha type');
  });

  it('未开启时无法铸造', async () => {
    const price = await nft.BUDDHA_PRICE();
    await expect(
      nft.connect(buyer).mintBuddha(1, { value: price })
    ).to.be.revertedWith('Buddha sale not active');
  });

  it('Owner 可提款', async () => {
    await nft.setSaleState(true, false);
    const price = await nft.BUDDHA_PRICE();
    await nft.connect(buyer).mintBuddha(1, { value: price });
    const balBefore = await ethers.provider.getBalance(owner.address);
    const tx = await nft.withdraw();
    const receipt = await tx.wait();
    const gasUsed = receipt.gasUsed * receipt.gasPrice;
    const balAfter = await ethers.provider.getBalance(owner.address);
    expect(balAfter + gasUsed).to.be.gt(balBefore);
  });

  it('ownerMint 正常', async () => {
    await nft.ownerMint(buyer.address, 3);
    expect(await nft.balanceOf(buyer.address)).to.equal(1);
  });
});
