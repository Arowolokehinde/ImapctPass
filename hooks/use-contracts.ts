"use client"

import { useState, useEffect, useCallback } from 'react'
import { useWallet } from '@/contexts/wallet-context'
import { ContractService, formatTokenAmount, handleContractError } from '@/lib/contract-utils'
import type { DonorInfo } from '@/lib/contracts'

export function useContracts() {
  const { address, isConnected } = useWallet()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // State for contract data
  const [tokenBalance, setTokenBalance] = useState<string>('0')
  const [donorInfo, setDonorInfo] = useState<DonorInfo | null>(null)
  const [totalRaised, setTotalRaised] = useState<string>('0')
  const [hasImpactPass, setHasImpactPass] = useState<boolean>(false)
  const [impactPassBalance, setImpactPassBalance] = useState<string>('0')

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Fetch user data
  const fetchUserData = useCallback(async () => {
    if (!address || !isConnected) return

    try {
      setLoading(true)
      setError(null)

      // Fetch token balance
      const balance = await ContractService.getTokenBalance(address)
      setTokenBalance(formatTokenAmount(balance, 18))

      // Fetch donor info
      const info = await ContractService.getDonorInfo(address)
      setDonorInfo(info)

      // Check if user has impact pass
      const hasPass = await ContractService.hasImpactPass(address)
      setHasImpactPass(hasPass)

      // Get impact pass balance
      const passBalance = await ContractService.getImpactPassBalance(address)
      setImpactPassBalance(passBalance.toString())

    } catch (err) {
      console.error('Error fetching user data:', err)
      setError(handleContractError(err))
    } finally {
      setLoading(false)
    }
  }, [address, isConnected])

  // Fetch contract data
  const fetchContractData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch total raised
      const raised = await ContractService.getTotalRaised()
      setTotalRaised(formatTokenAmount(raised, 18))

    } catch (err) {
      console.error('Error fetching contract data:', err)
      setError(handleContractError(err))
    } finally {
      setLoading(false)
    }
  }, [])

  // Donation function
  const donate = useCallback(async (amount: string) => {
    if (!address || !isConnected) {
      throw new Error('Wallet not connected')
    }

    try {
      setLoading(true)
      setError(null)

      // Check allowance first
      const allowance = await ContractService.getTokenAllowance(address, process.env.NEXT_PUBLIC_DONATION_CONTRACT_ADDRESS || "0x1234567890123456789012345678901234567890")
      const requiredAmount = BigInt(amount) * BigInt(10 ** 18) // Convert to wei

      if (allowance < requiredAmount) {
        throw new Error('Insufficient allowance. Please approve tokens first.')
      }

      // Execute donation
      const tx = await ContractService.donate(amount)
      const receipt = await ContractService.waitForTransaction(tx)

      // Refresh user data after successful donation
      await fetchUserData()
      await fetchContractData()

      return receipt
    } catch (err) {
      console.error('Donation error:', err)
      const errorMessage = handleContractError(err)
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [address, isConnected, fetchUserData, fetchContractData])

  // Approve tokens function
  const approveTokens = useCallback(async (amount: string) => {
    if (!address || !isConnected) {
      throw new Error('Wallet not connected')
    }

    try {
      setLoading(true)
      setError(null)

      const tx = await ContractService.approveToken(amount)
      const receipt = await ContractService.waitForTransaction(tx)

      return receipt
    } catch (err) {
      console.error('Approve error:', err)
      const errorMessage = handleContractError(err)
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [address, isConnected])

  // Mint tokens function (for testing)
  const mintTokens = useCallback(async (amount: string) => {
    if (!address || !isConnected) {
      throw new Error('Wallet not connected')
    }

    try {
      setLoading(true)
      setError(null)

      const tx = await ContractService.mintTokens(address, amount)
      const receipt = await ContractService.waitForTransaction(tx)

      // Refresh balance after minting
      await fetchUserData()

      return receipt
    } catch (err) {
      console.error('Mint error:', err)
      const errorMessage = handleContractError(err)
      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [address, isConnected, fetchUserData])

  // Check allowance function
  const checkAllowance = useCallback(async (amount: string): Promise<boolean> => {
    if (!address || !isConnected) return false

    try {
      const allowance = await ContractService.getTokenAllowance(address, process.env.NEXT_PUBLIC_DONATION_CONTRACT_ADDRESS || "0x1234567890123456789012345678901234567890")
      const requiredAmount = BigInt(amount) * BigInt(10 ** 18) // Convert to wei
      return allowance >= requiredAmount
    } catch (err) {
      console.error('Check allowance error:', err)
      return false
    }
  }, [address, isConnected])

  // Effect to fetch data when wallet connects
  useEffect(() => {
    if (isConnected && address) {
      fetchUserData()
      fetchContractData()
    }
  }, [isConnected, address, fetchUserData, fetchContractData])

  return {
    // State
    loading,
    error,
    tokenBalance,
    donorInfo,
    totalRaised,
    hasImpactPass,
    impactPassBalance,

    // Functions
    donate,
    approveTokens,
    mintTokens,
    checkAllowance,
    fetchUserData,
    fetchContractData,
    clearError,
  }
}