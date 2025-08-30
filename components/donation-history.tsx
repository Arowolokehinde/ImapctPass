"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { History, ExternalLink, Calendar, DollarSign } from "lucide-react"
import Image from "next/image"

const mockDonations = [
  {
    id: "1",
    project: "Clean Water for Kenya",
    amount: 250,
    token: "USDC",
    date: "2024-01-15",
    status: "completed",
    txHash: "0x1234...5678",
    image: "/clean-water-well-in-kenya-village.png",
  },
  {
    id: "2",
    project: "Solar Power for Schools",
    amount: 500,
    token: "DAI",
    date: "2024-01-10",
    status: "completed",
    txHash: "0x2345...6789",
    image: "/solar-panels-on-school-roof-guatemala.png",
  },
  {
    id: "3",
    project: "Reforestation Brazil",
    amount: 150,
    token: "USDC",
    date: "2024-01-05",
    status: "completed",
    txHash: "0x3456...7890",
    image: "/tree-planting-reforestation-brazil-rainforest.png",
  },
  {
    id: "4",
    project: "Medical Clinic Bangladesh",
    amount: 300,
    token: "DAI",
    date: "2023-12-28",
    status: "completed",
    txHash: "0x4567...8901",
    image: "/medical-clinic-bangladesh-rural-healthcare.png",
  },
]

export function DonationHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Donation History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockDonations.map((donation) => (
            <div
              key={donation.id}
              className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="relative h-12 w-12 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={donation.image || "/placeholder.svg"}
                  alt={donation.project}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{donation.project}</h4>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {new Date(donation.date).toLocaleDateString()}
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 font-medium">
                  <DollarSign className="h-4 w-4" />
                  {donation.amount} {donation.token}
                </div>
                <Badge variant="secondary" className="text-xs">
                  {donation.status}
                </Badge>
              </div>

              <Button variant="ghost" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline">Load More</Button>
        </div>
      </CardContent>
    </Card>
  )
}
