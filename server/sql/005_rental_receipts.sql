-- Rental receipt delivery and customer contact. Existing rentals remain valid.
ALTER TABLE rentals ADD COLUMN IF NOT EXISTS customer_email text;
CREATE TABLE IF NOT EXISTS rental_receipt_email_log (
 id bigserial PRIMARY KEY,
 rental_id uuid NOT NULL REFERENCES rentals(id),
 recipient text NOT NULL,
 event text NOT NULL CHECK (event IN ('start','return')),
 status text NOT NULL CHECK (status IN ('accepted','failed')),
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS rental_receipt_email_log_rental_idx ON rental_receipt_email_log(rental_id);
