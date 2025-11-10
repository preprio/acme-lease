# ACME Lease

A modern Next.js application built with Prepr CMS, featuring internationalization support, GraphQL API integration, and optimized for deployment on Vercel.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.x or higher
- **pnpm** 10.5.2 or higher (or npm/yarn)
- **Git**

## Environment Variables

Set up your environment variables by either:

### Option 1: Copy from .env.example (Recommended)

Navigate to the project directory and copy the example file:

```bash
cd acme-lease
cp .env.example .env.local
```

Then edit `.env.local` with your actual values.

### Option 2: Create .env.local manually

If `.env.example` doesn't exist, create a `.env.local` file in the `acme-lease` directory and add the following variables:

```env
# Prepr CMS Configuration (Required)
PREPR_GRAPHQL_URL=https://graphql.prepr.io/YOUR_ACCESS_TOKEN
# OR use PREPR_GRAPHQL_TOKEN instead
# PREPR_GRAPHQL_TOKEN=your_access_token_here

# Prepr Environment (optional, set to 'preview' for preview mode)
PREPR_ENV=production

# Application Environment
APP_ENV=production
NODE_ENV=production

# Site URL (required for sitemap generation)
SITE_URL=https://your-domain.com

# HubSpot Integration (optional - for contact forms)
HUBSPOT_PORTAL_ID=your_hubspot_portal_id

# Mailchimp Integration (optional - for newsletter)
MAILCHAMP_API_KEY=your_mailchimp_api_key
MAILCHIMP_API_SERVER=us1
MAILCHIMP_AUDIENCE_ID=your_audience_id
```

### Getting Your Prepr Access Token

1. Log in to your [Prepr account](https://prepr.io)
2. Navigate to **Settings** → **Access tokens**
3. Create a new access token or copy an existing one
4. Use the full GraphQL URL (e.g., `https://graphql.prepr.io/ac_xxxxxxxxxxxxx`) as `PREPR_GRAPHQL_URL`
    - Or extract just the token part and use it as `PREPR_GRAPHQL_TOKEN`

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/preprio/acme-lease.git
cd acme-lease
```

2. **install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

Copy the example environment file:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your actual values. If `.env.example` doesn't exist, create `.env.local` manually using the environment variables listed in the [Environment Variables](#environment-variables) section above.

4. **Generate GraphQL types**

```bash
pnpm codegen
```

This will generate TypeScript types from your Prepr GraphQL schema.

## Development

Start the development server:

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production (includes codegen)
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm codegen` - Generate GraphQL types and operations

## Building for Production

1. **Generate GraphQL types**

```bash
pnpm codegen
```

2. **Build the application**

```bash
pnpm build
```

3. **Start the production server**

```bash
pnpm start
```

## Deployment

### Deploy to Vercel (1-Click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/preprio/acme-lease&env=PREPR_GRAPHQL_URL,SITE_URL&envDescription=Environment%20variables%20required%20for%20the%20application&project-name=acme-lease)

### Manual Deployment to Vercel

1. **Push your code to GitHub**

```bash
git push origin main
```

2. **Import your repository to Vercel**
    - Go to [Vercel Dashboard](https://vercel.com/dashboard)
    - Click **Add New Project**
    - Import your GitHub repository
    - Configure the project:
        - **Framework Preset**: Next.js
        - **Root Directory**: `/`
        - **Build Command**: `pnpm build` (or `npm run build`)
        - **Install Command**: `pnpm install` (or `npm install`)
        - **Output Directory**: `.next`

3. **Add Environment Variables**

    Add all required environment variables in the Vercel dashboard:
    - `PREPR_GRAPHQL_URL` or `PREPR_GRAPHQL_TOKEN`
    - `PREPR_ENV`
    - `APP_ENV`
    - `NODE_ENV`
    - `SITE_URL`
    - `HUBSPOT_PORTAL_ID` (if using HubSpot)
    - `MAILCHAMP_API_KEY` (if using Mailchimp)
    - `MAILCHIMP_API_SERVER` (if using Mailchimp)
    - `MAILCHIMP_AUDIENCE_ID` (if using Mailchimp)

4. **Deploy**

    Click **Deploy** and Vercel will build and deploy your application.

### Environment Variables in Vercel

For different environments (Production, Preview, Development), you can set different values:

- **Production**: Use your production Prepr access token
- **Preview**: Set `PREPR_ENV=preview` to enable preview mode
- **Development**: Use development/staging Prepr access token if available

## Project Structure

```
acme-lease/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   ├── queries/          # GraphQL queries
│   ├── gql/              # Generated GraphQL types
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── i18n/             # Internationalization config
│   └── actions/          # Server actions
├── messages/             # Translation files
├── public/               # Static assets
├── codegen.ts            # GraphQL codegen config
├── next.config.ts        # Next.js configuration
└── tailwind.config.ts    # Tailwind CSS configuration
```

## Internationalization

The application supports 100+ locales. The default locale is `en-US`. All routes are prefixed with the locale (e.g., `/en-US/`, `/nl-NL/`).

Translation files are located in the `messages/` directory:

- `en-US.json` - English (United States)
- `nl-NL.json` - Dutch (Netherlands)

## Preview Mode

To enable preview mode for content editing:

1. Set `PREPR_ENV=preview` in your environment variables
2. The Prepr preview toolbar will appear at the bottom of the page

## Troubleshooting

### GraphQL Code Generation Fails

- Ensure your `PREPR_GRAPHQL_URL` is correct and accessible
- Check that your Prepr access token has the necessary permissions
- Verify network connectivity to `graphql.prepr.io`

### Missing Access Token Error

- Verify `PREPR_GRAPHQL_URL` or `PREPR_GRAPHQL_TOKEN` is set in your environment
- For Vercel deployments, ensure environment variables are added in the dashboard
- Check that the token is valid and not expired

### Build Errors

- Run `pnpm codegen` before building to ensure GraphQL types are generated
- Clear `.next` folder and rebuild: `rm -rf .next && pnpm build`

## Support

For issues and questions:

- **GitHub Issues**: [https://github.com/preprio/acme-lease/issues](https://github.com/preprio/acme-lease/issues)
- **Prepr Documentation**: [https://docs.prepr.io](https://docs.prepr.io)
- **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)

## License

This project is private and proprietary.
