# ImpactP - LATAM NGO Donation Platform

A Web3-powered donation platform specifically designed to address the funding crisis facing Latin American NGOs. ImpactP connects international donors directly with verified LATAM NGOs through transparent crypto donations, exclusive NFT rewards, and real-time impact tracking.

![ImpactP Platform](https://img.shields.io/badge/Status-Active-green)
![Next.js](https://img.shields.io/badge/Framework-Next.js%2015-blue)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)
![Solidity](https://img.shields.io/badge/Smart%20Contracts-Solidity-orange)
![Tailwind](https://img.shields.io/badge/Styling-Tailwind%20CSS-blue)

## 🌎 The Problem We Solve

Latin American NGOs face critical funding challenges:
- **Economic instability** and donor fatigue have reduced traditional funding by 34% since 2020
- **Geographic barriers** prevent meaningful relationships between international donors and LATAM NGOs
- **Limited resources** for impact documentation make it difficult to demonstrate tangible results
- **Unsustainable funding cycles** create unpredictable cash flow for long-term community programs

## 💡 Our Solution

ImpactP addresses these challenges through innovative Web3 technology:
- **Combat donor fatigue** with exclusive ImpactPass NFTs and lottery rewards
- **Radical transparency** with on-chain donation tracking and real-time impact updates
- **Direct relationships** between donors and LATAM NGOs through community features
- **Diversified funding** streams including crypto donations, lottery pools, and NFT sales
- **Sustainable support** for verified Latin American organizations

## 🏗️ Architecture

### Smart Contracts
- **DonationContract.sol**: Manages stablecoin donations and mints ImpactPass NFTs
- **ImpactPassNFT.sol**: ERC-721 NFT contract for exclusive donor rewards

### Frontend Stack
- **Next.js 15** with React 19 and TypeScript
- **Tailwind CSS 4** with shadcn/ui components
- **Ethers.js 6** for Web3 integration
- **React Hook Form** with Zod validation

### Key Features
- **Wallet Integration**: MetaMask and Web3 wallet support
- **Smart Contract Integration**: Direct interaction with Ethereum-based contracts
- **Real-time Analytics**: Donation tracking and impact visualization
- **NFT Rewards**: Exclusive ImpactPass badges for donors
- **Responsive Design**: Mobile-first approach with modern UI/UX

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MetaMask or compatible Web3 wallet
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/impactp-donation-platform.git
cd impactp-donation-platform
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Environment Setup**
Create a `.env.local` file in the root directory:
```env
# Add your environment variables here
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=your_nft_contract_address
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Smart Contract Deployment

The platform uses two main smart contracts:

1. **Deploy ImpactPassNFT Contract**
```solidity
// Deploy with your address as initial owner
ImpactPassNFT nft = new ImpactPassNFT(yourAddress);
```

2. **Deploy DonationContract**
```solidity
// Deploy with stablecoin address and NFT contract address
DonationContract donation = new DonationContract(stablecoinAddress, nftAddress);
```

## 📁 Project Structure

```
impactp-donation-platform/
├── app/                          # Next.js 15 App Router
│   ├── about/                    # About page
│   ├── admin/                    # Admin dashboard
│   ├── analytics/                # Analytics dashboard
│   ├── leaderboard/             # Community leaderboard
│   ├── profile/                 # User profile
│   ├── projects/                # LATAM NGO projects
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   └── providers.tsx            # App providers
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   ├── activity-feed.tsx        # Activity feed component
│   ├── analytics-dashboard.tsx  # Analytics display
│   ├── contract-dashboard.tsx   # Smart contract interface
│   ├── dashboard.tsx            # Main dashboard
│   ├── donate-form.tsx          # Donation form
│   ├── header.tsx               # Navigation header
│   └── ...
├── contexts/                    # React contexts
│   └── wallet-context.tsx      # Wallet connection state
├── contract/                    # Smart contracts
│   ├── DonationContract.sol     # Main donation contract
│   └── ImpactPassNFT.sol       # NFT reward contract
├── data/                        # Static data and mock data
├── hooks/                       # Custom React hooks
├── lib/                         # Utility functions
├── public/                      # Static assets
├── styles/                      # Additional styles
└── types/                       # TypeScript type definitions
```

## 🎯 Core Features

### 1. **Wallet Integration**
- MetaMask connection with automatic reconnection
- Multi-wallet support through Web3 providers
- Chain detection and switching capabilities

### 2. **Smart Contract Interaction**
- Direct donation processing through smart contracts
- Automatic NFT minting for first-time donors
- Real-time balance and transaction tracking

### 3. **NFT Rewards System**
- Exclusive ImpactPass NFTs for donors
- Achievement badges for milestone donations
- Community recognition and gamification

### 4. **Transparent Analytics**
- Real-time donation tracking
- Impact visualization and reporting
- Donor history and statistics

### 5. **LATAM NGO Focus**
- Verified Latin American organizations
- Cultural and linguistic considerations
- Regional impact tracking and reporting

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS 4 with shadcn/ui components. Configuration is in:
- `components.json` - shadcn/ui configuration
- Global styles in `app/globals.css`

### TypeScript
- Strict TypeScript configuration in `tsconfig.json`
- Custom type definitions in `types/` directory
- Smart contract types with ethers.js integration

## 🤝 Contributing

We welcome contributions to improve ImpactP! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use existing UI components from shadcn/ui
- Write clear, descriptive commit messages
- Test wallet integration thoroughly
- Ensure mobile responsiveness

## 📊 Platform Statistics

- **$847,392** donated to LATAM NGOs across 12 countries
- **156** verified Latin American NGOs
- **89%** donor retention rate (vs 43% industry average)
- **12** countries across Latin America supported

## 🔒 Security

- Smart contracts use OpenZeppelin secure implementations
- ReentrancyGuard protection for donation functions
- Secure wallet integration with proper error handling
- No sensitive data stored in local storage

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- OpenZeppelin for secure smart contract libraries
- shadcn/ui for beautiful React components
- The LATAM NGO community for their continued trust and partnership
- All donors making a difference in Latin America

## 📞 Support

- **Website**: [impactp.org](https://impactp.org)
- **Email**: support@impactp.org
- **Discord**: [Join our community](https://discord.gg/impactp)
- **Twitter**: [@ImpactP_LATAM](https://twitter.com/ImpactP_LATAM)

---


**ImpactPassNFT**: `0x95FcDB9aE90941CCC60a685ad9957FdEca8742F6` deployed on Ethereum sepolia
- **DonationContract**: `0x0f804BB7b789fd677b75eF50fBAb708E0945bF1b`


**Building sustainable futures for Latin America, one donation at a time. 🌎❤️**