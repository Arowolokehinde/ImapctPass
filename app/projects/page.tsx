"use client"

import { useState } from "react"
import { FadeIn } from "@/components/ui/fade-in"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Users, Calendar, TrendingUp } from "lucide-react"

export default function ProjectsPage() {
  const [selectedTier, setSelectedTier] = useState<{ [key: number]: string }>({})

  const projects = [
    {
      id: 1,
      title: "Agua Limpia para Todos",
      ensName: "agualimp.impactp",
      location: "Rural Colombia",
      category: "Water & Sanitation",
      verified: true,
      monthlyGoal: 5000,
      currentSubscribers: 234,
      monthlyRaised: 3850,
      totalRaised: 47500,
      image: "/clean-water-well-in-kenya-village.png",
      description: "Providing sustainable water solutions to remote Colombian communities affected by climate change",
      impact: "Clean water access for 1,200 families in 8 villages",
      subscriptionTiers: [
        { amount: 5, name: "Supporter", benefits: "Monthly updates, community access" },
        { amount: 20, name: "Advocate", benefits: "Video calls with beneficiaries, impact reports" },
        { amount: 50, name: "Champion", benefits: "Site visits, direct communication with NGO team" },
      ],
      lastUpdate: "3 days ago",
      updateFrequency: "Weekly",
    },
    {
      id: 2,
      title: "Educación Solar Guatemala",
      ensName: "educsolar.impactp",
      location: "Guatemala Highlands",
      category: "Education & Energy",
      verified: true,
      monthlyGoal: 3500,
      currentSubscribers: 189,
      monthlyRaised: 2980,
      totalRaised: 28400,
      image: "/solar-panels-on-school-roof-guatemala.png",
      description: "Bringing renewable energy and digital education to indigenous communities in Guatemala",
      impact: "Solar power for 12 schools, benefiting 800 students",
      subscriptionTiers: [
        { amount: 5, name: "Friend", benefits: "Student artwork, progress photos" },
        { amount: 20, name: "Mentor", benefits: "Virtual classroom visits, teacher interviews" },
        { amount: 50, name: "Partner", benefits: "School naming rights, annual visit coordination" },
      ],
      lastUpdate: "1 day ago",
      updateFrequency: "Bi-weekly",
    },
    {
      id: 3,
      title: "Bosques del Futuro",
      ensName: "bosquesfut.impactp",
      location: "Amazon Basin, Peru",
      category: "Environmental",
      verified: true,
      monthlyGoal: 7500,
      currentSubscribers: 456,
      monthlyRaised: 6200,
      totalRaised: 89300,
      image: "/tree-planting-reforestation-brazil-rainforest.png",
      description: "Community-led reforestation and sustainable livelihood programs in the Peruvian Amazon",
      impact: "25,000 native trees planted, 150 families with sustainable income",
      subscriptionTiers: [
        { amount: 5, name: "Seedling", benefits: "Tree certificates, forest updates" },
        { amount: 20, name: "Guardian", benefits: "GPS coordinates of your trees, drone footage" },
        { amount: 50, name: "Protector", benefits: "Meet local families, forest expedition invites" },
      ],
      lastUpdate: "5 days ago",
      updateFrequency: "Monthly",
    },
  ]

  const handleSubscribe = (projectId: number, tier: string) => {
    // This would integrate with the wallet context and smart contracts
    console.log(`[v0] Subscribing to project ${projectId} with tier ${tier}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <FadeIn>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Verified LATAM NGOs</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Support verified Latin American NGOs through monthly subscriptions. Build lasting relationships and watch
              your impact grow with evolving ImpactPass NFTs.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <FadeIn key={project.id} delay={index * 0.1}>
              <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {project.verified && (
                      <Badge className="bg-primary/90 text-primary-foreground">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    <Badge variant="secondary">{project.category}</Badge>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg mb-1">{project.title}</CardTitle>
                      <p className="text-sm text-primary font-mono">{project.ensName}</p>
                      <p className="text-sm text-muted-foreground">{project.location}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{project.description}</p>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Monthly Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round((project.monthlyRaised / project.monthlyGoal) * 100)}%
                      </span>
                    </div>
                    <Progress value={(project.monthlyRaised / project.monthlyGoal) * 100} className="mb-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>${project.monthlyRaised.toLocaleString()} this month</span>
                      <span>${project.monthlyGoal.toLocaleString()} goal</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Users className="w-4 h-4 mx-auto mb-1 text-primary" />
                      <p className="text-lg font-semibold">{project.currentSubscribers}</p>
                      <p className="text-xs text-muted-foreground">Subscribers</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <TrendingUp className="w-4 h-4 mx-auto mb-1 text-primary" />
                      <p className="text-lg font-semibold">${project.totalRaised.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Total Raised</p>
                    </div>
                  </div>

                  <div className="bg-primary/5 rounded-lg p-3 mb-6">
                    <p className="text-sm font-medium text-foreground mb-1">Expected Impact:</p>
                    <p className="text-sm text-muted-foreground">{project.impact}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-3">Choose Monthly Subscription:</p>
                    <div className="space-y-2">
                      {project.subscriptionTiers.map((tier) => (
                        <div
                          key={tier.amount}
                          className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            selectedTier[project.id] === tier.name
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => setSelectedTier((prev) => ({ ...prev, [project.id]: tier.name }))}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">
                              ${tier.amount}/month - {tier.name}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">{tier.benefits}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      Updates {project.updateFrequency}
                    </div>
                    <span>Last update: {project.lastUpdate}</span>
                  </div>

                  <Button
                    className="w-full mt-auto"
                    onClick={() =>
                      handleSubscribe(project.id, selectedTier[project.id] || project.subscriptionTiers[0].name)
                    }
                    disabled={!selectedTier[project.id]}
                  >
                    {selectedTier[project.id]
                      ? `Subscribe as ${selectedTier[project.id]}`
                      : "Select a tier to subscribe"}
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  )
}
