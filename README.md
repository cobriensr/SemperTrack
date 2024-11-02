# SemperTrack - USMC Information Portal

SemperTrack is a comprehensive web application designed for U.S. Marine Corps personnel, providing tools and resources for career management, training tracking, and administrative tasks.

## 🌟 Features

### Core Features

- **Historical Timeline**: Interactive chronicle of USMC history
- **PFT/CFT Calculator**: Physical Fitness Test and Combat Fitness Test score calculator
- **Base Locator**: Interactive map of USMC installations worldwide

### Training & Education

- **Rifle Qualification Calculator**: Track and calculate rifle qualification scores
- **MCMAP Belt Tracker**: Track Marine Corps Martial Arts Program progression
- **Military Symbols & Insignia Guide**: Comprehensive guide to USMC ranks and insignia

### Career Management

- **MOS Explorer**: Browse and search Military Occupational Specialties
- **Promotion Points Calculator**: Calculate composite scores for promotion
- **Professional Reading List**: Track progress through the Commandant's Reading List
- **Leadership Case Studies**: Access and study military leadership scenarios

### Administrative Tools

- **Military Pay Calculator**: Calculate base pay and allowances
- **BAH Lookup Tool**: Basic Allowance for Housing calculator
- **PCS Moving Calculator**: Estimate PCS move costs and allowances
- **Height/Weight Standards**: Calculate and track height/weight standards

### Reference & Information

- **Military Acronym Dictionary**: Searchable database of military acronyms
- **Events Calendar**: Major USMC dates and events
- **"This Day in Marine Corps History"**: Daily historical highlights

## 🛠 Technology Stack

### Frontend

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Query
- **Maps**: Mapbox/Leaflet for base locations
- **Data Visualization**: Recharts

### Backend

- **API**: Next.js API Routes
- **Database**: PostgreSQL on AWS RDS
- **ORM**: Drizzle ORM
- **Authentication**: NextAuth.js

### Infrastructure

- **Cloud Provider**: AWS
- **CDN**: CloudFront
- **Storage**: S3
- **Compute**: Lambda
- **Database**: RDS (PostgreSQL)
- **Search**: OpenSearch
- **IaC**: Terraform
- **CI/CD**: GitHub Actions

## 🏗 Architecture

```mermaid
flowchart TB
    subgraph client["Client Layer"]
        NextJS[NextJS Application]
    end

    subgraph cdn["CDN Layer"]
        CF[CloudFront]
        S3_STATIC[Static Assets]
    end

    subgraph compute["Compute Layer"]
        APIGW[API Gateway]
        Lambda[Lambda Functions]
        Search[OpenSearch]
    end

    subgraph data["Data Layer"]
        RDS[(PostgreSQL)]
        S3[S3 Storage]
        Cache[ElastiCache]
    end

    NextJS --> CF
    CF --> S3_STATIC
    NextJS --> APIGW
    APIGW --> Lambda
    Lambda --> RDS
    Lambda --> Search
    Lambda --> Cache
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- Docker
- AWS CLI
- Terraform

### Local Development

```bash
# Clone the repository
git clone https://github.com/cobriensr/sempertrack.git

# Install dependencies
npm install

# Set up local database
docker-compose up -d

# Run database migrations
npm run db:generate
npm run db:push

# Start development server
npm run dev
```

### Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/sempertrack
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
AWS_REGION=us-east-1
```

## 📦 Deployment

### Infrastructure Setup

```bash
# Initialize Terraform
cd terraform
terraform init

# Plan deployment
terraform plan -var-file=environments/prod/terraform.tfvars

# Apply changes
terraform apply -var-file=environments/prod/terraform.tfvars
```

### Application Deployment

```bash
# Build application
npm run build

# Deploy to AWS
npm run deploy
```

## 📚 Documentation

- [API Documentation](./docs/api.md)
- [Database Schema](./docs/schema.md)
- [Infrastructure Setup](./docs/infrastructure.md)
- [Contributing Guide](./CONTRIBUTING.md)

## 🔒 Security

- AWS IAM Roles
- RDS Encryption
- API Authentication
- HTTPS Enforcement
- Regular Security Updates

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- U.S. Marine Corps for inspiration and values
- Open source community
- Contributors and maintainers

## 📞 Contact

- Project Link: [https://github.com/cobriensr/sempertrack](https://github.com/yourusername/sempertrack)
- Website: [https://sempertrack.com](https://sempertrack.com)
