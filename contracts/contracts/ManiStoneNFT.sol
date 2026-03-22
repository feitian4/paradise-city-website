// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ManiStoneNFT is ERC721, ERC721URIStorage, Ownable, ReentrancyGuard {
    uint256 public constant MAX_SEVEN_BUDDHAS = 7000;
    uint256 public constant MAX_TWELVE_YAKSHAS = 84000;
    uint256 public constant BUDDHA_PRICE = 0.1 ether;
    uint256 public constant YAKSHA_PRICE = 0.05 ether;
    uint256 public constant MAX_PER_WALLET_BUDDHA = 7;
    uint256 public constant MAX_PER_WALLET_YAKSHA = 12;

    uint256 private _tokenIdCounter;
    uint256 public buddhaMinted;
    uint256 public yakshaMinted;
    bool public saleActive = false;
    bool public yakshasSaleActive = false;
    string private _baseTokenURI;

    mapping(address => uint256) public buddhasMintedByAddress;
    mapping(address => uint256) public yakshasMintedByAddress;

    event BuddhaMinted(address indexed to, uint256 tokenId, uint256 buddhaType);
    event YakshaMinted(address indexed to, uint256 tokenId, uint256 yakshaType);

    constructor(address initialOwner, string memory baseURI)
        ERC721("Mani Stone NFT", "MANI")
    {
        _transferOwnership(initialOwner);
        _baseTokenURI = baseURI;
    }

    function mintBuddha(uint256 buddhaType) external payable nonReentrant {
        require(saleActive, "Buddha sale not active");
        require(buddhaType >= 1 && buddhaType <= 7, "Invalid buddha type");
        require(buddhaMinted < MAX_SEVEN_BUDDHAS, "Buddha NFTs sold out");
        require(msg.value >= BUDDHA_PRICE, "Insufficient payment");
        require(buddhasMintedByAddress[msg.sender] < MAX_PER_WALLET_BUDDHA, "Wallet mint limit reached");

        uint256 tokenId = _tokenIdCounter++;
        buddhaMinted++;
        buddhasMintedByAddress[msg.sender]++;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, string(abi.encodePacked("buddha/", _toString(buddhaType))));
        emit BuddhaMinted(msg.sender, tokenId, buddhaType);

        if (msg.value > BUDDHA_PRICE) {
            payable(msg.sender).transfer(msg.value - BUDDHA_PRICE);
        }
    }

    function mintYaksha(uint256 yakshaType) external payable nonReentrant {
        require(yakshasSaleActive, "Yaksha sale not active");
        require(yakshaType >= 1 && yakshaType <= 12, "Invalid yaksha type");
        require(yakshaMinted < MAX_TWELVE_YAKSHAS, "Yaksha NFTs sold out");
        require(msg.value >= YAKSHA_PRICE, "Insufficient payment");
        require(yakshasMintedByAddress[msg.sender] < MAX_PER_WALLET_YAKSHA, "Wallet mint limit reached");

        uint256 tokenId = MAX_SEVEN_BUDDHAS + _tokenIdCounter++;
        yakshaMinted++;
        yakshasMintedByAddress[msg.sender]++;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, string(abi.encodePacked("yaksha/", _toString(yakshaType))));
        emit YakshaMinted(msg.sender, tokenId, yakshaType);

        if (msg.value > YAKSHA_PRICE) {
            payable(msg.sender).transfer(msg.value - YAKSHA_PRICE);
        }
    }

    function setSaleState(bool _buddhasActive, bool _yakshsActive) external onlyOwner {
        saleActive = _buddhasActive;
        yakshasSaleActive = _yakshsActive;
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
        uint256 tokenId = _tokenIdCounter++;
        buddhaMinted++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, string(abi.encodePacked("buddha/", _toString(buddhaType))));
        emit BuddhaMinted(to, tokenId, buddhaType);
    }

    function totalSupply() external view returns (uint256) { return _tokenIdCounter; }
    function remainingBuddhas() external view returns (uint256) { return MAX_SEVEN_BUDDHAS - buddhaMinted; }
    function remainingYakshas() external view returns (uint256) { return MAX_TWELVE_YAKSHAS - yakshaMinted; }
    function _baseURI() internal view override returns (string memory) { return _baseTokenURI; }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) return "0";
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) { digits++; temp /= 10; }
        bytes memory buffer = new bytes(digits);
        while (value != 0) { digits--; buffer[digits] = bytes1(uint8(48 + uint256(value % 10))); value /= 10; }
        return string(buffer);
    }
}
