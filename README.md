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

For **Brevo transactional email**, create an account at https://www.brevo.com/, verify a sender in Settings → Senders, Domains, IPs → Senders, and obtain the SMTP login and SMTP key from Settings → SMTP & API → SMTP. Set the following values only in your private `server/.env`: `SMTP_HOST=smtp-relay.brevo.com`, `SMTP_PORT=587`, `SMTP_USER=<Brevo SMTP login>`, `SMTP_PASS=<Brevo SMTP key>`, `SMTP_FROM=<verified sender email>`. The SMTP key is not your Brevo account password or API key. Restart the API and use Settings → Test email connection. SMTP connection verification alone does not prove inbox delivery; complete a test sale to a mailbox you control. Never commit credentials to GitHub.\n\n\n\nTo enable optional customer receipt emails, configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and `SMTP_FROM` in `server/.env` using your email provider's SMTP settings. Without SMTP, sales and printing still work, but email delivery will report that it is not configured. Test with dummy transactions before use. A branded HTML receipt is emailed to customers who supply their email address.

## Next steps before launch

- Full staff account management, secure HttpOnly cookie sessions, device registration and permission audit
- Printer compatibility, cash reconciliation, refunds, rental payment and deposit settlement
- Product variants and tube-to-piece inventory conversions
- Automated build, integration and concurrency testing, database backup/restore
- HTTPS, production packaging, cloud replication, multi-device network resilience and regulatory review

The repository is public. Never commit passwords, `.env` files or real customer records.

## Personal Outlook / Hotmail OAuth2 receipts

1. Register an application at https://entra.microsoft.com/ with **personal Microsoft accounts** supported. Enable **public client flows** (device-code sign-in). Microsoft may restrict app registration for some personal accounts; an eligible Azure/Entra account may be required.
2. Copy its **Application (client) ID** into your private `server/.env` as `OUTLOOK_CLIENT_ID`. Set `MAIL_PROVIDER=outlook`, `SMTP_USER=youraddress@outlook.com`, `SMTP_FROM=youraddress@outlook.com`. No Outlook password is needed. `SMTP_PASS` is unused for Outlook.
3. From the `server` folder run `npm.cmd run connect:outlook`. Follow the displayed Microsoft device sign-in instructions yourself. The program stores tokens only in `server/.outlook-oauth.json`, which is gitignored. Never share or commit this file, the device code, or tokens.
4. Restart the API, sign in to CourtFlow, use **Settings → Test email connection**, and send a test receipt to an inbox you control.

The app requests delegated `https://outlook.office.com/SMTP.Send` and `offline_access` scopes. Refresh tokens can be revoked; reconnect if authorization expires. Outlook consumer sending limits apply. For higher-volume production receipts, a transactional email service is preferable.
