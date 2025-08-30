"use client"

import { useWallet } from "@/contexts/wallet-context"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Header() {
  const { isConnected, address, connect, disconnect } = useWallet()

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and branding */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">IP</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">ImpactP</h1>
              <p className="text-xs text-muted-foreground">Crypto for Good</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Projects
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              About
            </Link>
            <Link
              href="/leaderboard"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Leaderboard
            </Link>
          </nav>

          {/* Wallet connection and user info */}
          <div className="flex items-center gap-3">
            {isConnected && (
              <Card className="px-3 py-2 bg-muted/50 h-10 flex items-center">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs h-5">
                    Connected
                  </Badge>
                  <span className="text-sm font-medium truncate max-w-[120px]">{address}</span>
                </div>
              </Card>
            )}

            {!isConnected ? (
              <Button onClick={connect} className="rounded-lg h-10 px-6">
                Connect Wallet
              </Button>
            ) : (
              <Button onClick={disconnect} variant="outline" className="rounded-lg bg-transparent h-10 px-4">
                Disconnect
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
