"use client"

import { useState } from "react"
import { useWallet } from "@/contexts/wallet-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FadeIn } from "@/components/ui/fade-in"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { BarChart3, Users, DollarSign, TrendingUp, Plus, Edit, Eye, CheckCircle, Clock } from "lucide-react"

// Mock admin check - in real app, this would verify admin role
const isAdmin = (address: string) => {
  return address === "0x1234567890123456789012345678901234567890" // Mock admin address
}

export default function AdminDashboard() {
  const { isConnected, address } = useWallet()
  const [activeTab, setActiveTab] = useState("overview")
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    goal: "",
    category: "",
    location: "",
  })

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Admin Access Required</CardTitle>
            <CardDescription>Please connect your wallet to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button>Connect Wallet</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isAdmin(address)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You don't have admin privileges to access this dashboard</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  const mockProjects = [
    {
      id: 1,
      title: "Clean Water for Kenya",
      status: "active",
      raised: 45000,
      goal: 50000,
      donors: 234,
      created: "2024-01-15",
    },
    {
      id: 2,
      title: "Solar Power for Schools",
      status: "completed",
      raised: 75000,
      goal: 75000,
      donors: 456,
      created: "2024-01-10",
    },
    {
      id: 3,
      title: "Reforestation Brazil",
      status: "pending",
      raised: 0,
      goal: 100000,
      donors: 0,
      created: "2024-01-20",
    },
  ]

  const handleCreateProject = () => {
    console.log("[v0] Creating new project:", newProject)
    // In real app, this would call API to create project
    setNewProject({ title: "", description: "", goal: "", category: "", location: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <FadeIn>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
            <p className="text-slate-600">Manage projects, track donations, and monitor platform performance</p>
          </div>
        </FadeIn>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <FadeIn delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
                    <DollarSign className="h-4 w-4 text-emerald-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-emerald-600">
                      $<AnimatedCounter value={1793428} />
                    </div>
                    <p className="text-xs text-slate-600">+12% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">
                      <AnimatedCounter value={47} />
                    </div>
                    <p className="text-xs text-slate-600">3 pending approval</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="h-4 w-4 text-purple-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">
                      <AnimatedCounter value={11468} />
                    </div>
                    <p className="text-xs text-slate-600">+8% from last month</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">94%</div>
                    <p className="text-xs text-slate-600">Projects fully funded</p>
                  </CardContent>
                </Card>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest platform activity and milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: "New project approved", project: "Medical Clinic Bangladesh", time: "2 hours ago" },
                      { action: "Project fully funded", project: "Solar Power for Schools", time: "5 hours ago" },
                      { action: "Large donation received", project: "Clean Water for Kenya", time: "1 day ago" },
                      { action: "New user registered", project: "Platform Growth", time: "1 day ago" },
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
                      >
                        <div>
                          <p className="font-medium text-slate-900">{activity.action}</p>
                          <p className="text-sm text-slate-600">{activity.project}</p>
                        </div>
                        <span className="text-xs text-slate-500">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <FadeIn delay={0.1}>
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900">Project Management</h2>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="grid gap-6">
                {mockProjects.map((project, index) => (
                  <Card key={project.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{project.title}</CardTitle>
                          <CardDescription>Created on {project.created}</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              project.status === "active"
                                ? "default"
                                : project.status === "completed"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {project.status === "active" && <CheckCircle className="w-3 h-3 mr-1" />}
                            {project.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                            {project.status === "completed" && <CheckCircle className="w-3 h-3 mr-1" />}
                            {project.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-slate-600">Funding Progress</p>
                          <p className="text-lg font-semibold text-emerald-600">
                            ${project.raised.toLocaleString()} / ${project.goal.toLocaleString()}
                          </p>
                          <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                            <div
                              className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${(project.raised / project.goal) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Total Donors</p>
                          <p className="text-lg font-semibold text-blue-600">{project.donors}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Completion</p>
                          <p className="text-lg font-semibold text-purple-600">
                            {Math.round((project.raised / project.goal) * 100)}%
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </FadeIn>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <FadeIn delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Monitor user activity and engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-emerald-600 mb-2">
                        <AnimatedCounter value={11468} />
                      </div>
                      <p className="text-slate-600">Total Users</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        <AnimatedCounter value={8934} />
                      </div>
                      <p className="text-slate-600">Active Donors</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        <AnimatedCounter value={2534} />
                      </div>
                      <p className="text-slate-600">New This Month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <FadeIn delay={0.1}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Donation Trends</CardTitle>
                    <CardDescription>Monthly donation volume</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-slate-500">
                      <BarChart3 className="w-16 h-16 mb-4" />
                      <p>Chart visualization would go here</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Project Categories</CardTitle>
                    <CardDescription>Distribution by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { category: "Education", percentage: 35, color: "bg-blue-500" },
                        { category: "Healthcare", percentage: 28, color: "bg-red-500" },
                        { category: "Environment", percentage: 22, color: "bg-green-500" },
                        { category: "Infrastructure", percentage: 15, color: "bg-yellow-500" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{item.category}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-slate-200 rounded-full h-2">
                              <div
                                className={`${item.color} h-2 rounded-full transition-all duration-500`}
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                            <span className="text-sm text-slate-600 w-8">{item.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </FadeIn>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
