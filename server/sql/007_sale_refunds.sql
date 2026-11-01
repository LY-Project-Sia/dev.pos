BEGIN;
CREATE TABLE IF NOT EXISTS sale_refunds (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 sale_id uuid NOT NULL UNIQUE REFERENCES sales(id),
 employee_id uuid NOT NULL REFERENCES employees(id),
 amount_cents bigint NOT NULL CHECK(amount_cents>=0),
 reason text NOT NULL CHECK(length(trim(reason))>=5),
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS sale_refunds_created_at ON sale_refunds(created_at DESC);
COMMIT;
