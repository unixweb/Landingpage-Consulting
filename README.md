# KI-Beratung Landing Page

Landing Page mit Kontaktformular fuer KI- und Automatisierungsberatung.

## Tech-Stack

- **Frontend:** React, Tailwind CSS v4, shadcn/ui, Framer Motion
- **Backend:** Node.js, Express
- **E-Mail:** Brevo (ehemals Sendinblue) Transactional Email API
- **Sprache:** TypeScript

## Voraussetzungen

- Node.js >= 18
- npm
- Ein [Brevo](https://www.brevo.com/) Konto mit API Key

## Installation

```bash
git clone <repository-url>
cd <projektverzeichnis>
npm install
cp .env.example .env
```

Trage anschliessend deine echten Werte in die `.env` Datei ein (siehe unten).

## Umgebungsvariablen

Die Anwendung liest Umgebungsvariablen automatisch aus einer `.env` Datei im Projektroot (via `dotenv`).
Erstelle sie anhand der mitgelieferten `.env.example`:

```env
BREVO_API_KEY=dein-brevo-api-key
CONTACT_SENDER_EMAIL=absender@example.com
CONTACT_SENDER_NAME=Potentialanalyse
CONTACT_RECIPIENT_EMAIL=empfaenger@example.com
CONTACT_RECIPIENT_NAME=Max Mustermann
```

| Variable | Beschreibung |
|---|---|
| `BREVO_API_KEY` | API Key aus dem Brevo Dashboard (SMTP & API > API Keys) |
| `CONTACT_SENDER_EMAIL` | Absender-E-Mail (muss in Brevo verifiziert sein) |
| `CONTACT_SENDER_NAME` | Anzeigename des Absenders |
| `CONTACT_RECIPIENT_EMAIL` | Empfaenger-E-Mail fuer Kontaktanfragen |
| `CONTACT_RECIPIENT_NAME` | Anzeigename des Empfaengers |

## Starten

### Development

```bash
npm run dev
```

Die Anwendung ist dann unter `http://localhost:5000` erreichbar.

### Production Build

```bash
npm run build
npm start
```

## Projektstruktur

```
client/               Frontend (React)
  src/
    pages/Home.tsx    Haupt-Landing-Page
    components/ui/    shadcn/ui Komponenten
    index.css         Design-System (Farben, Typografie)
server/               Backend (Express)
  index.ts            Server-Einstiegspunkt
  routes.ts           API-Routen (/api/contact)
shared/
  schema.ts           Datenmodelle
```

## API

### POST /api/contact

Sendet eine Kontaktanfrage per E-Mail.

**Body (JSON):**

```json
{
  "vorname": "Max",
  "nachname": "Mustermann",
  "unternehmen": "Firma GmbH",
  "email": "max@firma.de",
  "telefon": "+49 123 456789",
  "beschreibung": "Unsere Herausforderung...",
  "datenschutz": true
}

```

**Pflichtfelder:** vorname, nachname, unternehmen, email, datenschutz (true)

## Lizenz

MIT
