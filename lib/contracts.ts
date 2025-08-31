// Contract ABIs and configuration
export const DONATION_CONTRACT_ABI = [
  {
    "type": "constructor",
    "inputs": [
      { "name": "_stablecoin", "type": "address", "internalType": "address" },
      { "name": "_impactPassNFT", "type": "address", "internalType": "address" }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "donate",
    "inputs": [
      { "name": "amount", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "donors",
    "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "outputs": [
      { "name": "totalDonated", "type": "uint256", "internalType": "uint256" },
      { "name": "lastDonationTime", "type": "uint256", "internalType": "uint256" },
      { "name": "hasImpactPass", "type": "bool", "internalType": "bool" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getContractBalance",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getDonorTotalDonated",
    "inputs": [
      { "name": "donor", "type": "address", "internalType": "address" }
    ],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "impactPassNFT",
    "inputs": [],
    "outputs": [
      { "name": "", "type": "address", "internalType": "contract ImpactPassNFT" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "stablecoin",
    "inputs": [],
    "outputs": [
      { "name": "", "type": "address", "internalType": "contract IERC20" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalRaised",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "withdrawFunds",
    "inputs": [
      { "name": "to", "type": "address", "internalType": "address" },
      { "name": "amount", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "DonationReceived",
    "inputs": [
      { "name": "donor", "type": "address", "indexed": true, "internalType": "address" },
      { "name": "amount", "type": "uint256", "indexed": false, "internalType": "uint256" },
      { "name": "totalDonated", "type": "uint256", "indexed": false, "internalType": "uint256" }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ImpactPassMinted",
    "inputs": [
      { "name": "donor", "type": "address", "indexed": true, "internalType": "address" },
      { "name": "tokenId", "type": "uint256", "indexed": false, "internalType": "uint256" }
    ],
    "anonymous": false
  }
] as const

export const IMPACT_PASS_NFT_ABI = [
  {
    "type": "function",
    "name": "balanceOf",
    "inputs": [
      { "name": "owner", "type": "address", "internalType": "address" }
    ],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getDonorTokenId",
    "inputs": [
      { "name": "donor", "type": "address", "internalType": "address" }
    ],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "hasDonorMinted",
    "inputs": [
      { "name": "donor", "type": "address", "internalType": "address" }
    ],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "mintImpactPass",
    "inputs": [
      { "name": "to", "type": "address", "internalType": "address" }
    ],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "tokenURI",
    "inputs": [
      { "name": "tokenId", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "totalSupply",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "Transfer",
    "inputs": [
      { "name": "from", "type": "address", "indexed": true, "internalType": "address" },
      { "name": "to", "type": "address", "indexed": true, "internalType": "address" },
      { "name": "tokenId", "type": "uint256", "indexed": true, "internalType": "uint256" }
    ],
    "anonymous": false
  }
] as const

// Standard ERC20 ABI for stablecoin interactions
export const ERC20_ABI = [
  {
    "type": "function",
    "name": "allowance",
    "inputs": [
      { "name": "owner", "type": "address", "internalType": "address" },
      { "name": "spender", "type": "address", "internalType": "address" }
    ],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "approve",
    "inputs": [
      { "name": "spender", "type": "address", "internalType": "address" },
      { "name": "value", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "balanceOf",
    "inputs": [
      { "name": "account", "type": "address", "internalType": "address" }
    ],
    "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "mint",
    "inputs": [
      { "name": "to", "type": "address", "internalType": "address" },
      { "name": "amount", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  }
] as const

// Contract addresses - update these with your deployed contract addresses
export const CONTRACTS = {
  DONATION_CONTRACT: {
    address: (process.env.NEXT_PUBLIC_DONATION_CONTRACT_ADDRESS || "0x0f804BB7b789fd677b75eF50fBAb708E0945bF1b") as `0x${string}`,
    abi: DONATION_CONTRACT_ABI,
  },
  IMPACT_PASS_NFT: {
    address: (process.env.NEXT_PUBLIC_IMPACT_PASS_ADDRESS || "0x95FcDB9aE90941CCC60a685ad9957FdEca8742F6") as `0x${string}`,
    abi: IMPACT_PASS_NFT_ABI,
  },
} as const

// Supported tokens configuration
export const SUPPORTED_TOKENS = {
  MOCK_USDC: {
    address: (process.env.NEXT_PUBLIC_STABLECOIN_ADDRESS || "0x1A55d67647CC5Fa7605a62ab570c0B4B574c429A") as `0x${string}`,
    symbol: "MUSDC",
    decimals: 18,
    name: "Mock USDC",
    abi: ERC20_ABI,
  },
} as const

export type SupportedToken = keyof typeof SUPPORTED_TOKENS

// Contract interaction types
export interface DonorInfo {
  totalDonated: bigint
  lastDonationTime: bigint
  hasImpactPass: boolean
}

export interface ContractError extends Error {
  code?: string | number
  reason?: string
}