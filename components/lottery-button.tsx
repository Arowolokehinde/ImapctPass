"use client"

import { useState, useEffect } from "react"
import { useWallet } from "@/contexts/wallet-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Dice6, Trophy, Sparkles, Clock, Users, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function LotteryButton() {
  const { address, isConnected } = useWallet()
  const { toast } = useToast()
  const [lastWinner, setLastWinner] = useState<string | null>(null)
  const [isPickingWinner, setIsPickingWinner] = useState(false)
  const [mockTimeLeft, setMockTimeLeft] = useState(3600) // 1 hour in seconds
  const [isLoadingStats, setIsLoadingStats] = useState(true)
  const [mockStats, setMockStats] = useState({
    totalPooled: "45,230.75",
    donorCount: "1,247",
    userDonations: "125.50",
  })

  // Mock countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setMockTimeLeft((prev) => (prev > 0 ? prev - 1 : 3600)) // Reset to 1 hour when reaches 0
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Mock data loading
  useEffect(() => {
    if (!isConnected) return

    setIsLoadingStats(true)
    setTimeout(() => {
      setIsLoadingStats(false)
    }, 1500)
  }, [isConnected])

  const handlePickWinner = async () => {
    if (!isConnected) return

    try {
      setIsPickingWinner(true)

      // Mock winner selection process
      setTimeout(() => {
        const mockWinners = ["0x1234...5678", "0x2345...6789", "0x3456...7890", "0x4567...8901", "0x5678...9012"]
        const randomWinner = mockWinners[Math.floor(Math.random() * mockWinners.length)]
        setLastWinner(randomWinner)
        setIsPickingWinner(false)
        toast({
          title: "Winner Selected!",
          description: `Congratulations to ${randomWinner}!`,
        })
      }, 3000)
    } catch (error) {
      console.error("Pick winner error:", error)
      setIsPickingWinner(false)
      toast({
        title: "Lottery Failed",
        description: "Failed to pick winner. Please try again.",
        variant: "destructive",
      })
    }
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const prizeAmount = (Number.parseFloat(mockStats.totalPooled.replace(/,/g, "")) * 0.1).toFixed(2) // 10% of pool
  const isEligible = Number.parseFloat(mockStats.userDonations) > 0
  const hasEnoughParticipants = Number.parseInt(mockStats.donorCount.replace(/,/g, "")) >= 3

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dice6 className="w-5 h-5" />
            Community Lottery
          </CardTitle>
          <CardDescription>Connect wallet to participate</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">Connect your wallet to join the lottery</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Dice6 className="w-5 h-5 text-primary" />
          Community Lottery
        </CardTitle>
        <CardDescription>Win a share of the donation pool</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Prize Pool */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span className="text-sm text-muted-foreground">Current Prize</span>
          </div>
          {isLoadingStats ? (
            <Skeleton className="h-8 w-24 mx-auto" />
          ) : (
            <div className="text-3xl font-bold text-primary">${prizeAmount}</div>
          )}
          <p className="text-xs text-muted-foreground">10% of total donations</p>
        </div>

        {/* Countdown Timer */}
        <div className="bg-muted rounded-lg p-4 text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Next Draw In</span>
          </div>
          <div className="text-2xl font-mono font-bold">{formatTime(mockTimeLeft)}</div>
        </div>

        {/* Participants */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Participants:</span>
          {isLoadingStats ? (
            <Skeleton className="h-4 w-8" />
          ) : (
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span className="font-medium">{mockStats.donorCount}</span>
            </div>
          )}
        </div>

        {/* Eligibility Status */}
        <div className="space-y-3">
          {!isEligible ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">Not Eligible</span>
              </div>
              <p className="text-xs text-yellow-700 mt-1">Make a donation to enter the lottery</p>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-800">Eligible to Win!</span>
              </div>
              <p className="text-xs text-green-700 mt-1">You've donated ${mockStats.userDonations}</p>
            </div>
          )}
        </div>

        {/* Pick Winner Button */}
        <div className="space-y-3">
          <Button
            onClick={handlePickWinner}
            disabled={!hasEnoughParticipants || isPickingWinner}
            className="w-full"
            size="lg"
          >
            {isPickingWinner ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Picking Winner...
              </>
            ) : (
              <>
                <Dice6 className="w-4 h-4 mr-2" />
                Pick Winner
              </>
            )}
          </Button>

          {!hasEnoughParticipants && (
            <p className="text-xs text-muted-foreground text-center">Need at least 3 participants to start lottery</p>
          )}
        </div>

        {/* Last Winner */}
        {lastWinner && (
          <div className="border-t border-border pt-4 space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              Latest Winner
            </h4>
            <div className="bg-muted rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm">{lastWinner}</span>
                <Badge variant="secondary" className="text-xs">
                  Winner
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Won ${prizeAmount}</p>
            </div>
          </div>
        )}

        {/* Rules */}
        <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t border-border">
          <p>• Only donors are eligible to win</p>
          <p>• Winner receives 10% of total donation pool</p>
          <p>• New lottery starts every hour</p>
          <p>• Selection is provably random on-chain</p>
        </div>
      </CardContent>
    </Card>
  )
}
