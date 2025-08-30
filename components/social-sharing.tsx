"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Twitter, Facebook, Link, MessageSquare, Heart, Bookmark } from "lucide-react"
import { toast } from "sonner"

interface SocialSharingProps {
  projectTitle: string
  projectUrl: string
  projectImage?: string
  projectDescription?: string
}

export function SocialSharing({ projectTitle, projectUrl, projectImage, projectDescription }: SocialSharingProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [likes, setLikes] = useState(247)

  const shareText = `Check out this amazing project: ${projectTitle} - Making real impact through crypto donations! 🌍💚`
  const fullUrl = `${window.location.origin}${projectUrl}`

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(fullUrl)}&hashtags=CryptoDonations,ImpactP,Web3ForGood`
    window.open(twitterUrl, "_blank", "width=550,height=420")
  }

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}&quote=${encodeURIComponent(shareText)}`
    window.open(facebookUrl, "_blank", "width=550,height=420")
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      toast.success("Link copied to clipboard!")
    } catch (err) {
      toast.error("Failed to copy link")
    }
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1))
    toast.success(isLiked ? "Removed from favorites" : "Added to favorites!")
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    toast.success(isSaved ? "Removed from saved projects" : "Project saved!")
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Share this project</h3>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`gap-2 ${isLiked ? "text-red-500" : "text-muted-foreground"}`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                {likes}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
                className={`gap-2 ${isSaved ? "text-emerald-600" : "text-muted-foreground"}`}
              >
                <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleTwitterShare}
              className="gap-2 hover:bg-blue-50 hover:border-blue-200 bg-transparent"
            >
              <Twitter className="h-4 w-4 text-blue-500" />
              Twitter
            </Button>
            <Button
              variant="outline"
              onClick={handleFacebookShare}
              className="gap-2 hover:bg-blue-50 hover:border-blue-200 bg-transparent"
            >
              <Facebook className="h-4 w-4 text-blue-600" />
              Facebook
            </Button>
            <Button variant="outline" onClick={handleCopyLink} className="gap-2 hover:bg-gray-50 bg-transparent">
              <Link className="h-4 w-4" />
              Copy Link
            </Button>
            <Button variant="outline" className="gap-2 hover:bg-green-50 hover:border-green-200 bg-transparent">
              <MessageSquare className="h-4 w-4 text-green-600" />
              Discuss
            </Button>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-3">Help spread the word about this project:</p>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-sm font-mono break-all">{shareText}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
