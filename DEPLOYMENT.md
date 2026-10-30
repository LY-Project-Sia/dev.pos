# CourtFlow deployment and launch checklist

**Developer: Lynnard Aquino**

CourtFlow is a work in progress, **not certified or verified for production sales**. The interface now uses the PostgreSQL API instead of browser demo records. The backend must be running; no real sales can be recorded if it is unavailable.

## Windows 11 development setup

1. Install Node.js LTS and Docker Desktop (enable WSL2).
2. Copy `.env.example` to `.env`; choose a long unique `POSTGRES_PASSWORD`.
3. Start Docker Desktop, then run `docker compose up -d db` in the project root.
4. Copy `server/.env.example` to `server/.env`. Set `DATABASE_URL` with the same password and set unique `ADMIN_EMAIL` and `ADMIN_PASSWORD` (16+ characters).
5. In a VS Code terminal in `server`, run `npm.cmd install`, `npm.cmd run migrate`, `npm.cmd run seed`, `npm.cmd run dev`.
6. In another VS Code terminal in the project root, run `npm.cmd install`, then `npm.cmd run dev`.
7. Open `http://localhost:5173`, sign in with your owner credentials, and open a cashier shift before selling.

If the database password contains URL-reserved characters, URL-encode it in `DATABASE_URL`.

## Before deploying publicly

- Set up a secure HTTPS reverse proxy, secure session cookies and CSRF defenses; do not expose this development API directly to the internet.
- Add backups with tested restore, monitoring, printer testing, tax/receipt compliance review and access logging.
- Test concurrent transactions with four cashier devices, failure recovery, shift reconciliation, refunds, rental payments and end-to-end flows.
- Verify the cloud replication design and offline failure policy before claiming offline support.
- Never commit `.env`, credentials, database backups or customer information to this public repository.

## Current limitations

Cash sales, products, shifts and basic equipment rentals use the API. Cashier accounts require admin tooling, rentals do not yet settle payment or deposits, returns and refunds are incomplete, receipt printing is not implemented, and cloud synchronization is not complete. No production deployment has been tested.
