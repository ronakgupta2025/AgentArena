const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying AgentArena contracts to Base...\n");

  // Deploy ArenaToken
  console.log("Deploying ArenaToken...");
  const ArenaToken = await hre.ethers.getContractFactory("ArenaToken");
  const arenaToken = await ArenaToken.deploy();
  await arenaToken.waitForDeployment();
  const tokenAddress = await arenaToken.getAddress();
  console.log("✅ ArenaToken deployed to:", tokenAddress);

  // Deploy TradingArena
  console.log("\nDeploying TradingArena...");
  const TradingArena = await hre.ethers.getContractFactory("TradingArena");
  const tradingArena = await TradingArena.deploy(tokenAddress);
  await tradingArena.waitForDeployment();
  const arenaAddress = await tradingArena.getAddress();
  console.log("✅ TradingArena deployed to:", arenaAddress);

  console.log("\n📝 Deployment Summary:");
  console.log("========================");
  console.log("ArenaToken:", tokenAddress);
  console.log("TradingArena:", arenaAddress);
  console.log("\n🎯 Save these addresses for the frontend!");
  
  // Save to deployments file
  const fs = require('fs');
  const deployments = {
    ArenaToken: tokenAddress,
    TradingArena: arenaAddress,
    network: hre.network.name,
    deployedAt: new Date().toISOString()
  };
  
  fs.writeFileSync(
    './deployments.json',
    JSON.stringify(deployments, null, 2)
  );
  
  console.log("✅ Deployment info saved to deployments.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
