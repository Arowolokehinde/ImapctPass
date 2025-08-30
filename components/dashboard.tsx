"use client"

import { useState, useEffect } from "react"
import { useWallet } from "@/contexts/wallet-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { TrendingUp, Users, DollarSign, Heart, Trophy, Calendar } from "lucide-react"
import impactFeedData from "@/data/impact-feed.json"

interface LeaderboardEntry {
  address: string
  ensName?: string
  totalDonated: string
  rank: number
}

export function Dashboard() {
  const { address, isConnected } = useWallet()
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [isLoadingStats, setIsLoadingStats] = useState(true)
  const [mockStats, setMockStats] = useState({
    userDonations: "125.50",
    totalPooled: "45,230.75",
    donorCount: "1,247",
    userRank: 15,
  })

  // Mock data loading
  useEffect(() => {
    if (!isConnected) return

    setIsLoadingStats(true)

    // Simulate loading stats
    setTimeout(() => {
      setIsLoadingStats(false)

      // Generate mock leaderboard
      const mockData: LeaderboardEntry[] = [
        { address: "0x1234...5678", ensName: "impactmaker.eth", totalDonated: "2,450.00", rank: 1 },
        { address: "0x2345...6789", ensName: "changemaker.eth", totalDonated: "1,890.50", rank: 2 },
        { address: "0x3456...7890", ensName: "donor.eth", totalDonated: "1,234.75", rank: 3 },
        { address: "0x4567...8901", ensName: "donor.eth", totalDonated: "987.25", rank: 4 },
        { address: "0x5678...9012", ensName: "donor.eth", totalDonated: "756.80", rank: 5 },
      ]

      // Add current user if connected
      if (address) {
        mockData.push({
          address,
          totalDonated: mockStats.userDonations,
          rank: mockStats.userRank,
        })
      }

      setLeaderboard(mockData)
    }, 2000)
  }, [isConnected, address, mockStats.userDonations, mockStats.userRank])

  if (!isConnected) {
    return (
      <Card className="mx-auto max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Connect your wallet to view your impact dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            Please connect your wallet to access your dashboard
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="flex flex-col h-[120px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 flex-shrink-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Your Donations</CardTitle>
            <Heart className="h-4 w-4 text-primary flex-shrink-0" />
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center pt-0">
            {isLoadingStats ? (
              <Skeleton className="h-8 w-20 mb-1" />
            ) : (
              <div className="text-2xl font-bold text-foreground mb-1">${mockStats.userDonations}</div>
            )}
            <p className="text-xs text-muted-foreground">Total contributed</p>
          </CardContent>
        </Card>

        <Card className="flex flex-col h-[120px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 flex-shrink-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Pooled</CardTitle>
            <DollarSign className="h-4 w-4 text-primary flex-shrink-0" />
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center pt-0">
            {isLoadingStats ? (
              <Skeleton className="h-8 w-24 mb-1" />
            ) : (
              <div className="text-2xl font-bold text-foreground mb-1">${mockStats.totalPooled}</div>
            )}
            <p className="text-xs text-muted-foreground">Community total</p>
          </CardContent>
        </Card>

        <Card className="flex flex-col h-[120px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 flex-shrink-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Donors</CardTitle>
            <Users className="h-4 w-4 text-primary flex-shrink-0" />
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center pt-0">
            {isLoadingStats ? (
              <Skeleton className="h-8 w-16 mb-1" />
            ) : (
              <div className="text-2xl font-bold text-foreground mb-1">{mockStats.donorCount}</div>
            )}
            <p className="text-xs text-muted-foreground">Contributors</p>
          </CardContent>
        </Card>

        <Card className="flex flex-col h-[120px]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 flex-shrink-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Impact Projects</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary flex-shrink-0" />
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center pt-0">
            <div className="text-2xl font-bold text-foreground mb-1">{impactFeedData.length}</div>
            <p className="text-xs text-muted-foreground">Funded projects</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="impact" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 h-12">
          <TabsTrigger value="impact" className="text-sm font-medium">
            Impact Feed
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="text-sm font-medium">
            Leaderboard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="impact" className="space-y-0">
          <Card>
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Heart className="w-5 h-5 text-primary" />
                Recent Impact Stories
              </CardTitle>
              <CardDescription>See how your donations are making a difference</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {impactFeedData.map((story) => (
                <div key={story.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 flex-shrink-0">
                      <img
                        src={story.image || "/placeholder.svg"}
                        alt={story.title}
                        className="w-full h-full rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-semibold text-sm leading-tight line-clamp-2">{story.title}</h3>
                        <Badge variant="secondary" className="text-xs flex-shrink-0 whitespace-nowrap">
                          {story.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{story.description}</p>
                      <div className="flex items-center gap-6 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <DollarSign className="w-3 h-3 flex-shrink-0" />
                          <span className="font-medium">{story.amount}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 flex-shrink-0" />
                          <span>{new Date(story.date).toLocaleDateString()}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-0">
          <Card>
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Trophy className="w-5 h-5 text-primary" />
                Top Donors
              </CardTitle>
              <CardDescription>Community leaderboard of generous contributors</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingStats ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 h-[72px]">
                      <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {leaderboard.map((entry) => (
                    <div
                      key={entry.address}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-colors h-[72px] ${
                        entry.address.toLowerCase() === address?.toLowerCase()
                          ? "bg-primary/5 border-primary/20"
                          : "bg-muted/20 hover:bg-muted/40"
                      }`}
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-background border flex-shrink-0">
                          {entry.rank <= 3 ? (
                            <Trophy
                              className={`w-4 h-4 ${
                                entry.rank === 1
                                  ? "text-yellow-500"
                                  : entry.rank === 2
                                    ? "text-gray-400"
                                    : "text-amber-600"
                              }`}
                            />
                          ) : (
                            <span className="text-sm font-medium text-muted-foreground">#{entry.rank}</span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm truncate">
                            {entry.ensName || `${entry.address.slice(0, 6)}...${entry.address.slice(-4)}`}
                          </p>
                          {entry.address.toLowerCase() === address?.toLowerCase() && (
                            <Badge variant="outline" className="text-xs mt-1">
                              You
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <p className="font-semibold text-sm">${entry.totalDonated}</p>
                        <p className="text-xs text-muted-foreground">donated</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
