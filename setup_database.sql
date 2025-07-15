-- =============================================================================
-- CRÉATION DE LA TABLE ORDERS - SUPABASE
-- =============================================================================
-- Copiez et collez ce code dans l'éditeur SQL de Supabase
-- =============================================================================

-- 1. Créer la table orders
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  email text,
  notes text,
  quantity integer NOT NULL,
  total_price integer NOT NULL,
  product_name text NOT NULL,
  product_price integer NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  delivery_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Activer Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 3. Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 4. Créer le trigger pour updated_at
CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 5. Créer les index pour optimiser les performances
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders(phone);
CREATE INDEX IF NOT EXISTS idx_orders_updated_at ON orders(updated_at DESC);

-- 6. Politiques de sécurité RLS
-- Permettre aux utilisateurs anonymes d'insérer des commandes
CREATE POLICY "Anonymous users can insert orders"
  ON orders
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Permettre aux utilisateurs authentifiés de lire les commandes
CREATE POLICY "Authenticated users can view orders"
  ON orders
  FOR SELECT
  TO authenticated
  USING (true);

-- Permettre aux utilisateurs authentifiés de modifier les commandes
CREATE POLICY "Authenticated users can update orders"
  ON orders
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Permettre au service role de tout faire
CREATE POLICY "Service role can manage orders"
  ON orders
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 7. Insérer des données de test (optionnel)
INSERT INTO orders (
  full_name, 
  phone, 
  address, 
  email, 
  quantity, 
  total_price, 
  product_name, 
  product_price, 
  status,
  notes
) VALUES 
(
  'Test User', 
  '+221123456789', 
  'Dakar, Sénégal', 
  'test@example.com', 
  1, 
  11900, 
  'Nettoyeur d''oreille sans fil avec caméra HD', 
  11900, 
  'pending',
  'Commande de test'
);

-- =============================================================================
-- VÉRIFICATION
-- =============================================================================
-- Vérifier que la table a été créée correctement
SELECT 
  table_name, 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'orders' 
ORDER BY ordinal_position;

-- Vérifier les politiques RLS
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'orders';

-- Compter les enregistrements
SELECT COUNT(*) as total_orders FROM orders;

-- =============================================================================
-- INSTRUCTIONS
-- =============================================================================
-- 1. Allez dans votre projet Supabase
-- 2. Cliquez sur "SQL Editor" dans la sidebar
-- 3. Copiez et collez tout ce code
-- 4. Cliquez sur "Run" pour exécuter
-- 5. Vérifiez dans "Table Editor" que la table "orders" a été créée
-- ============================================================================= 