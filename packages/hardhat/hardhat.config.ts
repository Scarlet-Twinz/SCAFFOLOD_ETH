import "dotenv/config";
import { defineConfig, overrideTask } from "hardhat/config";
import hardhatToolbox from "@nomicfoundation/hardhat-toolbox-mocha-ethers";
import HardhatDeploy from "hardhat-deploy";
import generateTsAbis from "./scripts/generateTsAbis.js";

// Keep deployment credentials and provider keys outside the repository.
const deployerPrivateKey = process.env.__RUNTIME_DEPLOYER_PRIVATE_KEY;
const providerApiKey = process.env.ALCHEMY_API_KEY;
export const etherscanApiKey = process.env.ETHERSCAN_API_KEY;

export default defineConfig({
  plugins: [hardhatToolbox, HardhatDeploy],
  solidity: {
    compilers: [
      {
        version: "0.8.30",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  generateTypedArtifacts: {
    destinations: [
      {
        folder: "./generated",
        mode: "typescript",
      },
    ],
  },
  verify: {
    etherscan: {
      apiKey: etherscanApiKey,
    },
  },
  networks: {
    default: {
      type: "http",
      url: "http://127.0.0.1:8545",
    },
    hardhat: {
      type: "edr-simulated",
      forking: {
        url: providerApiKey
          ? `https://eth-mainnet.alchemyapi.io/v2/${providerApiKey}`
          : "https://eth-mainnet.public.blastapi.io",
        enabled: process.env.MAINNET_FORKING_ENABLED === "true",
      },
    },
    mainnet: {
      type: "http",
      url: "https://mainnet.rpc.buidlguidl.com",
      accounts: deployerPrivateKey ? [deployerPrivateKey] : [],
    },
    sepolia: {
      type: "http",
      url: providerApiKey
        ? `https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`
        : "https://ethereum-sepolia-rpc.publicnode.com",
      accounts: deployerPrivateKey ? [deployerPrivateKey] : [],
    },
    optimism: {
      type: "http",
      url: providerApiKey
        ? `https://opt-mainnet.g.alchemy.com/v2/${providerApiKey}`
        : "https://mainnet.optimism.io",
      accounts: deployerPrivateKey ? [deployerPrivateKey] : [],
    },
    optimismSepolia: {
      type: "http",
      url: providerApiKey
        ? `https://opt-sepolia.g.alchemy.com/v2/${providerApiKey}`
        : "https://sepolia.optimism.io",
      accounts: deployerPrivateKey ? [deployerPrivateKey] : [],
    },
    base: {
      type: "http",
      url: "https://mainnet.base.org",
      accounts: deployerPrivateKey ? [deployerPrivateKey] : [],
    },
    baseSepolia: {
      type: "http",
      url: "https://sepolia.base.org",
      accounts: deployerPrivateKey ? [deployerPrivateKey] : [],
    },
    arbitrum: {
      type: "http",
      url: providerApiKey
        ? `https://arb-mainnet.g.alchemy.com/v2/${providerApiKey}`
        : "https://arb1.arbitrum.io/rpc",
      accounts: deployerPrivateKey ? [deployerPrivateKey] : [],
    },
    arbitrumSepolia: {
      type: "http",
      url: providerApiKey
        ? `https://arb-sepolia.g.alchemy.com/v2/${providerApiKey}`
        : "https://sepolia-rollup.arbitrum.io/rpc",
      accounts: deployerPrivateKey ? [deployerPrivateKey] : [],
    },
    scrollSepolia: {
      type: "http",
      url: "https://sepolia-rpc.scroll.io",
      accounts: deployerPrivateKey ? [deployerPrivateKey] : [],
    },
    scroll: {
      type: "http",
      url: "https://rpc.scroll.io",
      accounts: deployerPrivateKey ? [deployerPrivateKey] : [],
    },
    celo: {
      type: "http",
      url: "https://forno.celo.org",
      accounts: deployerPrivateKey ? [deployerPrivateKey] : [],
    },
    celoSepolia: {
      type: "http",
      url: "https://forno.celo-sepolia.celo-testnet.org/",
      accounts: deployerPrivateKey ? [deployerPrivateKey] : [],
    },
    polygon: {
      type: "http",
      url: providerApiKey
        ? `https://polygon-mainnet.g.alchemy.com/v2/${providerApiKey}`
        : "https://polygon-rpc.com",
      accounts: deployerPrivateKey ? [deployerPrivateKey] : [],
    },
    polygonAmoy: {
      type: "http",
      url: providerApiKey
        ? `https://polygon-amoy.g.alchemy.com/v2/${providerApiKey}`
        : "https://rpc-amoy.polygon.technology",
      accounts: deployerPrivateKey ? [deployerPrivateKey] : [],
    },
    gnosis: {
      type: "http",
      url: "https://rpc.gnosischain.com",
      accounts: deployerPrivateKey ? [deployerPrivateKey] : [],
    },
    chiado: {
      type: "http",
      url: "https://rpc.chiadochain.net",
      accounts: deployerPrivateKey ? [deployerPrivateKey] : [],
    },
    polygonZkEvm: {
      type: "http",
      url: providerApiKey
        ? `https://polygonzkevm-mainnet.g.alchemy.com/v2/${providerApiKey}`
        : "https://zkevm-rpc.com",
      accounts: deployerPrivateKey ? [deployerPrivateKey] : [],
    },
    polygonZkEvmCardona: {
      type: "http",
      url: providerApiKey
        ? `https://polygonzkevm-cardona.g.alchemy.com/v2/${providerApiKey}`
        : "https://rpc.cardona.zkevm-rpc.com",
      accounts: deployerPrivateKey ? [deployerPrivateKey] : [],
    },
  },
  tasks: [
    overrideTask("deploy")
      .setInlineAction(async (args, _hre, runSuper) => {
        await runSuper(args);
        await generateTsAbis();
      })
      .build(),
  ],
});
