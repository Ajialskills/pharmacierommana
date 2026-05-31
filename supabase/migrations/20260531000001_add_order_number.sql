-- Add order_number column to orders (was referenced in code but missing from schema)
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS order_number text;

-- Backfill existing rows with a generated order number
UPDATE public.orders
SET order_number = 'PR-' || upper(substring(id::text, 1, 8))
WHERE order_number IS NULL;

-- Now enforce uniqueness and not null
ALTER TABLE public.orders ALTER COLUMN order_number SET NOT NULL;
ALTER TABLE public.orders ADD CONSTRAINT orders_order_number_unique UNIQUE (order_number);
