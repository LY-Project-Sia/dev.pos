-- Owner-managed per-staff access overrides; null means use role defaults.
ALTER TABLE employees ADD COLUMN IF NOT EXISTS permissions jsonb;
