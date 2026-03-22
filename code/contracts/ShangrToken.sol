// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

/**
 * @title ShangrToken
 * @dev $SHANGRI 代币合约
 * 总量 5亿，用于香格里拉天堂之城生态
 */
contract ShangrToken is ERC20, ERC20Burnable, Ownable, ERC20Permit {
    uint256 public constant MAX_SUPPLY = 500_000_000 * 10 ** 18; // 5亿

    // 分配比例
    uint256 public constant TEAM_ALLOCATION    = MAX_SUPPLY * 30 / 100; // 30%
    uint256 public constant INVESTOR_ALLOCATION = MAX_SUPPLY * 50 / 100; // 50%
    uint256 public constant COMMUNITY_ALLOCATION = MAX_SUPPLY * 20 / 100; // 20%

    // 锁仓
    uint256 public teamUnlockTime;
    address public teamWallet;
    address public investorWallet;
    address public communityWallet;

    bool public initialized = false;

    event TokensDistributed(address team, address investor, address community);

    constructor(address initialOwner)
        ERC20("Shangri-La Paradise City", "SHANGRI")
        Ownable(initialOwner)
        ERC20Permit("Shangri-La Paradise City")
    {}

    /**
     * @dev 初始化代币分配（只能调用一次）
     * @param _teamWallet 团队钱包（锁定2年）
     * @param _investorWallet 投资者钱包（ICO/IEO）
     * @param _communityWallet 社区奖励钱包
     */
    function initialize(
        address _teamWallet,
        address _investorWallet,
        address _communityWallet
    ) external onlyOwner {
        require(!initialized, "Already initialized");
        require(_teamWallet != address(0), "Invalid team wallet");
        require(_investorWallet != address(0), "Invalid investor wallet");
        require(_communityWallet != address(0), "Invalid community wallet");

        teamWallet = _teamWallet;
        investorWallet = _investorWallet;
        communityWallet = _communityWallet;
        teamUnlockTime = block.timestamp + 2 * 365 days; // 锁定2年

        // 铸造分配
        _mint(_investorWallet, INVESTOR_ALLOCATION);   // 50% 立即分配给投资者
        _mint(_communityWallet, COMMUNITY_ALLOCATION); // 20% 社区奖励
        _mint(address(this), TEAM_ALLOCATION);          // 30% 锁定在合约

        initialized = true;
        emit TokensDistributed(_teamWallet, _investorWallet, _communityWallet);
    }

    /**
     * @dev 团队解锁（2年后）
     */
    function releaseTeamTokens() external {
        require(msg.sender == teamWallet, "Not team wallet");
        require(block.timestamp >= teamUnlockTime, "Still locked");
        uint256 balance = balanceOf(address(this));
        require(balance > 0, "No tokens to release");
        _transfer(address(this), teamWallet, balance);
    }

    /**
     * @dev Owner 可增发（上限 MAX_SUPPLY）
     */
    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amount);
    }
}
