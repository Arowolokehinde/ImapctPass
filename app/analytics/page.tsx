import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { Header } from "@/components/header"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive insights into platform performance and impact metrics.
            </p>
          </div>
          <AnalyticsDashboard />
        </div>
      </main>
    </div>
  )
}
