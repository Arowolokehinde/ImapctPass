"use client"

import { useState } from "react"
import { useWallet } from "@/contexts/wallet-context"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Heart, MessageCircle, Share2, Flag } from "lucide-react"
import { FadeIn } from "@/components/ui/fade-in"

interface Comment {
  id: string
  author: string
  authorAddress: string
  content: string
  timestamp: Date
  likes: number
  isLiked: boolean
  replies?: Comment[]
}

interface ProjectCommentsProps {
  projectId: string
}

export function ProjectComments({ projectId }: ProjectCommentsProps) {
  const { isConnected, address } = useWallet()
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Sarah Chen",
      authorAddress: "0x1234...5678",
      content:
        "This project is making such a difference! I visited the community last month and saw the impact firsthand. The clean water access has transformed daily life for hundreds of families.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 12,
      isLiked: false,
      replies: [
        {
          id: "1-1",
          author: "Project Team",
          authorAddress: "0x9876...4321",
          content:
            "Thank you Sarah! Your support means everything to our community. We're planning to expand to 3 more villages next quarter.",
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          likes: 5,
          isLiked: true,
        },
      ],
    },
    {
      id: "2",
      author: "Michael Rodriguez",
      authorAddress: "0x5678...9012",
      content:
        "Amazing transparency in reporting! Love seeing the detailed updates and photos from the field. This is how crypto donations should work.",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      likes: 8,
      isLiked: true,
    },
    {
      id: "3",
      author: "Emma Thompson",
      authorAddress: "0x3456...7890",
      content:
        "Just made my third donation to this project. The progress updates are incredible and the community engagement is top-notch. Keep up the amazing work! 💚",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      likes: 15,
      isLiked: false,
    },
  ])

  const handleSubmitComment = () => {
    if (!newComment.trim() || !isConnected) return

    const comment: Comment = {
      id: Date.now().toString(),
      author: "You",
      authorAddress: address || "",
      content: newComment,
      timestamp: new Date(),
      likes: 0,
      isLiked: false,
    }

    setComments([comment, ...comments])
    setNewComment("")
  }

  const handleLikeComment = (commentId: string) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked,
          }
        }
        return comment
      }),
    )
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Community Discussion</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MessageCircle className="h-4 w-4" />
          {comments.length} comments
        </div>
      </div>

      {/* Comment Form */}
      {isConnected ? (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <Textarea
                placeholder="Share your thoughts about this project..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px] resize-none"
              />
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Commenting as {address?.slice(0, 6)}...{address?.slice(-4)}
                </p>
                <Button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Post Comment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <MessageCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Connect your wallet to join the discussion</p>
              <Button className="bg-emerald-600 hover:bg-emerald-700">Connect Wallet</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <FadeIn key={comment.id} delay={index * 0.1}>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.authorAddress}`} />
                      <AvatarFallback>{comment.author.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{comment.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {comment.authorAddress.slice(0, 6)}...{comment.authorAddress.slice(-4)} •{" "}
                        {formatTimeAgo(comment.timestamp)}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm leading-relaxed mb-4">{comment.content}</p>
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLikeComment(comment.id)}
                    className={`gap-2 ${comment.isLiked ? "text-red-500" : "text-muted-foreground"}`}
                  >
                    <Heart className={`h-4 w-4 ${comment.isLiked ? "fill-current" : ""}`} />
                    {comment.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                    <MessageCircle className="h-4 w-4" />
                    Reply
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 pl-6 border-l-2 border-muted space-y-3">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="space-y-2">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${reply.authorAddress}`}
                            />
                            <AvatarFallback>{reply.author.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{reply.author}</p>
                            <p className="text-xs text-muted-foreground">
                              {reply.authorAddress.slice(0, 6)}...{reply.authorAddress.slice(-4)} •{" "}
                              {formatTimeAgo(reply.timestamp)}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm leading-relaxed pl-11">{reply.content}</p>
                        <div className="flex items-center gap-4 pl-11">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`gap-2 text-xs ${reply.isLiked ? "text-red-500" : "text-muted-foreground"}`}
                          >
                            <Heart className={`h-3 w-3 ${reply.isLiked ? "fill-current" : ""}`} />
                            {reply.likes}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>
    </div>
  )
}
