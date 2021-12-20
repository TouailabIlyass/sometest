var Stock = artifacts.require("./Stock.sol");

module.exports = function(deployer) {
  deployer.deploy(Stock);
};

