# CourtFlow POS — Phase 1 Starter

Modern responsive frontend starter for a Philippine retail inventory, cashier POS and badminton/pickleball equipment rental business.

## Run

Requires Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Visit the local Vite URL shown in the terminal.

```bash
npm run build
```

## Features

- Premium navy and emerald responsive dashboard
- Point of sale demo with cart, cash received and change
- Editable demo products, prices and stock
- Equipment rental availability demo
- Staff and shift sample overview
- Demo sales history with CSV export
- Philippine Peso formatting

**Important:** This is a frontend demonstration. Data is stored in browser localStorage. It is NOT suitable for real financial transactions or multi-cashier deployment. The dashboard chart is illustrative, and shuttlecock tubes are separate demo products, not yet stock-linked unit conversions.

## Next phases

1. Secure NestJS API, PostgreSQL database, authentication and roles.
2. Transactional inventory and sales with auditable stock movements.
3. Cashier shift reconciliation and device registration.
4. Timed rentals, deposits and equipment reservation locking.
5. Local store server, cloud replication and conflict-safe synchronization.
6. Reporting, printing, backup recovery and automated testing.

Never commit secrets, customer data, or production credentials to this public repository.
