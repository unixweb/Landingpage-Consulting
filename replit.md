# J. Hummel Consulting - Landing Page

## Overview
Landing page for Joachim Hummel's KI- und Automatisierungsberatung (AI & Automation Consulting) targeting IT consultants and SMEs in the DACH region.

## Architecture
- **Frontend**: React + Tailwind CSS v4 + shadcn/ui components + Framer Motion
- **Backend**: Express.js server
- **Routing**: wouter (frontend)
- **Email**: Brevo (formerly Sendinblue) transactional email API

## Key Features
- Single-page landing page with smooth scroll navigation
- Contact form ("Potentialanalyse") that sends structured emails via Brevo API
  - Sender/Recipient addresses configured in `server/routes.ts`
  - Reply-To: set to the submitter's email

## Project Structure
- `client/src/pages/Home.tsx` - Main landing page component (all sections)
- `server/routes.ts` - API route `/api/contact` for Brevo email sending
- `shared/schema.ts` - Data schemas (currently minimal, user model only)
- `client/src/index.css` - Design system tokens (colors, typography, spacing)

## Environment Variables
- `BREVO_API_KEY` - API key for Brevo transactional email service (secret)

## Design
- Style: Professional "Tech Corporate" with navy blue palette
- Fonts: Plus Jakarta Sans (headings) + Inter (body)
- German language throughout
