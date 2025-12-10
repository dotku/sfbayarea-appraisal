# San Francisco Bay Area Appraisal Association | 舊金山灣區鑒寶協會

Professional appraisal and authentication services for antiques, art, and collectibles in the San Francisco Bay Area.

## Features

- **Bilingual Support**: Full English and Chinese language support with URL-based routing
- **Modern Design**: Clean, professional UI built with Tailwind CSS
- **Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Type-Safe**: Built with TypeScript for reliability

## Pages

- **Home**: Overview of services and pricing highlights
- **Services**: Detailed information about all appraisal services
- **Pricing**: Transparent pricing tiers for different service levels
- **Contact**: Contact form and location information

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Internationalization**: next-intl
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Development

The website will be available at:

- English: http://localhost:3001/en
- Chinese: http://localhost:3001/zh

### Project Structure

```
sfbayarea-appraisal/
├── app/
│   └── [locale]/
│       ├── page.tsx          # Home page
│       ├── services/         # Services page
│       ├── pricing/          # Pricing page
│       └── contact/          # Contact page
├── messages/
│   ├── en.json              # English translations
│   └── zh.json              # Chinese translations
├── i18n/
│   ├── routing.ts           # Routing configuration
│   └── request.ts           # Request configuration
└── middleware.ts            # Internationalization middleware
```

## Internationalization

The website supports two languages with URL-based routing:

- **English** (`/en`): Default language
- **Chinese** (`/zh`): Traditional Chinese

Translation files are located in the `/messages` directory.

## Pricing Information

All pricing is displayed in USD and includes:

- Initial Consultation: $150
- Single Item Appraisal: $200-500
- Multiple Items (3-10): $150-400 per item
- Collection Appraisal: $1,000+
- Specialized Appraisal: $500-2,000
- Insurance Documentation: $300-800

## Deployment

This project is optimized for deployment on Vercel:

```bash
# Deploy to Vercel
npx vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## License

© 2025 San Francisco Bay Area Appraisal Association. All rights reserved.

## Contact

- **Email**: info@sfbayareaappraisal.org
- **Phone**: (415) 123-4567
- **Location**: San Francisco Bay Area, CA
