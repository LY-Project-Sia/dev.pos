# CourtFlow POS — Hybrid Business Management

Modern Philippine retail and sports equipment rental starter with React frontend and an **early-stage PostgreSQL API**.

## Current implementation

| Feature | Status |
|---|---|
| Modern responsive dashboard and navigation | Frontend demo |
| POS cash cart, inventory editing and rentals | Browser-local demo |
| PostgreSQL schema and migrations | Backend code added |
| Login endpoint and session tokens | Backend code added, not production hardened |
| Transactional cash sales and stock deduction | Backend endpoint added, not connected to UI |
| Staff shifts and equipment rental endpoints | Backend endpoint added, incomplete workflows |
| Audit and sync-outbox tables | Basic infrastructure |
| Cloud sync and offline multi-device coordination | Not implemented |
| Production printing, refund handling, tax compliance | Not implemented |
| Automated tests and production deployment | Not completed |

**Do not use this repository for real transactions yet.** No build, integration or production acceptance test has been verified.

## Requirements

- Node.js 20+ and npm
- Docker Desktop with Compose
- Git
- One computer for development

## Run the frontend

```bash
git clone https://github.com/LY-Project-Sia/dev.pos.git
cd dev.pos
npm install
npm run dev
```

Open the Vite URL shown in the terminal (typically http://localhost:5173). This is a demo frontend using localStorage.

## Start the backend database

Create a root `.env` from `.env.example`, then replace the example password with a long random password.

```bash
docker compose up -d db
```

Create `server/.env` from `server/.env.example`. Set its `DATABASE_URL` to use the **same** password configured in the root `.env`.

Example (replace placeholders):

```text
DATABASE_URL=postgres://courtflow:YOUR_PASSWORD@localhost:5432/courtflow
PORT=4000
APP_ORIGIN=http://localhost:5173
ADMIN_EMAIL=owner@example.com
ADMIN_PASSWORD=YOUR_UNIQUE_16_PLUS_CHARACTER_PASSWORD
```

Do not publish your real credentials or commit either `.env` file.

```bash
cd server
npm install
npm run migrate
npm run seed
npm run dev
```

Check http://localhost:4000/api/health. A successful connection returns JSON with `"ok":true`.

**Important:** The frontend does not yet call the API. Starting both services does not create a unified production application.

## Initial API endpoints

- `POST /api/login`
- `GET /api/me`
- `GET /api/products`
- `POST /api/products`
- `POST /api/products/:id/adjust`
- `POST /api/shifts/open`
- `POST /api/shifts/:id/close`
- `POST /api/sales`
- `GET /api/sales`
- `GET /api/equipment`
- `POST /api/equipment`
- `POST /api/rentals`
- `POST /api/rentals/:id/return`
- `GET /api/reports/summary`
- `GET /api/sync/pending`

Authenticated endpoints currently accept `Authorization: Bearer <token>`. This is a development API contract, not a recommendation to store tokens in browser localStorage.

## Next milestones before live launch

1. Connect the frontend to API with secure session handling and employee/shift screens.
2. Add product unit conversions, accurate per-tube stock accounting, payment methods, returns and refunds.
3. Add rental billing extensions, deposits, damage and equipment handovers.
4. Add reliable cash reconciliation, full financial audit trails and downloadable PDF/XLSX reports.
5. Implement store-local HTTPS, LAN configuration, cloud replication, retry-safe sync and conflict resolution.
6. Add automated tests, printer compatibility, backup/restore and Philippine regulatory review.
7. Conduct a four-cashier pilot and verify real-world operations before launch.

## Security and architecture notes

The repository is public. Never commit credentials or customer data. The current API is a foundation: additional input validation, session lifecycle management, role checks, payment reconciliation, audit coverage, concurrency tests, production TLS and backup procedures are required.

Use one local store server as the authoritative database for multiple simultaneous cashiers. A cloud database should receive synchronized records, not independently compete for stock ownership.
