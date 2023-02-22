// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "./interfaces/ICollectionInitializer.sol";

contract CollectionFactory is Ownable {
    using Address for address;
    using Strings for uint256;

    address public implementation;
    uint256 public implementationVersion;

    /**
     * @dev Emitted when collection is created.
     */
    event CollectionCreated(
        address indexed collection,
        address indexed creator,
        string name,
        string symbol
    );

    /**
     * @dev Emitted when the implementation is upgraded.
     */
    event Upgraded(
        address indexed implementation,
        uint256 indexed implementationVersion
    );

    constructor(address _implementation) {
        implementation = _implementation;
    }

    /**
     * @dev Create a new collection contract
     * Nonce a stored on chain as a sequential number
     * @param name The name for the collection
     * @param symbol The symbol for the collection
     * return deployed collection address
     */
    function createCollection(
        string calldata name,
        string calldata symbol,
        uint256 nonce
    ) external returns (address collection) {
        require(bytes(name).length != 0, "CollectionFactory: name is required");
        require(
            bytes(symbol).length != 0,
            "CollectionFactory: symbol is required"
        );
        bytes32 salt = keccak256(abi.encodePacked(msg.sender, nonce));
        collection = Clones.cloneDeterministic(implementation, salt);
        ICollectionInitializer(collection).initialize(msg.sender, name, symbol);

        emit CollectionCreated(collection, msg.sender, name, symbol);
    }

    function upgradeImplementation(address _implementation) external onlyOwner {
        require(
            _implementation.isContract(),
            "CollectionFactory: new implementation is not a contract"
        );

        implementation = _implementation;
        ++implementationVersion;

        ICollectionInitializer(_implementation).initialize(
            address(this),
            string.concat(
                "Mantleship Collection v",
                implementationVersion.toString()
            ),
            string.concat("MANTv", implementationVersion.toString())
        );

        emit Upgraded(_implementation, implementationVersion);
    }
}
