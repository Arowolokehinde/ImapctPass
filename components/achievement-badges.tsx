"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Star, Crown, Heart } from "lucide-react"

const achievements = [
  {
    id: "1",
    name: "First Donation",
    description: "Made your first donation to a project",
    icon: Heart,
    earned: true,
    earnedDate: "2023-12-15",
    rarity: "common",
  },
  {
    id: "2",
    name: "Generous Donor",
    description: "Donated over $1,000 total",
    icon: Star,
    earned: true,
    earnedDate: "2024-01-10",
    rarity: "rare",
  },
  {
    id: "3",
    name: "Impact Champion",
    description: "Supported 10+ different projects",
    icon: Crown,
    earned: false,
    progress: 8,
    target: 10,
    rarity: "legendary",
  },
  {
    id: "4",
    name: "Early Supporter",
    description: "One of the first 100 platform users",
    icon: Award,
    earned: true,
    earnedDate: "2023-12-01",
    rarity: "epic",
  },
]

const rarityColors = {
  common: "bg-gray-100 text-gray-800",
  rare: "bg-blue-100 text-blue-800",
  epic: "bg-purple-100 text-purple-800",
  legendary: "bg-yellow-100 text-yellow-800",
}

export function AchievementBadges() {
  const earnedCount = achievements.filter((a) => a.earned).length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          Achievements
          <Badge variant="secondary">
            {earnedCount}/{achievements.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {achievements.map((achievement) => {
            const IconComponent = achievement.icon

            return (
              <div
                key={achievement.id}
                className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                  achievement.earned ? "bg-emerald-50 border-emerald-200" : "bg-muted/50 border-muted"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    achievement.earned ? "bg-emerald-100 text-emerald-600" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-medium ${achievement.earned ? "text-foreground" : "text-muted-foreground"}`}>
                      {achievement.name}
                    </h4>
                    <Badge variant="secondary" className={`text-xs ${rarityColors[achievement.rarity]}`}>
                      {achievement.rarity}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>

                  {achievement.earned ? (
                    <p className="text-xs text-emerald-600">
                      Earned {new Date(achievement.earnedDate!).toLocaleDateString()}
                    </p>
                  ) : achievement.progress !== undefined ? (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>
                          {achievement.progress}/{achievement.target}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div
                          className="bg-emerald-500 h-1.5 rounded-full transition-all"
                          style={{ width: `${(achievement.progress! / achievement.target!) * 100}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">Not earned yet</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
