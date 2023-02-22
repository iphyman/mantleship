import { ethers, upgrades } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";

describe("CollectionFactory", function () {
  // Reuseable fixture
  async function deployCollectionFactoryFixture() {
    const [admin, minter1, minter2, minter3] = await ethers.getSigners();

    /**
     * @dev deploy Implementation template
     */
    const TemplateContract = await ethers.getContractFactory(
      "ERC721Collection",
    );

    const templateContract = await upgrades.deployProxy(
      TemplateContract,
      [admin.address, "Mantleship v1", "MANTv1"],
      { initializer: "initialize", kind: "uups" }
    );

    await templateContract.deployed();

    /**
     * @dev deploy Collection factory
     */
    const CollectionFactory = await ethers.getContractFactory(
      "CollectionFactory"
    );
    const collectionFactory = await CollectionFactory.deploy(
      templateContract.address
    );
    await collectionFactory.deployed();

    return {
      admin,
      collectionFactory,
      templateContract,
      minter1,
      minter2,
      minter3,
    };
  }

  describe("Deployments", function () {
    it("Should set the right factory admin", async function () {
      const { admin, collectionFactory, templateContract } = await loadFixture(
        deployCollectionFactoryFixture
      );

      const owner = await collectionFactory.owner();
      console.log("Admin: ", owner);
      console.log("Factory: ", collectionFactory.address);
      console.log("Template: ", templateContract.address);
      expect(owner).to.equal(admin.address);
    });

    it("Should create new collection", async function () {
      const { admin, collectionFactory } = await loadFixture(
        deployCollectionFactoryFixture
      );

      const tx = await collectionFactory.createCollection(
        "Mantle Ape",
        "MAPE",
        1
      );

      const receipt = await tx.wait();
      const event = receipt?.events?.find(
        (event: any) => event.event === "CollectionCreated"
      );

      const { collection, creator, name, symbol } = event.args;

      console.log("==========Collection Created=========")
      // console.log(event.args);
      console.log("Creator: ", creator);
      console.log("Collection: ", collection);
      console.log("Name: ", name);
      console.log("Symbol: ", symbol);
    });
  });
});
