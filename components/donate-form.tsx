"use client"

import { useState, useEffect } from "react"
import { useWallet } from "@/contexts/wallet-context"
import { useContracts } from "@/hooks/use-contracts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, AlertCircle, Coins } from "lucide-react"
import { SUPPORTED_TOKENS, type SupportedToken } from "@/lib/contracts"
import { useToast } from "@/hooks/use-toast"

export function DonateForm() {
  const { address, isConnected } = useWallet()
  const { toast } = useToast()
  const {
    loading,
    error,
    tokenBalance,
    donorInfo,
    hasImpactPass,
    donate,
    approveTokens,
    mintTokens,
    checkAllowance,
    clearError
  } = useContracts()

  const [selectedToken, setSelectedToken] = useState<SupportedToken>("MOCK_USDC")
  const [amount, setAmount] = useState("")
  const [step, setStep] = useState<"input" | "approve" | "donate" | "success">("input")
  const [isProcessing, setIsProcessing] = useState(false)
  const [needsApproval, setNeedsApproval] = useState(false)

  const tokenConfig = SUPPORTED_TOKENS[selectedToken]
  const hasBalance = Number.parseFloat(amount || "0") <= Number.parseFloat(tokenBalance)
  const isValidAmount = amount && Number.parseFloat(amount) > 0

  // Check if approval is needed when amount changes
  useEffect(() => {
    const checkApproval = async () => {
      if (isValidAmount && isConnected) {
        const hasAllowance = await checkAllowance(amount)
        setNeedsApproval(!hasAllowance)
      }
    }
    checkApproval()
  }, [amount, isValidAmount, isConnected, checkAllowance])

  const handleMintTokens = async () => {
    try {
      setIsProcessing(true)
      await mintTokens("1000") // Mint 1000 tokens for testing
      toast({
        title: "Tokens Minted!",
        description: "1000 Mock USDC tokens have been minted to your wallet.",
      })
    } catch (error) {
      toast({
        title: "Mint Failed",
        description: error instanceof Error ? error.message : "Failed to mint tokens",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleApprove = async () => {
    if (!isValidAmount) return

    try {
      setStep("approve")
      setIsProcessing(true)
      clearError()

      await approveTokens(amount)
      setNeedsApproval(false)
      
      toast({
        title: "Approval Successful",
        description: "You can now proceed with your donation.",
      })
      setStep("input")
    } catch (error) {
      console.error("Approve error:", error)
      toast({
        title: "Approval Failed",
        description: error instanceof Error ? error.message : "Failed to approve token spending",
        variant: "destructive",
      })
      setStep("input")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDonate = async () => {
    if (!isValidAmount) return

    try {
      setStep("donate")
      setIsProcessing(true)
      clearError()

      await donate(amount)
      
      setStep("success")
      toast({
        title: "Donation Successful!",
        description: "Thank you for your contribution to making a positive impact.",
      })
    } catch (error) {
      console.error("Donate error:", error)
      toast({
        title: "Donation Failed",
        description: error instanceof Error ? error.message : "Failed to process donation",
        variant: "destructive",
      })
      setStep("input")
    } finally {
      setIsProcessing(false)
    }
  }

  const resetForm = () => {
    setAmount("")
    setStep("input")
    setIsProcessing(false)
  }

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Make a Donation</CardTitle>
          <CardDescription>Connect your wallet to start donating</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            Please connect your wallet to make a donation
          </p>
        </CardContent>
      </Card>
    )
  }

  if (step === "success") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            Donation Successful!
          </CardTitle>
          <CardDescription>Your contribution is making a difference</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-2xl font-bold text-primary">
              {amount} {tokenConfig.symbol}
            </p>
            <p className="text-sm text-muted-foreground">donated successfully</p>
          </div>
          <Button onClick={resetForm} className="w-full">
            Make Another Donation
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Make a Donation</CardTitle>
        <CardDescription>Support impactful projects with your crypto donations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Token Selection */}
        <div className="space-y-2">
          <Label htmlFor="token">Select Token</Label>
          <Select value={selectedToken} onValueChange={(value) => setSelectedToken(value as SupportedToken)}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a token" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(SUPPORTED_TOKENS).map(([key, token]) => (
                <SelectItem key={key} value={key}>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{token.symbol}</span>
                    <span className="text-muted-foreground text-sm">{token.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <div className="relative">
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pr-16"
              min="0"
              step="0.01"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Badge variant="secondary" className="text-xs">
                {tokenConfig.symbol}
              </Badge>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Balance: {tokenBalance} {tokenConfig.symbol}</span>
            {Number.parseFloat(tokenBalance) === 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleMintTokens}
                disabled={isProcessing}
                className="h-6 px-2 text-xs"
              >
                <Coins className="w-3 h-3 mr-1" />
                Mint Test Tokens
              </Button>
            )}
          </div>
        </div>

        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {["5", "10", "25"].map((quickAmount) => (
            <Button
              key={quickAmount}
              variant="outline"
              size="sm"
              onClick={() => setAmount(quickAmount)}
              className="text-xs"
            >
              ${quickAmount}
            </Button>
          ))}
        </div>

        {/* Validation Messages */}
        {amount && !hasBalance && (
          <div className="flex items-center gap-2 text-destructive text-sm">
            <AlertCircle className="w-4 h-4" />
            Insufficient balance
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-md">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {needsApproval && isValidAmount ? (
            <Button onClick={handleApprove} disabled={!hasBalance || isProcessing || loading} className="w-full">
              {isProcessing && step === "approve" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Approving...
                </>
              ) : (
                `Approve ${amount} ${tokenConfig.symbol}`
              )}
            </Button>
          ) : (
            <Button 
              onClick={handleDonate} 
              disabled={!isValidAmount || !hasBalance || isProcessing || loading || needsApproval} 
              className="w-full"
            >
              {isProcessing && step === "donate" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                `Donate ${amount || "0"} ${tokenConfig.symbol}`
              )}
            </Button>
          )}
        </div>

        {/* Info */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• First-time donors receive an ImpactPass NFT {hasImpactPass && "✅"}</p>
          <p>• All donations go directly to verified impact projects</p>
          <p>• Track your impact on the dashboard</p>
          {donorInfo && (
            <p>• Your total donated: {(Number(donorInfo.totalDonated) / 1e18).toFixed(2)} {tokenConfig.symbol}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}