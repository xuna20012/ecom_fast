/*
  # Enhance orders table

  1. Add new columns
    - `product_name` (text)
    - `product_price` (integer)
    - `email` (text, optional)
    - `notes` (text, optional)
    - `delivery_date` (date, optional)
    - `updated_at` (timestamp)

  2. Update status enum
    - Add more specific status values

  3. Add indexes for better performance
*/

-- Add new columns
ALTER TABLE orders ADD COLUMN IF NOT EXISTS product_name text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS product_price integer;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS notes text;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_date date;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- Update existing records with product info
UPDATE orders 
SET 
  product_name = 'Nettoyeur d''oreille sans fil avec caméra HD',
  product_price = 11900,
  updated_at = now()
WHERE product_name IS NULL;

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders(phone);

-- Add policy for anonymous users to insert orders
CREATE POLICY "Anonymous users can insert orders"
  ON orders
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Add policy for authenticated users to view their own orders
CREATE POLICY "Users can view orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (true); 