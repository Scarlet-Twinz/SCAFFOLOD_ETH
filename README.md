# Scaffold ETH

A Scaffold-ETH based Ethereum dApp development workspace containing a Next.js frontend, Hardhat smart-contract environment, deployment tooling, and a starter Solidity contract.

> **Repository note:** This project is a Scaffold-ETH starter/fork. The included `YourContract.sol` is the example contract supplied by the starter rather than a custom production protocol.

## What It Contains

- Next.js frontend for interacting with Ethereum applications.
- React 19 and TypeScript-based UI.
- Hardhat development and deployment environment.
- Solidity `YourContract` example with greeting state, counters, events, and owner-controlled withdrawal.
- Viem, Wagmi, and RainbowKit for wallet and blockchain interaction.
- Typed contract artifacts generated from the Hardhat package.
- Support for local development and multiple EVM networks.

## Architecture

```text
Next.js / React UI
       |
       | Wagmi + Viem + RainbowKit
       v
Wallet / EVM Network
       |
       v
Hardhat + Solidity Contracts
       |
       +--> Local development network
       +--> EVM testnets / mainnets
```

## Tech Stack

- Next.js
- React
- TypeScript
- Solidity
- Hardhat
- Viem
- Wagmi
- RainbowKit
- Yarn
- Scaffold-ETH tooling

## Repository Structure

```text
SCAFFOLOD_ETH/
├── packages/
│   ├── nextjs/          # Next.js dApp frontend
│   └── hardhat/         # Solidity contracts, deployment and tests
├── docs/                # Project documentation
├── .github/             # GitHub workflows and configuration
└── README.md
```

## Example Contract

The included `YourContract.sol` demonstrates common Solidity concepts:

- Mutable on-chain greeting text
- Global and per-user counters
- Events for greeting changes
- A premium flag based on transaction value
- An owner-only withdrawal function
- ETH receiving through the contract's `receive` function

This contract is intended for learning and experimentation, not as an audited production financial contract.

## Getting Started

### Requirements

- Node.js compatible with the workspace tooling
- Yarn 4

### Install

```bash
yarn install
```

### Start the frontend

```bash
cd packages/nextjs
yarn dev
```

### Work with the contracts

From `packages/hardhat`, use the repository's Hardhat scripts for compiling, testing, and deploying contracts. Network credentials should be supplied through environment variables rather than committed to the repository.

## Environment Variables

Provider, explorer, and deployment credentials belong in local environment configuration. In particular:

```text
ALCHEMY_API_KEY=
ETHERSCAN_API_KEY=
__RUNTIME_DEPLOYER_PRIVATE_KEY=
MAINNET_FORKING_ENABLED=false
```

Never commit real API keys or private keys to GitHub. The Hardhat configuration is intentionally set up to read these values from the environment.

## Security Note

This repository previously contained hardcoded provider/explorer credentials in the Hardhat configuration. Those values have been removed from the current source and replaced with environment-based configuration. If any previously committed credential was real and still active, rotate it with the relevant provider.

## Current Status

This repository is best presented as an **Ethereum dApp starter and smart-contract development project**. It is useful for demonstrating familiarity with blockchain frontend integration, wallet connectivity, Solidity, Hardhat, and EVM development workflows.

## Attribution

Built from the Scaffold-ETH ecosystem and starter patterns. Original starter authors and upstream contributors should be credited when distributing derivative work.

## Author

**Anthony Emmanuella Mmasinachi**

GitHub: [@Scarlet-Twinz](https://github.com/Scarlet-Twinz)

## License

MIT
