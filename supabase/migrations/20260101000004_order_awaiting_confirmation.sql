-- Add awaiting_confirmation to order status constraint
ALTER TABLE public.orders
  DROP CONSTRAINT IF EXISTS orders_status_check;

ALTER TABLE public.orders
  ADD CONSTRAINT orders_status_check
  CHECK (status IN ('awaiting_confirmation','pending','confirmed','processing','shipped','delivered','cancelled','refunded'));

-- Update default to awaiting_confirmation
ALTER TABLE public.orders
  ALTER COLUMN status SET DEFAULT 'awaiting_confirmation';
