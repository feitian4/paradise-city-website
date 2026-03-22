// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title ManiStoneNFT
 * @dev 香格里拉天堂之城 - 玛尼石NFT合约
 * 包含药师七佛圣像（7,000枚）和十二药叉护法（84,000枚）
 */
contract ManiStoneNFT is ERC721, ERC721URIStorage, Ownable, ReentrancyGuard {
    uint256 public constant MAX_SEVEN_BUDDHAS = 7000;
    uint256 public constant MAX_TWELVE_YAKSHAS = 84000;
    uint256 public constant MAX_SUPPLY = MAX_SEVEN_BUDDHAS + MAX_TWELVE_YAKSHAS;

    uint256 public constant BUDDHA_PRICE = 0.1 ether;   // 0.1 MATIC
    uint256 public constant YAKSHA_PRICE = 0.05 ether;  // 0.05 MATIC

    uint256 private _tokenIdCounter;
    uint256 public buddhaMinted;
    uint256 public yakshaMinted;

    bool public saleActive = false;
    bool public yakshasSaleActive = false;

    string private _baseTokenURI;

    // 每地址铸造限制
    mapping(address => uint256) public buddhasMintedByAddress;
    mapping(address => uint256) public yakshasMintedByAddress;
    uint256 public constant MAX_PER_WALLET_BUDDHA = 7;   // 每尊佛各限1枚，共7枚
    uint256 public constant MAX_PER_WALLET_YAKSHA = 12;  // 十二药叉各限1枚

    event BuddhaMinted(address indexed to, uint256 tokenId, uint256 buddhaType);
    event YakshaMinted(address indexed to, uint256 tokenId, uint256 yakshaType);
    event SaleStateChanged(bool buddhasActive, bool yakshsActive);

    constructor(
        address initialOwner,
        string memory baseURI
    ) ERC721("Mani Stone NFT", "MANI") Ownable(initialOwner) {
        _baseTokenURI = baseURI;
    }

    // ============ 铸造函数 ============

    /**
     * @dev 铸造药师七佛圣像
     * @param buddhaType 佛像类型 1-7
     */
    function mintBuddha(uint256 buddhaType) external payable nonReentrant {
        require(saleActive, "Buddha sale not active");
        require(buddhaType >= 1 && buddhaType <= 7, "Invalid buddha type");
        require(buddhaMinted < MAX_SEVEN_BUDDHAS, "Buddha NFTs sold out");
        require(msg.value >= BUDDHA_PRICE, "Insufficient payment");
        require(
            buddhasMintedByAddress[msg.sender] < MAX_PER_WALLET_BUDDHA,
            "Wallet mint limit reached"
        );

        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        buddhaMinted++;
        buddhasMintedByAddress[msg.sender]++;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, string(abi.encodePacked("buddha/", _toString(buddhaType))));

        emit BuddhaMinted(msg.sender, tokenId, buddhaType);

        // 退还多余的 ETH/MATIC
        if (msg.value > BUDDHA_PRICE) {
            payable(msg.sender).transfer(msg.value - BUDDHA_PRICE);
        }
    }

    /**
     * @dev 铸造十二药叉护法
     * @param yakshaType 药叉类型 1-12
     */
    function mintYaksha(uint256 yakshaType) external payable nonReentrant {
        require(yakshasSaleActive, "Yaksha sale not active");
        require(yakshaType >= 1 && yakshaType <= 12, "Invalid yaksha type");
        require(yakshaMinted < MAX_TWELVE_YAKSHAS, "Yaksha NFTs sold out");
        require(msg.value >= YAKSHA_PRICE, "Insufficient payment");
        require(
            yakshasMintedByAddress[msg.sender] < MAX_PER_WALLET_YAKSHA,
            "Wallet mint limit reached"
        );

        uint256 tokenId = MAX_SEVEN_BUDDHAS + _tokenIdCounter;
        _tokenIdCounter++;
        yakshaMinted++;
        yakshasMintedByAddress[msg.sender]++;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, string(abi.encodePacked("yaksha/", _toString(yakshaType))));

        emit YakshaMinted(msg.sender, tokenId, yakshaType);

        if (msg.value > YAKSHA_PRICE) {
            payable(msg.sender).transfer(msg.value - YAKSHA_PRICE);
        }
    }

    // ============ Owner 函数 ============

    function setSaleState(bool _buddhasActive, bool _yakshsActive) external onlyOwner {
        saleActive = _buddhasActive;
        yakshasSaleActive = _yakshsActive;
        emit SaleStateChanged(_buddhasActive, _yakshsActive);
    }

    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    function withdraw() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner()).transfer(balance);
    }

    function ownerMint(address to, uint256 buddhaType) external onlyOwner {
        require(buddhaMinted < MAX_SEVEN_BUDDHAS, "Sold out");
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        buddhaMinted++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, string(abi.encodePacked("buddha/", _toString(buddhaType))));
        emit BuddhaMinted(to, tokenId, buddhaType);
    }

    // ============ View 函数 ============

    function totalSupply() external view returns (uint256) {
        return _tokenIdCounter;
    }

    function remainingBuddhas() external view returns (uint256) {
        return MAX_SEVEN_BUDDHAS - buddhaMinted;
    }

    function remainingYakshas() external view returns (uint256) {
        return MAX_TWELVE_YAKSHAS - yakshaMinted;
    }

    // ============ 内部函数 ============

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function tokenURI(uint256 tokenId)
        public view override(ERC721, ERC721URIStorage) returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public view override(ERC721, ERC721URIStorage) returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) return "0";
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) { digits++; temp /= 10; }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits--;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}
