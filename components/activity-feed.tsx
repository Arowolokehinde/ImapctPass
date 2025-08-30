"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/ui/fade-in"
import { PulseDot } from "@/components/ui/pulse-dot"
import { useWallet } from "@/contexts/wallet-context"

interface Activity {
  id: string
  type: "donation" | "milestone" | "project_funded" | "nft_minted"
  user: string
  amount?: number
  project: string
  timestamp: Date
  description: string
}

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "donation",
    user: "0x1234...5678",
    amount: 250,
    project: "Clean Water for Kenya",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    description: "donated $250 USDC to",
  },
  {
    id: "2",
    type: "milestone",
    user: "System",
    project: "Solar Power for Guatemala",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    description: "reached 75% funding milestone",
  },
  {
    id: "3",
    type: "donation",
    user: "0x9876...4321",
    amount: 100,
    project: "Reforestation in Brazil",
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
    description: "donated $100 DAI to",
  },
  {
    id: "4",
    type: "project_funded",
    user: "System",
    project: "Medical Clinic in Bangladesh",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    description: "has been fully funded!",
  },
  {
    id: "5",
    type: "nft_minted",
    user: "0x5555...7777",
    project: "Education Technology for Nigeria",
    timestamp: new Date(Date.now() - 20 * 60 * 1000),
    description: "earned an ImpactPass NFT for supporting",
  },
]

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>(mockActivities)
  const { isConnected } = useWallet()

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const newActivity: Activity = {
        id: Date.now().toString(),
        type: Math.random() > 0.5 ? "donation" : "milestone",
        user: `0x${Math.random().toString(16).substr(2, 4)}...${Math.random().toString(16).substr(2, 4)}`,
        amount: Math.random() > 0.5 ? Math.floor(Math.random() * 500) + 50 : undefined,
        project: ["Clean Water for Kenya", "Solar Power for Guatemala", "Reforestation in Brazil"][
          Math.floor(Math.random() * 3)
        ],
        timestamp: new Date(),
        description:
          Math.random() > 0.5
            ? `donated $${Math.floor(Math.random() * 500) + 50} USDC to`
            : "reached a new funding milestone",
      }

      setActivities((prev) => [newActivity, ...prev.slice(0, 9)])
    }, 15000) // New activity every 15 seconds

    return () => clearInterval(interval)
  }, [])

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "donation":
        return "💰"
      case "milestone":
        return "🎯"
      case "project_funded":
        return "🎉"
      case "nft_minted":
        return "🏆"
      default:
        return "📢"
    }
  }

  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "donation":
        return "bg-emerald-100 text-emerald-800"
      case "milestone":
        return "bg-blue-100 text-blue-800"
      case "project_funded":
        return "bg-purple-100 text-purple-800"
      case "nft_minted":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <PulseDot className="w-2 h-2 bg-emerald-500" />
          Live Activity
        </CardTitle>
        <Badge variant="secondary" className="text-xs">
          Real-time
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <FadeIn key={activity.id} delay={index * 0.1}>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="text-lg">{getActivityIcon(activity.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className={`text-xs ${getActivityColor(activity.type)}`}>
                    {activity.type.replace("_", " ")}
                  </Badge>
                  <span className="text-xs text-gray-500">{formatTimeAgo(activity.timestamp)}</span>
                </div>
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user}</span> {activity.description}{" "}
                  <span className="font-medium text-emerald-600">{activity.project}</span>
                  {activity.amount && <span className="ml-1 font-semibold text-emerald-700">(${activity.amount})</span>}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </CardContent>
    </Card>
  )
}
