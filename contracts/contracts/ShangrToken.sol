// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

/**
 * @title ShangrToken - $SHANGRI
 * @dev 总量 5亿，团队30%锁仓2年，投资者50%，社区20%
 */
contract ShangrToken is ERC20, ERC20Burnable, Ownable, ERC20Permit {
    uint256 public constant MAX_SUPPLY = 500_000_000 * 10 ** 18;
    uint256 public constant TEAM_ALLOCATION     = MAX_SUPPLY * 30 / 100;
    uint256 public constant INVESTOR_ALLOCATION  = MAX_SUPPLY * 50 / 100;
    uint256 public constant COMMUNITY_ALLOCATION = MAX_SUPPLY * 20 / 100;

    uint256 public teamUnlockTime;
    address public teamWallet;
    bool public initialized = false;

    event Initialized(address team, address investor, address community);
    event TeamTokensReleased(address teamWallet, uint256 amount);

    constructor()
        ERC20("Shangri-La Paradise City", "SHANGRI")
        ERC20Permit("Shangri-La Paradise City")
    {}

    function initialize(
        address _teamWallet,
        address _investorWallet,
        address _communityWallet
    ) external onlyOwner {
        require(!initialized, "Already initialized");
        require(_teamWallet != address(0) && _investorWallet != address(0) && _communityWallet != address(0), "Invalid address");

        teamWallet = _teamWallet;
        teamUnlockTime = block.timestamp + 2 * 365 days;

        _mint(_investorWallet, INVESTOR_ALLOCATION);
        _mint(_communityWallet, COMMUNITY_ALLOCATION);
        _mint(address(this), TEAM_ALLOCATION);

        initialized = true;
        emit Initialized(_teamWallet, _investorWallet, _communityWallet);
    }

    function releaseTeamTokens() external {
        require(msg.sender == teamWallet, "Not team wallet");
        require(block.timestamp >= teamUnlockTime, "Still locked");
        uint256 balance = balanceOf(address(this));
        require(balance > 0, "No tokens to release");
        _transfer(address(this), teamWallet, balance);
        emit TeamTokensReleased(teamWallet, balance);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amount);
    }
}
