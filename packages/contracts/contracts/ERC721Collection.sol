// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

import "./mixings/Ownable.sol";
import "./mixings/ERC721.sol";
import "./mixings/ERC721Enumerable.sol";
import "./mixings/ERC721URIStorage.sol";
import "./mixings/ERC721Burnable.sol";

contract ERC721Collection is
    Initializable,
    ERC2981,
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    ERC721Burnable,
    Ownable
{
    using Counters for Counters.Counter;
    using Address for address;

    address public contractFactory;
    Counters.Counter private _tokenIdCounter;

    event Minted(
        address indexed creator,
        uint256 indexed tokenId,
        address indexed collection
    );

    constructor() {}

    function initialize(
        address _creator,
        string memory _name,
        string memory _symbol
    ) external initializer {
        __ERC721_init(_name, _symbol);
        __Ownable_init(_creator);
        _tokenIdCounter.increment();
    }

    function mint(
        string calldata tokenURI_
    ) external onlyOwner returns (uint256 tokenId) {
        tokenId = _tokenIdCounter.current();
        _safeMint(_msgSender(), tokenId);
        _setTokenURI(tokenId, tokenURI_);
        _tokenIdCounter.increment();
        emit Minted(_msgSender(), tokenId, address(this));
    }

    function mintWithRoyalty(
        string calldata tokenURI_,
        address receiver,
        uint96 feeNumerator
    ) external onlyOwner returns (uint256 tokenId) {
        tokenId = _tokenIdCounter.current();
        _safeMint(_msgSender(), tokenId);
        _tokenIdCounter.increment();
        _setTokenURI(tokenId, tokenURI_);
        _setTokenRoyalty(tokenId, payable(receiver), feeNumerator);

        emit Minted(_msgSender(), tokenId, address(this));
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721Enumerable, ERC2981) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
