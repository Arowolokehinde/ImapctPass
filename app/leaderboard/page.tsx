export default function LeaderboardPage() {
  const topDonors = [
    { rank: 1, address: "0x1234...5678", ens: "cryptophilanthropist.eth", donated: 125000, nfts: 15, badge: "🏆" },
    { rank: 2, address: "0x2345...6789", ens: "impactmaker.eth", donated: 98500, nfts: 12, badge: "🥈" },
    { rank: 3, address: "0x3456...7890", ens: "changemaker.eth", donated: 87200, nfts: 11, badge: "🥉" },
    { rank: 4, address: "0x4567...8901", ens: null, donated: 76800, nfts: 9, badge: null },
    { rank: 5, address: "0x5678...9012", ens: "gooddoer.eth", donated: 65400, nfts: 8, badge: null },
    { rank: 6, address: "0x6789...0123", ens: null, donated: 54300, nfts: 7, badge: null },
    { rank: 7, address: "0x7890...1234", ens: "helper.eth", donated: 43200, nfts: 6, badge: null },
    { rank: 8, address: "0x8901...2345", ens: null, donated: 38900, nfts: 5, badge: null },
    { rank: 9, address: "0x9012...3456", ens: "donor.eth", donated: 32100, nfts: 4, badge: null },
    { rank: 10, address: "0x0123...4567", ens: null, donated: 28700, nfts: 3, badge: null },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Donor Leaderboard</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Celebrating our top contributors who are making the biggest impact through crypto donations.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
            <div className="bg-primary/5 px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-foreground">Top Donors This Month</h2>
            </div>

            <div className="divide-y">
              {topDonors.map((donor) => (
                <div key={donor.rank} className="px-6 py-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        {donor.badge ? (
                          <span className="text-xl">{donor.badge}</span>
                        ) : (
                          <span className="font-bold text-primary">#{donor.rank}</span>
                        )}
                      </div>

                      <div>
                        <div className="font-medium text-foreground">
                          {donor.ens || `${donor.address.slice(0, 6)}...${donor.address.slice(-4)}`}
                        </div>
                        {donor.ens && (
                          <div className="text-sm text-muted-foreground">
                            {donor.address.slice(0, 6)}...{donor.address.slice(-4)}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-semibold text-primary">${donor.donated.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{donor.nfts} ImpactPass NFTs</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg border p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-2">$2.8M+</div>
              <div className="text-muted-foreground">Total Donated</div>
            </div>
            <div className="bg-card rounded-lg border p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-2">15,821</div>
              <div className="text-muted-foreground">Active Donors</div>
            </div>
            <div className="bg-card rounded-lg border p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-2">341</div>
              <div className="text-muted-foreground">Projects Funded</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
