"use client"

import { useState } from "react"
import { useWallet } from "@/contexts/wallet-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { SUPPORTED_TOKENS, type SupportedToken } from "@/lib/contracts"
import { useToast } from "@/hooks/use-toast"

export function DonateForm() {
  const { address, isConnected } = useWallet()
  const { toast } = useToast()
  const [selectedToken, setSelectedToken] = useState<SupportedToken>("USDC")
  const [amount, setAmount] = useState("")
  const [step, setStep] = useState<"input" | "approve" | "donate" | "success">("input")
  const [isProcessing, setIsProcessing] = useState(false)

  const tokenConfig = SUPPORTED_TOKENS[selectedToken]

  // Mock balance and allowance for demo
  const mockBalance = "1000.00"
  const hasBalance = Number.parseFloat(amount || "0") <= Number.parseFloat(mockBalance)
  const isValidAmount = amount && Number.parseFloat(amount) > 0

  const handleApprove = async () => {
    if (!isValidAmount) return

    try {
      setStep("approve")
      setIsProcessing(true)

      // Mock approval process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsProcessing(false)
      toast({
        title: "Approval Successful",
        description: "You can now proceed with your donation.",
      })
      setStep("input")
    } catch (error) {
      console.error("Approve error:", error)
      toast({
        title: "Approval Failed",
        description: "Failed to approve token spending. Please try again.",
        variant: "destructive",
      })
      setStep("input")
      setIsProcessing(false)
    }
  }

  const handleDonate = async () => {
    if (!isValidAmount) return

    try {
      setStep("donate")
      setIsProcessing(true)

      // Mock donation process
      await new Promise((resolve) => setTimeout(resolve, 3000))

      setStep("success")
      setIsProcessing(false)
      toast({
        title: "Donation Successful!",
        description: "Thank you for your contribution to making a positive impact.",
      })
    } catch (error) {
      console.error("Donate error:", error)
      toast({
        title: "Donation Failed",
        description: "Failed to process donation. Please try again.",
        variant: "destructive",
      })
      setStep("input")
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
          <p className="text-xs text-muted-foreground">
            Balance: {mockBalance} {tokenConfig.symbol}
          </p>
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

        {/* Action Button */}
        <div className="space-y-3">
          <Button onClick={handleDonate} disabled={!isValidAmount || !hasBalance || isProcessing} className="w-full">
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {step === "approve" ? "Approving..." : step === "donate" ? "Processing..." : "Loading..."}
              </>
            ) : (
              `Donate ${amount || "0"} ${tokenConfig.symbol}`
            )}
          </Button>
        </div>

        {/* Info */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• First-time donors receive an ImpactPass NFT</p>
          <p>• All donations go directly to verified impact projects</p>
          <p>• Track your impact on the dashboard</p>
        </div>
      </CardContent>
    </Card>
  )
}
