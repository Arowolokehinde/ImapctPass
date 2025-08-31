import { ethers } from 'ethers'
import { CONTRACTS, SUPPORTED_TOKENS, type DonorInfo, type ContractError } from './contracts'

// Get provider and signer
export function getProvider() {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('No ethereum provider found')
  }
  return new ethers.BrowserProvider(window.ethereum)
}

export async function getSigner() {
  const provider = getProvider()
  return await provider.getSigner()
}

// Contract instances
export async function getDonationContract() {
  const signer = await getSigner()
  return new ethers.Contract(
    CONTRACTS.DONATION_CONTRACT.address,
    CONTRACTS.DONATION_CONTRACT.abi,
    signer
  )
}

export async function getImpactPassContract() {
  const signer = await getSigner()
  return new ethers.Contract(
    CONTRACTS.IMPACT_PASS_NFT.address,
    CONTRACTS.IMPACT_PASS_NFT.abi,
    signer
  )
}

export async function getStablecoinContract() {
  const signer = await getSigner()
  return new ethers.Contract(
    CONTRACTS.MOCK_STABLECOIN.address,
    CONTRACTS.MOCK_STABLECOIN.abi,
    signer
  )
}

// Utility functions
export function formatTokenAmount(amount: bigint, decimals: number = 18): string {
  return ethers.formatUnits(amount, decimals)
}

export function parseTokenAmount(amount: string, decimals: number = 18): bigint {
  return ethers.parseUnits(amount, decimals)
}

// Contract interaction functions
export class ContractService {
  // Donation Contract Methods
  static async donate(amount: string): Promise<ethers.TransactionResponse> {
    try {
      const donationContract = await getDonationContract()
      const stablecoinContract = await getStablecoinContract()
      const signer = await getSigner()
      const userAddress = await signer.getAddress()

      const parsedAmount = parseTokenAmount(amount, 18)

      // Check balance
      const balance = await stablecoinContract.balanceOf(userAddress)
      if (balance < parsedAmount) {
        throw new Error('Insufficient balance')
      }

      // Check allowance
      const allowance = await stablecoinContract.allowance(userAddress, CONTRACTS.DONATION_CONTRACT.address)
      if (allowance < parsedAmount) {
        throw new Error('Insufficient allowance. Please approve tokens first.')
      }

      // Execute donation
      const tx = await donationContract.donate(parsedAmount)
      return tx
    } catch (error) {
      console.error('Donation error:', error)
      throw error as ContractError
    }
  }

  static async getDonorInfo(address: string): Promise<DonorInfo> {
    try {
      const contract = await getDonationContract()
      const result = await contract.donors(address)
      return {
        totalDonated: result.totalDonated,
        lastDonationTime: result.lastDonationTime,
        hasImpactPass: result.hasImpactPass
      }
    } catch (error) {
      console.error('Get donor info error:', error)
      throw error as ContractError
    }
  }

  static async getTotalRaised(): Promise<bigint> {
    try {
      const contract = await getDonationContract()
      return await contract.totalRaised()
    } catch (error) {
      console.error('Get total raised error:', error)
      throw error as ContractError
    }
  }

  static async getContractBalance(): Promise<bigint> {
    try {
      const contract = await getDonationContract()
      return await contract.getContractBalance()
    } catch (error) {
      console.error('Get contract balance error:', error)
      throw error as ContractError
    }
  }

  // Stablecoin Contract Methods
  static async getTokenBalance(address: string): Promise<bigint> {
    try {
      const contract = await getStablecoinContract()
      return await contract.balanceOf(address)
    } catch (error) {
      console.error('Get token balance error:', error)
      throw error as ContractError
    }
  }

  static async getTokenAllowance(owner: string, spender: string): Promise<bigint> {
    try {
      const contract = await getStablecoinContract()
      return await contract.allowance(owner, spender)
    } catch (error) {
      console.error('Get token allowance error:', error)
      throw error as ContractError
    }
  }

  static async approveToken(amount: string): Promise<ethers.TransactionResponse> {
    try {
      const contract = await getStablecoinContract()
      const parsedAmount = parseTokenAmount(amount, 18)
      const tx = await contract.approve(CONTRACTS.DONATION_CONTRACT.address, parsedAmount)
      return tx
    } catch (error) {
      console.error('Approve token error:', error)
      throw error as ContractError
    }
  }

  static async mintTokens(to: string, amount: string): Promise<ethers.TransactionResponse> {
    try {
      const contract = await getStablecoinContract()
      const parsedAmount = parseTokenAmount(amount, 18)
      const tx = await contract.mint(to, parsedAmount)
      return tx
    } catch (error) {
      console.error('Mint tokens error:', error)
      throw error as ContractError
    }
  }

  // Impact Pass NFT Methods
  static async hasImpactPass(address: string): Promise<boolean> {
    try {
      const contract = await getImpactPassContract()
      return await contract.hasDonorMinted(address)
    } catch (error) {
      console.error('Check impact pass error:', error)
      throw error as ContractError
    }
  }

  static async getImpactPassBalance(address: string): Promise<bigint> {
    try {
      const contract = await getImpactPassContract()
      return await contract.balanceOf(address)
    } catch (error) {
      console.error('Get impact pass balance error:', error)
      throw error as ContractError
    }
  }

  static async getDonorTokenId(address: string): Promise<bigint> {
    try {
      const contract = await getImpactPassContract()
      return await contract.getDonorTokenId(address)
    } catch (error) {
      console.error('Get donor token ID error:', error)
      throw error as ContractError
    }
  }

  static async getTokenURI(tokenId: bigint): Promise<string> {
    try {
      const contract = await getImpactPassContract()
      return await contract.tokenURI(tokenId)
    } catch (error) {
      console.error('Get token URI error:', error)
      throw error as ContractError
    }
  }

  static async getTotalSupply(): Promise<bigint> {
    try {
      const contract = await getImpactPassContract()
      return await contract.totalSupply()
    } catch (error) {
      console.error('Get total supply error:', error)
      throw error as ContractError
    }
  }

  // Event listeners
  static async listenToDonationEvents(callback: (donor: string, amount: bigint, totalDonated: bigint) => void) {
    try {
      const contract = await getDonationContract()
      contract.on('DonationReceived', (donor, amount, totalDonated) => {
        callback(donor, amount, totalDonated)
      })
    } catch (error) {
      console.error('Listen to donation events error:', error)
      throw error as ContractError
    }
  }

  static async listenToImpactPassEvents(callback: (donor: string, tokenId: bigint) => void) {
    try {
      const contract = await getDonationContract()
      contract.on('ImpactPassMinted', (donor, tokenId) => {
        callback(donor, tokenId)
      })
    } catch (error) {
      console.error('Listen to impact pass events error:', error)
      throw error as ContractError
    }
  }

  // Utility method to handle transaction waiting
  static async waitForTransaction(tx: ethers.TransactionResponse, confirmations: number = 1) {
    try {
      const receipt = await tx.wait(confirmations)
      return receipt
    } catch (error) {
      console.error('Transaction failed:', error)
      throw error as ContractError
    }
  }
}

// Error handling utility
export function handleContractError(error: any): string {
  if (error?.reason) {
    return error.reason
  }
  if (error?.message) {
    if (error.message.includes('user rejected')) {
      return 'Transaction was rejected by user'
    }
    if (error.message.includes('insufficient funds')) {
      return 'Insufficient funds for transaction'
    }
    if (error.message.includes('execution reverted')) {
      return 'Transaction failed - contract execution reverted'
    }
    return error.message
  }
  return 'An unknown error occurred'
}