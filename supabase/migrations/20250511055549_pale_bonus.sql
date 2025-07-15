/*
  # Create orders table

  1. New Tables
    - `orders`
      - `id` (uuid, primary key)
      - `full_name` (text)
      - `phone` (text)
      - `address` (text)
      - `quantity` (integer)
      - `total_price` (integer)
      - `status` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `orders` table
    - Add policy for service role to manage orders
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  quantity integer NOT NULL,
  total_price integer NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can manage orders"
  ON orders
  TO service_role
  USING (true)
  WITH CHECK (true);