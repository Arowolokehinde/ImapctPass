"use client"

import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DonateForm } from "@/components/donate-form"
import { FadeIn } from "@/components/ui/fade-in"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { ArrowLeft, MapPin, Calendar, Users, Target } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock project data
const projects = {
  "clean-water-kenya": {
    id: "clean-water-kenya",
    title: "Clean Water Wells in Kenya",
    description:
      "Providing sustainable access to clean drinking water for rural communities in Kenya through the construction of solar-powered water wells.",
    longDescription:
      "This project aims to address the critical water shortage affecting over 15 million people in rural Kenya. By installing solar-powered water wells equipped with modern filtration systems, we can provide clean, safe drinking water to communities that currently walk hours each day to access water sources. Each well serves approximately 500 people and includes community training for maintenance and water management.",
    image: "/clean-water-well-in-kenya-village.png",
    location: "Turkana County, Kenya",
    category: "Water & Sanitation",
    targetAmount: 50000,
    currentAmount: 32500,
    donorCount: 127,
    daysLeft: 23,
    impact: {
      beneficiaries: 2500,
      wells: 5,
      communities: 8,
    },
    updates: [
      {
        date: "2024-01-15",
        title: "First well completed in Lokori village",
        description: "Successfully installed and tested the first solar-powered well, now serving 480 people daily.",
      },
      {
        date: "2024-01-08",
        title: "Community training sessions completed",
        description: "Trained 24 community members on well maintenance and water quality testing procedures.",
      },
    ],
  },
  "solar-school-guatemala": {
    id: "solar-school-guatemala",
    title: "Solar Power for Schools in Guatemala",
    description:
      "Installing solar panel systems in rural schools to provide reliable electricity for education and community programs.",
    longDescription:
      "Many rural schools in Guatemala lack reliable electricity, limiting educational opportunities and community development. This project installs solar panel systems with battery storage to provide consistent power for lighting, computers, and educational equipment. Each installation serves 200-300 students and enables evening adult education programs.",
    image: "/solar-panels-on-school-roof-guatemala.png",
    location: "Quiché Department, Guatemala",
    category: "Education & Energy",
    targetAmount: 75000,
    currentAmount: 45200,
    donorCount: 89,
    daysLeft: 31,
    impact: {
      beneficiaries: 1200,
      schools: 4,
      communities: 6,
    },
    updates: [
      {
        date: "2024-01-12",
        title: "Solar installation at Escuela Primaria San Miguel",
        description:
          "Completed installation of 24 solar panels and battery system, powering classrooms and computer lab.",
      },
    ],
  },
}

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = params.id as string
  const project = projects[projectId as keyof typeof projects]

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
            <Link href="/projects">
              <Button>Back to Projects</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const progressPercentage = (project.currentAmount / project.targetAmount) * 100

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <FadeIn>
          <Link
            href="/projects"
            className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <FadeIn delay={0.1}>
              <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <Badge className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm">{project.category}</Badge>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div>
                <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
                <div className="flex items-center text-muted-foreground mb-4 space-x-4">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {project.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {project.daysLeft} days left
                  </div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">{project.longDescription}</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Expected Impact</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="w-5 h-5 text-primary mr-2" />
                      <span className="text-2xl font-bold text-primary">
                        <AnimatedCounter end={project.impact.beneficiaries} />
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">People Helped</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Target className="w-5 h-5 text-primary mr-2" />
                      <span className="text-2xl font-bold text-primary">
                        <AnimatedCounter end={project.impact.wells || project.impact.schools || 0} />
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {project.impact.wells ? "Wells Built" : "Schools Powered"}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <MapPin className="w-5 h-5 text-primary mr-2" />
                      <span className="text-2xl font-bold text-primary">
                        <AnimatedCounter end={project.impact.communities} />
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Communities</p>
                  </div>
                </div>
              </Card>
            </FadeIn>

            <FadeIn delay={0.4}>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Recent Updates</h3>
                <div className="space-y-4">
                  {project.updates.map((update, index) => (
                    <div key={index} className="border-l-2 border-primary/20 pl-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{update.title}</h4>
                        <span className="text-sm text-muted-foreground">{update.date}</span>
                      </div>
                      <p className="text-muted-foreground">{update.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <FadeIn delay={0.2}>
              <Card className="p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Raised</span>
                      <span className="text-sm text-muted-foreground">{progressPercentage.toFixed(0)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-2xl font-bold text-primary">
                        $<AnimatedCounter end={project.currentAmount} />
                      </span>
                      <span className="text-muted-foreground">of ${project.targetAmount.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{project.donorCount} donors</span>
                      <span>{project.daysLeft} days left</span>
                    </div>
                  </div>
                </div>
              </Card>
            </FadeIn>

            <FadeIn delay={0.3}>
              <DonateForm />
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  )
}
