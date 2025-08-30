"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { FadeIn } from "@/components/ui/fade-in"
import { TrendingUp, Users, DollarSign, Target, Globe, Smartphone, Clock } from "lucide-react"

interface AnalyticsData {
  totalDonations: number
  totalDonors: number
  projectsFunded: number
  averageDonation: number
  monthlyGrowth: number
  topCountries: Array<{ name: string; donations: number; percentage: number }>
  deviceStats: Array<{ device: string; percentage: number }>
  timeStats: Array<{ period: string; donations: number; growth: number }>
}

const mockAnalytics: AnalyticsData = {
  totalDonations: 2389313,
  totalDonors: 14482,
  projectsFunded: 322,
  averageDonation: 165,
  monthlyGrowth: 23.5,
  topCountries: [
    { name: "United States", donations: 856432, percentage: 35.8 },
    { name: "Germany", donations: 423156, percentage: 17.7 },
    { name: "United Kingdom", donations: 312789, percentage: 13.1 },
    { name: "Canada", donations: 245678, percentage: 10.3 },
    { name: "Australia", donations: 189234, percentage: 7.9 },
  ],
  deviceStats: [
    { device: "Mobile", percentage: 68 },
    { device: "Desktop", percentage: 28 },
    { device: "Tablet", percentage: 4 },
  ],
  timeStats: [
    { period: "This Week", donations: 45678, growth: 12.3 },
    { period: "This Month", donations: 189234, growth: 23.5 },
    { period: "This Quarter", donations: 567891, growth: 18.7 },
    { period: "This Year", donations: 2389313, growth: 45.2 },
  ],
}

export function AnalyticsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">
                $<AnimatedCounter value={mockAnalytics.totalDonations} />
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-600">+{mockAnalytics.monthlyGrowth}%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Donors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <AnimatedCounter value={mockAnalytics.totalDonors} />
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-600">+12.5%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projects Funded</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <AnimatedCounter value={mockAnalytics.projectsFunded} />
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-600">+8.2%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Donation</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $<AnimatedCounter value={mockAnalytics.averageDonation} />
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-600">+5.7%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="geography">Geography</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Donation Timeline
                  </CardTitle>
                  <CardDescription>Donation performance across different time periods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockAnalytics.timeStats.map((stat, index) => (
                    <div key={stat.period} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{stat.period}</p>
                        <p className="text-xs text-muted-foreground">${stat.donations.toLocaleString()}</p>
                      </div>
                      <Badge variant={stat.growth > 20 ? "default" : "secondary"}>+{stat.growth}%</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Impact Categories</CardTitle>
                  <CardDescription>Distribution of donations across impact areas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Clean Water</span>
                      <span>32%</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Education</span>
                      <span>28%</span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Healthcare</span>
                      <span>24%</span>
                    </div>
                    <Progress value={24} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Environment</span>
                      <span>16%</span>
                    </div>
                    <Progress value={16} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="geography" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Top Contributing Countries
                </CardTitle>
                <CardDescription>Geographic distribution of donations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockAnalytics.topCountries.map((country, index) => (
                  <div key={country.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{country.name}</p>
                        <p className="text-sm text-muted-foreground">${country.donations.toLocaleString()}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{country.percentage}%</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="devices" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Device Usage
                </CardTitle>
                <CardDescription>How users access the platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {mockAnalytics.deviceStats.map((device) => (
                  <div key={device.device} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{device.device}</span>
                      <span>{device.percentage}%</span>
                    </div>
                    <Progress value={device.percentage} className="h-3" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Growth Trends</CardTitle>
                <CardDescription>Platform growth and engagement metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600">+45.2%</div>
                    <p className="text-sm text-muted-foreground">YoY Growth</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600">92%</div>
                    <p className="text-sm text-muted-foreground">User Retention</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600">4.8</div>
                    <p className="text-sm text-muted-foreground">Avg. Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </FadeIn>
    </div>
  )
}
