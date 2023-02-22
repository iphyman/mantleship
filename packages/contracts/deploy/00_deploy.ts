import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers, upgrades } from "hardhat";

const main: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { admin, deployer } = await getNamedAccounts();

  console.log("Deployer " + deployer);

  /**
   * @dev deploy upgradeable Implementation template
   */
  const TemplateContract = await ethers.getContractFactory("ERC721Collection");
  const templateContract = await upgrades.deployProxy(
    TemplateContract,
    [admin, "Mantleship v1", "MANTv1"],
    { initializer: "initialize", kind: "uups" }
  );

  await templateContract.deployed();

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
