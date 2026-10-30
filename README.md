# CourtFlow — Philippine Sports Store POS

**Developed by Lynnard Aquino**

CourtFlow is a React/TypeScript frontend with an Express/PostgreSQL backend. The interface now uses authenticated API records for inventory, cash sales, shifts, equipment rentals and reports instead of browser-only demo data.

**Development status: not production ready or officially certified.** Payment reconciliation, secure browser sessions, staff administration, receipts, refunds, deposits, reliable sync, automated testing, backups and compliance verification remain outstanding. Do not process real customer transactions yet.

## Run on Windows 11

See [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step Docker, database, API and frontend setup.

In two terminals after configuring the database and secrets:

Backend (from `server`):

```powershell
npm.cmd install
npm.cmd run migrate
npm.cmd run seed
npm.cmd run dev
```

Frontend (from project root):

```powershell
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:5173` and sign in with the owner credentials you seeded. The Vite development server proxies `/api` to the backend on port 4000.

## Current features

- Employee sign-in against database-backed credentials; role-aware navigation
- Product catalog, product creation and audited stock adjustments
- Cashier shift opening and closing
- Cash checkout with server-side stock locking and transaction records
- Equipment registration, rental start and return
- Owner/manager daily totals, sales history and CSV export
- Responsive desktop and mobile layout, PHP currency and Manila time display

## Next steps before launch

- Full staff account management, secure HttpOnly cookie sessions, device registration and permission audit
- Receipts, printers, cash reconciliation, refunds, rental payment and deposit settlement
- Product variants and tube-to-piece inventory conversions
- Automated build, integration and concurrency testing, database backup/restore
- HTTPS, production packaging, cloud replication, multi-device network resilience and regulatory review

The repository is public. Never commit passwords, `.env` files or real customer records.
