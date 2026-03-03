# J. Hummel Consulting – Landing Page

Landing Page für KI- und Automatisierungsberatung. Kontaktformular mit E-Mail-Versand über Brevo (ehemals Sendinblue).

## Voraussetzungen

- Node.js >= 18
- npm
- Ein [Brevo](https://www.brevo.com)-Konto mit API-Zugang

## Installation

```bash
git clone <repository-url>
cd <projektverzeichnis>
npm install
```

## Umgebungsvariablen

Erstelle eine `.env`-Datei im Projektverzeichnis:

```env
BREVO_API_KEY=dein-brevo-api-key
```

| Variable | Beschreibung |
|---|---|
| `BREVO_API_KEY` | API-Schlüssel aus dem Brevo-Konto (SMTP & API > API Keys) |

## Starten

### Entwicklung

```bash
npm run dev
```

Die Anwendung ist dann unter `http://localhost:5000` erreichbar.

### Produktion

```bash
npm run build
npm start
```

## Projektstruktur

```
├── client/                 # Frontend (React + Tailwind CSS)
│   ├── src/
│   │   ├── pages/
│   │   │   └── Home.tsx    # Haupt-Landingpage
│   │   ├── components/ui/  # UI-Komponenten (shadcn/ui)
│   │   ├── index.css       # Design-Tokens und Styles
│   │   └── App.tsx         # Router-Konfiguration
│   └── index.html
├── server/                 # Backend (Express.js)
│   ├── index.ts            # Server-Einstiegspunkt
│   ├── routes.ts           # API-Routen (/api/contact)
│   └── storage.ts          # Storage-Interface
├── shared/
│   └── schema.ts           # Datenmodelle
└── package.json
```

## API

### POST /api/contact

Sendet eine Potentialanalyse-Anfrage per E-Mail.

**Request Body (JSON):**

```json
{
  "vorname": "Max",
  "nachname": "Mustermann",
  "unternehmen": "IT Consulting GmbH",
  "email": "max@beispiel.de",
  "telefon": "+49 123 456789",
  "beschreibung": "Freitext",
  "datenschutz": true
}
```

**E-Mail-Konfiguration:**

- Absender: `info@businesshelpdesk.biz`
- Empfänger: `jh@unixweb.de`
- Reply-To: E-Mail-Adresse des Anfragenden

## Technologie-Stack

- **Frontend:** React, Tailwind CSS v4, shadcn/ui, Framer Motion, wouter
- **Backend:** Express.js, Zod (Validierung)
- **E-Mail:** Brevo Transactional Email API
