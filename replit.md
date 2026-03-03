# KI-Beratung Landing Page

## Overview
Landing page for an AI & automation consulting service targeting IT consultants and SMEs in the DACH region.

## Architecture
- **Frontend**: React + Tailwind CSS v4 + shadcn/ui components + Framer Motion
- **Backend**: Express.js server
- **Routing**: wouter (frontend)
- **Email**: Brevo transactional email API

## Key Features
- Single-page landing page with smooth scroll navigation
- Contact form ("Potentialanalyse") that sends structured emails via Brevo API
- Sender/recipient addresses are configured in `server/routes.ts`

## Project Structure
- `client/src/pages/Home.tsx` - Main landing page component (all sections)
- `server/routes.ts` - API route `/api/contact` for Brevo email sending
- `shared/schema.ts` - Data schemas
- `client/src/index.css` - Design system tokens (colors, typography, spacing)

## Environment Variables
- `BREVO_API_KEY` - API key for Brevo transactional email service (secret)

## Design
- Style: Professional "Tech Corporate" with navy blue palette
- Fonts: Plus Jakarta Sans (headings) + Inter (body)
- German language throughout
