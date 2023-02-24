import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";

const main: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  console.log("Deployer " + deployer);

  /**
   * @dev deploy upgradeable Implementation template
   */

  const templateContract = await deploy("ERC721Collection", {
    from: deployer,
    args: [],
    log: true,
  });

  console.log("Template", templateContract.address);

  /**
   * @dev deploy Collection factory
   * @params implementation address
   */
  await deploy("CollectionFactory", {
    from: deployer,
    args: [templateContract.address],
    log: true,
  });

  /**
   * @dev deploy Mantleship Open mintable collection
   */
  await deploy("ERC721Mantle", {
    from: deployer,
    args: [],
    log: true,
  });
};

export default main;
