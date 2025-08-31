"use client"

import { useWallet } from "@/contexts/wallet-context"
import { useContracts } from "@/hooks/use-contracts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, Wallet, Trophy, Coins, TrendingUp } from "lucide-react"

export function ContractDashboard() {
  const { address, isConnected } = useWallet()
  const {
    loading,
    tokenBalance,
    donorInfo,
    totalRaised,
    hasImpactPass,
    impactPassBalance,
    fetchUserData,
    fetchContractData,
  } = useContracts()

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Contract Dashboard</CardTitle>
          <CardDescription>Connect your wallet to view contract data</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            Please connect your wallet to view your donation data
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Contract Dashboard</h2>
          <p className="text-muted-foreground">Real-time data from your smart contracts</p>
        </div>
        <Button
          onClick={() => {
            fetchUserData()
            fetchContractData()
          }}
          disabled={loading}
          variant="outline"
          size="sm"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            "Refresh"
          )}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Token Balance */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Token Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                `${Number(tokenBalance).toFixed(2)}`
              )}
            </div>
            <p className="text-xs text-muted-foreground">MOCK USDC</p>
          </CardContent>
        </Card>

        {/* Total Donated */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Total Donated</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                `${donorInfo ? (Number(donorInfo.totalDonated) / 1e18).toFixed(2) : '0.00'}`
              )}
            </div>
            <p className="text-xs text-muted-foreground">MOCK USDC</p>
          </CardContent>
        </Card>

        {/* Total Raised */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                `${Number(totalRaised).toFixed(2)}`
              )}
            </div>
            <p className="text-xs text-muted-foreground">MOCK USDC</p>
          </CardContent>
        </Card>

        {/* Impact Pass */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impact Pass</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <Badge variant={hasImpactPass ? "default" : "secondary"}>
                  {hasImpactPass ? "Owned" : "Not Owned"}
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Balance: {impactPassBalance}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donor Information */}
        <Card>
          <CardHeader>
            <CardTitle>Donor Information</CardTitle>
            <CardDescription>Your donation history and status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Wallet Address:</span>
                  <span className="text-sm text-muted-foreground font-mono">
                    {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'N/A'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Donated:</span>
                  <span className="text-sm">
                    {donorInfo ? (Number(donorInfo.totalDonated) / 1e18).toFixed(4) : '0.0000'} MOCK USDC
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Last Donation:</span>
                  <span className="text-sm text-muted-foreground">
                    {donorInfo && Number(donorInfo.lastDonationTime) > 0 
                      ? new Date(Number(donorInfo.lastDonationTime) * 1000).toLocaleDateString()
                      : 'Never'
                    }
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Impact Pass Status:</span>
                  <Badge variant={hasImpactPass ? "default" : "secondary"}>
                    {hasImpactPass ? "Minted" : "Not Minted"}
                  </Badge>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Contract Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contract Information</CardTitle>
            <CardDescription>Smart contract addresses and details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium">Donation Contract:</span>
                <p className="text-xs text-muted-foreground font-mono break-all">
                  {process.env.NEXT_PUBLIC_DONATION_CONTRACT_ADDRESS || "0x1234567890123456789012345678901234567890"}
                </p>
              </div>
              
              <div>
                <span className="text-sm font-medium">Impact Pass NFT:</span>
                <p className="text-xs text-muted-foreground font-mono break-all">
                  {process.env.NEXT_PUBLIC_IMPACT_PASS_ADDRESS || "0x0987654321098765432109876543210987654321"}
                </p>
              </div>
              
              <div>
                <span className="text-sm font-medium">Mock Stablecoin:</span>
                <p className="text-xs text-muted-foreground font-mono break-all">
                  {process.env.NEXT_PUBLIC_STABLECOIN_ADDRESS || "0xA0b86a33E6441b8435b662303c0f479c7e1d5916"}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                💡 Update your environment variables with actual deployed contract addresses
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}