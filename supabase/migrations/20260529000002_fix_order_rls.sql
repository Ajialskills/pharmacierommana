-- Replace the open order INSERT policy with one that validates required fields.
-- Previously used WITH CHECK (true) which allowed arbitrary rows via PostgREST.

DROP POLICY IF EXISTS "Anyone can create an order" ON orders;

CREATE POLICY "Anyone can create an order" ON orders
  FOR INSERT
  WITH CHECK (
    customer_name IS NOT NULL
    AND char_length(trim(customer_name)) > 0
    AND customer_email IS NOT NULL
    AND customer_email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND customer_phone IS NOT NULL
    AND char_length(regexp_replace(customer_phone, '[\s+\-]', '', 'g')) >= 8
    AND shipping_address IS NOT NULL
    AND payment_method IN ('cod', 'cmi')
    AND total > 0
  );
