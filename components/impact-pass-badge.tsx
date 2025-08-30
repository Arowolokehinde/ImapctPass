"use client"

import { useState, useEffect } from "react"
import { useWallet } from "@/contexts/wallet-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Award, ExternalLink, Sparkles } from "lucide-react"

interface NFTMetadata {
  name: string
  description: string
  image: string
  attributes: Array<{
    trait_type: string
    value: string | number
  }>
}

export function ImpactPassBadge() {
  const { address, isConnected } = useWallet()
  const [nftMetadata, setNftMetadata] = useState<NFTMetadata | null>(null)
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false)
  const [hasNFT, setHasNFT] = useState(false)

  // Mock NFT data for demo
  useEffect(() => {
    if (!isConnected || !address) return

    setIsLoadingMetadata(true)

    // Simulate loading and checking if user has NFT
    setTimeout(() => {
      // Mock: 50% chance user has NFT
      const mockHasNFT = Math.random() > 0.5
      setHasNFT(mockHasNFT)

      if (mockHasNFT) {
        setNftMetadata({
          name: "ImpactPass #1234",
          description: "Your ImpactPass NFT - proof of your contribution to positive change",
          image: "/impactpass-nft-badge-with-emerald-green-design.png",
          attributes: [
            { trait_type: "Type", value: "Donor Badge" },
            { trait_type: "Level", value: "Contributor" },
            { trait_type: "Total Donated", value: "$150.00" },
            { trait_type: "Projects Supported", value: 5 },
          ],
        })
      }

      setIsLoadingMetadata(false)
    }, 2000)
  }, [isConnected, address])

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            ImpactPass NFT
          </CardTitle>
          <CardDescription>Your digital badge of impact</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">Connect your wallet to view your ImpactPass</p>
        </CardContent>
      </Card>
    )
  }

  if (isLoadingMetadata) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            ImpactPass NFT
          </CardTitle>
          <CardDescription>Your digital badge of impact</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="w-full h-48 rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </Card>
    )
  }

  if (!hasNFT) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            ImpactPass NFT
          </CardTitle>
          <CardDescription>Your digital badge of impact</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">No ImpactPass Yet</h3>
            <p className="text-sm text-muted-foreground">
              Make your first donation to mint your ImpactPass NFT and join the community of changemakers.
            </p>
          </div>
          <Badge variant="outline" className="text-xs">
            Mint on First Donation
          </Badge>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" />
          ImpactPass NFT
        </CardTitle>
        <CardDescription>Your digital badge of impact</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {nftMetadata && (
          <>
            {/* NFT Image */}
            <div className="relative">
              <img
                src={nftMetadata.image || "/placeholder.svg"}
                alt={nftMetadata.name}
                className="w-full h-48 object-cover rounded-lg border"
              />
              <Badge className="absolute top-2 right-2 bg-primary/90 backdrop-blur-sm">#1234</Badge>
            </div>

            {/* NFT Details */}
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-lg">{nftMetadata.name}</h3>
                <p className="text-sm text-muted-foreground">{nftMetadata.description}</p>
              </div>

              {/* Attributes */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Attributes</h4>
                <div className="grid grid-cols-2 gap-2">
                  {nftMetadata.attributes.map((attr, index) => (
                    <div key={index} className="bg-muted rounded-lg p-2">
                      <p className="text-xs text-muted-foreground">{attr.trait_type}</p>
                      <p className="text-sm font-medium">{attr.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-transparent"
                  onClick={() => {
                    const openseaUrl = `https://opensea.io/assets/ethereum/0x123.../1234`
                    window.open(openseaUrl, "_blank")
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on OpenSea
                </Button>
              </div>

              {/* Stats */}
              <div className="pt-2 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Owned:</span>
                  <span className="font-medium">1</span>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
