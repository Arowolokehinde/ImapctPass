export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">About ImpactP</h1>
            <p className="text-xl text-muted-foreground">
              Revolutionizing charitable giving through blockchain technology
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                ImpactP bridges the gap between crypto wealth and global impact. We make it easy for crypto holders to
                donate stablecoins to verified projects while earning ImpactPass NFTs that showcase their contributions
                to positive change.
              </p>
              <p className="text-muted-foreground">
                Every donation is transparent, trackable, and directly funds projects that create measurable impact in
                communities worldwide.
              </p>
            </div>
            <div className="bg-card rounded-lg border p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-4">Platform Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Donated</span>
                  <span className="font-semibold text-primary">$2,799,545</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Donors</span>
                  <span className="font-semibold">15,821</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Projects Funded</span>
                  <span className="font-semibold">341</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Countries Reached</span>
                  <span className="font-semibold">67</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-foreground mb-8 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Connect Wallet</h3>
                <p className="text-muted-foreground">
                  Connect your Web3 wallet to get started with secure, decentralized donations.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Choose Project</h3>
                <p className="text-muted-foreground">
                  Browse verified impact projects and donate USDC or DAI directly to causes you care about.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Earn Impact NFT</h3>
                <p className="text-muted-foreground">
                  Receive ImpactPass NFTs that showcase your contributions and unlock community benefits.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Ready to Make Impact?</h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of crypto donors who are creating positive change around the world.
            </p>
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-md font-medium transition-colors">
              Start Donating
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
