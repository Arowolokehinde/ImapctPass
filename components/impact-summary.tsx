"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { TrendingUp, Users, Droplets, TreePine, Heart } from "lucide-react"

const impactMetrics = [
  {
    category: "Clean Water",
    icon: Droplets,
    value: 1250,
    unit: "people served",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    category: "Education",
    icon: Users,
    value: 340,
    unit: "students helped",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    category: "Environment",
    icon: TreePine,
    value: 89,
    unit: "trees planted",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    category: "Healthcare",
    icon: Heart,
    value: 156,
    unit: "treatments funded",
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
]

export function ImpactSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Your Impact Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 rounded-lg bg-emerald-50 border border-emerald-200">
            <div className="text-2xl font-bold text-emerald-600 mb-1">
              <AnimatedCounter value={1200} prefix="$" />
            </div>
            <p className="text-sm text-emerald-700">Total Donated</p>
          </div>

          <div className="text-center p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              <AnimatedCounter value={8} />
            </div>
            <p className="text-sm text-blue-700">Projects Supported</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Impact by Category</h4>

          {impactMetrics.map((metric) => {
            const IconComponent = metric.icon

            return (
              <div key={metric.category} className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <IconComponent className={`h-4 w-4 ${metric.color}`} />
                </div>

                <div className="flex-1">
                  <h5 className="font-medium">{metric.category}</h5>
                  <p className="text-sm text-muted-foreground">
                    <AnimatedCounter value={metric.value} /> {metric.unit}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-emerald-50 to-blue-50 border">
          <p className="text-sm text-center text-muted-foreground">
            🎉 Your donations have made a real difference in the world. Thank you for being part of the change!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
