const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('ShangrToken', function () {
  let token, owner, team, investor, community;

  beforeEach(async () => {
    [owner, team, investor, community] = await ethers.getSigners();
    const Token = await ethers.getContractFactory('ShangrToken');
    token = await Token.deploy();
    await token.waitForDeployment();
  });

  it('初始总供应量为 0', async () => {
    expect(await token.totalSupply()).to.equal(0n);
  });

  it('初始化后总供应量为 5亿', async () => {
    await token.initialize(team.address, investor.address, community.address);
    expect(await token.totalSupply()).to.equal(await token.MAX_SUPPLY());
  });

  it('投资者获得 50%', async () => {
    await token.initialize(team.address, investor.address, community.address);
    expect(await token.balanceOf(investor.address)).to.equal(await token.INVESTOR_ALLOCATION());
  });

  it('社区获得 20%', async () => {
    await token.initialize(team.address, investor.address, community.address);
    expect(await token.balanceOf(community.address)).to.equal(await token.COMMUNITY_ALLOCATION());
  });

  it('团队 30% 锁仓在合约', async () => {
    await token.initialize(team.address, investor.address, community.address);
    const contractAddr = await token.getAddress();
    expect(await token.balanceOf(contractAddr)).to.equal(await token.TEAM_ALLOCATION());
  });

  it('不能重复初始化', async () => {
    await token.initialize(team.address, investor.address, community.address);
    await expect(
      token.initialize(team.address, investor.address, community.address)
    ).to.be.revertedWith('Already initialized');
  });

  it('锁仓期内无法释放', async () => {
    await token.initialize(team.address, investor.address, community.address);
    await expect(
      token.connect(team).releaseTeamTokens()
    ).to.be.revertedWith('Still locked');
  });

  it('symbol 正确', async () => {
    expect(await token.symbol()).to.equal('SHANGRI');
  });
});
