// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

interface ICollectionInitializer {
    function initialize(
        address _creator,
        string memory _name,
        string memory _symbol
    ) external;
}
