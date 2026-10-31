# CourtFlow — Philippine Sports Store POS

**Developed by Lynnard Aquino**

CourtFlow is a React/TypeScript frontend with an Express/PostgreSQL backend. The interface now uses authenticated API records for inventory, cash sales, shifts, equipment rentals and reports instead of browser-only demo data.

**Development status: not production ready or officially certified.** Payment reconciliation, secure browser sessions, staff administration, refunds, deposits, reliable sync, automated testing, backups and compliance verification remain outstanding. Do not process real customer transactions yet.

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

## Receipt and login setup (development)

All amounts use Philippine pesos (PHP / ₱), with values stored internally as integer centavos. The receipt template is formatted for 80 mm thermal paper and can be printed through the browser. Store name, address, phone, email, HTTPS logo URL, and receipt footer are editable under Settings by owners/managers. Completed sale amounts remain immutable.

After downloading this branch, run `npm.cmd install`, `npm.cmd run migrate`, and `npm.cmd run seed` in the `server` folder. The seed command creates the initial owner account if missing; it does **not** reset an existing owner password unless you temporarily set `ADMIN_RESET_PASSWORD=true` in your private `server/.env`, rerun `npm.cmd run seed`, then remove that setting. If login fails, open `http://localhost:4000/api/health` and read the backend terminal for the precise database error. Never share `.env` files or credentials.

For **Gmail**, enable Google Account 2-Step Verification, then create a Google App Password at https://myaccount.google.com/apppasswords (availability depends on account policy). In your private `server/.env`, use `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=465`, `SMTP_USER=youraddress@gmail.com`, `SMTP_PASS=your_app_password`, and `SMTP_FROM=youraddress@gmail.com`. Never use your normal Gmail password or commit your App Password to GitHub. Restart the API and use **Settings → Test email connection**. Google Workspace administrators may restrict App Passwords. Gmail also has sending limits and is not ideal for high-volume transactional receipts.\n\nTo enable optional customer receipt emails, configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and `SMTP_FROM` in `server/.env` using your email provider's SMTP settings. Without SMTP, sales and printing still work, but email delivery will report that it is not configured. Test with dummy transactions before use. A branded HTML receipt is emailed to customers who supply their email address.

## Next steps before launch

- Full staff account management, secure HttpOnly cookie sessions, device registration and permission audit
- Printer compatibility, cash reconciliation, refunds, rental payment and deposit settlement
- Product variants and tube-to-piece inventory conversions
- Automated build, integration and concurrency testing, database backup/restore
- HTTPS, production packaging, cloud replication, multi-device network resilience and regulatory review

The repository is public. Never commit passwords, `.env` files or real customer records.
