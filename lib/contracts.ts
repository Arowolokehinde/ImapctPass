export const CONTRACTS = {
  DONATION_CONTRACT: {
    address: process.env.NEXT_PUBLIC_DONATION_CONTRACT_ADDRESS || "0x1234567890123456789012345678901234567890",
    abi: [
      "function donate(address token, uint256 amount) external",
      "function totalPooled() external view returns (uint256)",
      "function donorTotals(address donor) external view returns (uint256)",
      "function donorCount() external view returns (uint256)",
      "function donors(uint256 index) external view returns (address)",
      "function pickWinner() external returns (address)",
      "event Donation(address indexed donor, address indexed token, uint256 amount)",
      "event WinnerPicked(address indexed winner, uint256 amount)",
    ],
  },
  IMPACT_PASS_NFT: {
    address: process.env.NEXT_PUBLIC_IMPACT_PASS_ADDRESS || "0x0987654321098765432109876543210987654321",
    abi: [
      "function balanceOf(address owner) external view returns (uint256)",
      "function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256)",
      "function tokenURI(uint256 tokenId) external view returns (string)",
      "function mint(address to) external",
      "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
    ],
  },
} as const

export const SUPPORTED_TOKENS = {
  USDC: {
    address: process.env.NEXT_PUBLIC_USDC_ADDRESS || "0xA0b86a33E6441b8435b662303c0f479c7e1d5916",
    symbol: "USDC",
    decimals: 6,
    name: "USD Coin",
  },
  DAI: {
    address: process.env.NEXT_PUBLIC_DAI_ADDRESS || "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    symbol: "DAI",
    decimals: 18,
    name: "Dai Stablecoin",
  },
} as const

export type SupportedToken = keyof typeof SUPPORTED_TOKENS
