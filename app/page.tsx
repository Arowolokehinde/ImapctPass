"use client"

import { useWallet } from "@/contexts/wallet-context"
import { Header } from "@/components/header"
import { DonateForm } from "@/components/donate-form"
import { ImpactPassBadge } from "@/components/impact-pass-badge"
import { Dashboard } from "@/components/dashboard"
import { LotteryButton } from "@/components/lottery-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/ui/fade-in"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { PulseDot } from "@/components/ui/pulse-dot"
import {
  Heart,
  Shield,
  Zap,
  Users,
  TrendingUp,
  Award,
  ArrowRight,
  CheckCircle,
  Wallet,
  Gift,
  MapPin,
  DollarSign,
  Eye,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { isConnected } = useWallet()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-20">
        {!isConnected ? (
          <>
            <section className="relative text-center space-y-8 py-20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 rounded-3xl" />

              <FadeIn>
                <Badge variant="secondary" className="mb-6">
                  <PulseDot size="xs" className="mr-2" />
                  Solving LATAM NGO Funding Crisis
                </Badge>
                <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight max-w-5xl mx-auto">
                  End Donor Fatigue in
                  <span className="text-primary block mt-2">Latin America</span>
                </h1>
              </FadeIn>

              <FadeIn delay={200}>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
                  Connect donors directly with LATAM NGOs through transparent crypto donations, exclusive NFT rewards,
                  and real-time impact tracking that builds lasting relationships.
                </p>
              </FadeIn>

              <FadeIn delay={400}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                  <Button size="lg" className="text-lg px-8 py-6 hover:scale-105 transition-transform">
                    Support LATAM NGOs
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent" asChild>
                    <Link href="/projects">View LATAM Projects</Link>
                  </Button>
                </div>
              </FadeIn>
            </section>

            <section className="py-16">
              <FadeIn delay={500}>
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">The LATAM NGO Funding Crisis</h2>
                  <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                    Latin American NGOs face critical funding challenges that threaten their ability to serve vulnerable
                    communities across the region
                  </p>
                </div>
              </FadeIn>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <FadeIn delay={600}>
                  <Card className="border-primary/20 bg-primary/5 hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <AlertTriangle className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl text-primary">Economic Instability & Donor Fatigue</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        LATAM's economic volatility combined with global donor fatigue has reduced traditional funding
                        by 34% since 2020, forcing NGOs to compete for shrinking resources.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </FadeIn>

                <FadeIn delay={700}>
                  <Card className="border-primary/20 bg-primary/5 hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl text-primary">Disconnected International Donors</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        Geographic and cultural barriers prevent meaningful relationships between international donors
                        and LATAM NGOs, resulting in 67% one-time donation rates.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </FadeIn>

                <FadeIn delay={800}>
                  <Card className="border-primary/20 bg-primary/5 hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Eye className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl text-primary">Impact Reporting Challenges</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        Limited resources for documentation and language barriers make it difficult for LATAM NGOs to
                        demonstrate tangible impact to international supporters.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </FadeIn>

                <FadeIn delay={900}>
                  <Card className="border-primary/20 bg-primary/5 hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <DollarSign className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl text-primary">Unsustainable Funding Cycles</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        Dependence on grant cycles and traditional fundraising creates unpredictable cash flow,
                        preventing LATAM NGOs from planning long-term community programs.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </FadeIn>
              </div>
            </section>

            <section className="py-16">
              <FadeIn delay={1000}>
                <div className="text-center mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Our LATAM Impact</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Real numbers from verified LATAM NGOs creating sustainable change
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/20">
                    <CardContent className="pt-8 pb-6">
                      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                        $<AnimatedCounter end={847392} duration={2500} />
                      </div>
                      <p className="text-muted-foreground font-medium text-lg">Donated to LATAM NGOs</p>
                      <p className="text-sm text-muted-foreground mt-1">Across 12 countries</p>
                    </CardContent>
                  </Card>

                  <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/20">
                    <CardContent className="pt-8 pb-6">
                      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                        <AnimatedCounter end={156} duration={2000} />
                      </div>
                      <p className="text-muted-foreground font-medium text-lg">Verified LATAM NGOs</p>
                      <p className="text-sm text-muted-foreground mt-1">Rigorously vetted</p>
                    </CardContent>
                  </Card>

                  <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-primary/20">
                    <CardContent className="pt-8 pb-6">
                      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                        <AnimatedCounter end={89} duration={1800} />%
                      </div>
                      <p className="text-muted-foreground font-medium text-lg">Donor Retention Rate</p>
                      <p className="text-sm text-muted-foreground mt-1">vs 43% industry average</p>
                    </CardContent>
                  </Card>
                </div>
              </FadeIn>
            </section>

            <section className="py-16">
              <FadeIn delay={1100}>
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Our Solution</h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Addressing every challenge LATAM NGOs face with innovative Web3 technology
                  </p>
                </div>
              </FadeIn>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <FadeIn delay={1200}>
                  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full border-primary/20">
                    <CardHeader className="pb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Award className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">Combat Donor Fatigue</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        Exclusive ImpactPass NFTs and lottery rewards create personal benefits that keep donors engaged
                        and motivated to give repeatedly.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </FadeIn>

                <FadeIn delay={1300}>
                  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full border-primary/20">
                    <CardHeader className="pb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Shield className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">Radical Transparency</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        Every donation tracked on-chain with real-time impact updates, photo evidence, and direct
                        communication from LATAM NGOs.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </FadeIn>

                <FadeIn delay={1400}>
                  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full border-primary/20">
                    <CardHeader className="pb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">Build Strong Relationships</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        Direct connection between donors and LATAM NGOs through comments, updates, and community
                        features that foster lasting partnerships.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </FadeIn>

                <FadeIn delay={1500}>
                  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full border-primary/20">
                    <CardHeader className="pb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Zap className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">Diversified Funding</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        Global crypto donations, community lottery pools, and NFT sales create multiple revenue streams
                        for sustainable LATAM NGO funding.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </FadeIn>

                <FadeIn delay={1600}>
                  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full border-primary/20">
                    <CardHeader className="pb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">LATAM-Focused</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        Exclusively supporting verified Latin American NGOs with local partnerships, cultural
                        understanding, and region-specific solutions.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </FadeIn>

                <FadeIn delay={1700}>
                  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full border-primary/20">
                    <CardHeader className="pb-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <TrendingUp className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">Long-term Viability</CardTitle>
                      <CardDescription className="text-base leading-relaxed">
                        Community ownership through governance tokens and sustainable tokenomics ensure LATAM NGOs have
                        predictable, growing funding.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </FadeIn>
              </div>
            </section>

            {/* How It Works section updated to reflect LATAM NGO focus */}
            <section className="py-16">
              <FadeIn delay={700}>
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Supporting LATAM NGOs is simple with our streamlined donation process
                  </p>
                </div>
              </FadeIn>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <FadeIn delay={800}>
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Wallet className="w-8 h-8 text-primary" />
                    </div>
                    <div className="bg-primary/5 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <h3 className="text-xl font-semibold">Connect Wallet</h3>
                    <p className="text-muted-foreground">
                      Connect your MetaMask or other Web3 wallet to start supporting LATAM NGOs with secure crypto
                      donations
                    </p>
                  </div>
                </FadeIn>

                <FadeIn delay={900}>
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <MapPin className="w-8 h-8 text-primary" />
                    </div>
                    <div className="bg-primary/5 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <h3 className="text-xl font-semibold">Choose LATAM NGO</h3>
                    <p className="text-muted-foreground">
                      Browse verified Latin American NGOs and select causes that resonate with your values
                    </p>
                  </div>
                </FadeIn>

                <FadeIn delay={1000}>
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Gift className="w-8 h-8 text-primary" />
                    </div>
                    <div className="bg-primary/5 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <h3 className="text-xl font-semibold">Track Real Impact</h3>
                    <p className="text-muted-foreground">
                      Receive exclusive NFTs and see transparent, real-time updates on how your donation creates change
                    </p>
                  </div>
                </FadeIn>
              </div>
            </section>

            <section className="py-16">
              <FadeIn delay={1500}>
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Donor & NGO Success Stories</h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Real testimonials from our community transforming LATAM NGO funding
                  </p>
                </div>
              </FadeIn>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <FadeIn delay={1600}>
                  <Card className="hover:shadow-lg transition-all duration-300 h-full">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-4 h-4 bg-yellow-400 rounded-full" />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        "ImpactP solved my donor fatigue. Seeing real-time updates from the children's shelter in Bogotá
                        and earning NFT badges makes every donation meaningful."
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-semibold">M</span>
                        </div>
                        <div>
                          <p className="font-semibold">Maria Rodriguez</p>
                          <p className="text-sm text-muted-foreground">Monthly Donor, USA</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>

                <FadeIn delay={1700}>
                  <Card className="hover:shadow-lg transition-all duration-300 h-full">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-4 h-4 bg-yellow-400 rounded-full" />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        "Our reforestation NGO in Peru went from struggling for funds to having predictable monthly
                        support. The direct donor engagement changed everything."
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-semibold">C</span>
                        </div>
                        <div>
                          <p className="font-semibold">Carlos Mendoza</p>
                          <p className="text-sm text-muted-foreground">NGO Director, Lima</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>

                <FadeIn delay={1800}>
                  <Card className="hover:shadow-lg transition-all duration-300 h-full">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-4 h-4 bg-yellow-400 rounded-full" />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        "The transparency is incredible. I can track exactly how my crypto donations help build water
                        wells in rural Guatemala communities."
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-semibold">J</span>
                        </div>
                        <div>
                          <p className="font-semibold">James Thompson</p>
                          <p className="text-sm text-muted-foreground">Impact Champion, Canada</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FadeIn>
              </div>
            </section>

            <section className="py-20">
              <FadeIn delay={1900}>
                <Card className="max-w-4xl mx-auto text-center hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                  <CardHeader className="pb-6">
                    <div className="flex items-center justify-center gap-2 mb-6">
                      <PulseDot size="sm" />
                      <Badge variant="secondary" className="text-base px-4 py-2">
                        Join the Movement
                      </Badge>
                    </div>
                    <CardTitle className="text-3xl md:text-4xl mb-4">Help End the LATAM NGO Funding Crisis</CardTitle>
                    <CardDescription className="text-xl leading-relaxed max-w-2xl mx-auto">
                      Connect your wallet and become part of the solution that's transforming how Latin American NGOs
                      receive sustainable funding
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-center gap-6 text-base text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Shield className="w-5 h-5 text-primary" />
                        Transparent
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        LATAM-Focused
                      </span>
                      <span className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-primary" />
                        Sustainable
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>
                        Connect your wallet above to start supporting verified LATAM NGOs and earning ImpactPass NFTs
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </section>
          </>
        ) : (
          // Connected user dashboard
          <div className="space-y-8">
            <FadeIn>
              <div className="text-center space-y-4 pb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-balance">
                  Your <span className="text-primary">ImpactP</span> Dashboard
                </h1>
                <p className="text-lg text-muted-foreground">Track your donations, NFTs, and impact on LATAM NGOs</p>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card className="text-center hover:shadow-lg transition-all duration-300 h-24 flex items-center justify-center">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-primary mb-1">$2,450</div>
                    <p className="text-xs text-muted-foreground">Total Donated</p>
                  </CardContent>
                </Card>
                <Card className="text-center hover:shadow-lg transition-all duration-300 h-24 flex items-center justify-center">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-primary mb-1">7</div>
                    <p className="text-xs text-muted-foreground">LATAM NGOs Supported</p>
                  </CardContent>
                </Card>
                <Card className="text-center hover:shadow-lg transition-all duration-300 h-24 flex items-center justify-center">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-primary mb-1">3</div>
                    <p className="text-xs text-muted-foreground">ImpactPass NFTs</p>
                  </CardContent>
                </Card>
                <Card className="text-center hover:shadow-lg transition-all duration-300 h-24 flex items-center justify-center">
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-primary mb-1">12</div>
                    <p className="text-xs text-muted-foreground">Impact Updates</p>
                  </CardContent>
                </Card>
              </div>
            </FadeIn>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left Column - Primary Actions */}
              <div className="lg:col-span-1 space-y-6">
                <FadeIn delay={200}>
                  <Card className="h-fit">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Heart className="w-5 h-5 text-primary" />
                        Make a Donation
                      </CardTitle>
                      <CardDescription>Support verified LATAM NGOs with crypto</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <DonateForm />
                    </CardContent>
                  </Card>
                </FadeIn>

                <FadeIn delay={300}>
                  <Card className="h-fit">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Gift className="w-5 h-5 text-primary" />
                        Community Lottery
                      </CardTitle>
                      <CardDescription>Join the weekly lottery for bonus rewards</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <LotteryButton />
                    </CardContent>
                  </Card>
                </FadeIn>
              </div>

              {/* Middle Column - NFTs and Achievements */}
              <div className="lg:col-span-1 space-y-6">
                <FadeIn delay={400}>
                  <Card className="h-fit">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Award className="w-5 h-5 text-primary" />
                        Your ImpactPass NFTs
                      </CardTitle>
                      <CardDescription>Exclusive badges showing your impact</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ImpactPassBadge />
                    </CardContent>
                  </Card>
                </FadeIn>

                <FadeIn delay={500}>
                  <Card className="h-fit">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      <Button variant="outline" className="w-full justify-start bg-transparent h-10" asChild>
                        <Link href="/projects">
                          <MapPin className="w-4 h-4 mr-2" />
                          Browse LATAM Projects
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent h-10" asChild>
                        <Link href="/profile">
                          <Users className="w-4 h-4 mr-2" />
                          View Donation History
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent h-10" asChild>
                        <Link href="/leaderboard">
                          <Award className="w-4 h-4 mr-2" />
                          Community Leaderboard
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </FadeIn>
              </div>

              {/* Right Column - Activity Feed */}
              <div className="lg:col-span-1">
                <FadeIn delay={600}>
                  <Card className="h-fit">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Eye className="w-5 h-5 text-primary" />
                        Recent Activity
                      </CardTitle>
                      <CardDescription>Latest updates from your supported NGOs</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <div className="text-sm min-w-0">
                            <p className="font-medium truncate">Water Well Project - Guatemala</p>
                            <p className="text-muted-foreground text-xs leading-relaxed">
                              New photos uploaded showing construction progress
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <div className="text-sm min-w-0">
                            <p className="font-medium truncate">Education Initiative - Peru</p>
                            <p className="text-muted-foreground text-xs leading-relaxed">
                              Monthly impact report available
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <div className="text-sm min-w-0">
                            <p className="font-medium truncate">You earned a new NFT!</p>
                            <p className="text-muted-foreground text-xs leading-relaxed">
                              Generous Donor badge unlocked
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                          </div>
                        </div>
                      </div>

                      <Button variant="outline" size="sm" className="w-full bg-transparent h-9" asChild>
                        <Link href="/profile">View All Activity</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </FadeIn>
              </div>
            </div>

            {/* Full Width Dashboard Component */}
            <FadeIn delay={700}>
              <Dashboard />
            </FadeIn>
          </div>
        )}
      </main>
    </div>
  )
}
