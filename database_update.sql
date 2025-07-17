-- =============================================================================
-- MISE À JOUR DE LA BASE DE DONNÉES - SUPABASE
-- =============================================================================
-- Script de mise à jour pour optimiser la gestion des commandes et emails
-- =============================================================================

-- 1. Vérifier et créer la table orders si elle n'existe pas
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

-- 4. Créer le trigger pour updated_at (avec gestion d'erreur)
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 5. Créer les index pour optimiser les performances
CREATE INDEX IF NOT EXISTS idx_orders_id ON orders(id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders(phone);
CREATE INDEX IF NOT EXISTS idx_orders_updated_at ON orders(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_full_name ON orders(full_name);

-- 6. Supprimer les anciennes politiques pour éviter les conflits
DROP POLICY IF EXISTS "Anonymous users can insert orders" ON orders;
DROP POLICY IF EXISTS "Authenticated users can view orders" ON orders;
DROP POLICY IF EXISTS "Authenticated users can update orders" ON orders;
DROP POLICY IF EXISTS "Service role can manage orders" ON orders;
DROP POLICY IF EXISTS "Users can view orders" ON orders;

-- 7. Créer les nouvelles politiques de sécurité optimisées
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

-- 8. Fonction utilitaire pour générer un ID de commande lisible
CREATE OR REPLACE FUNCTION generate_order_display_id(order_uuid uuid)
RETURNS text AS $$
BEGIN
    -- Générer un ID court basé sur l'UUID
    RETURN 'CMD' || UPPER(substring(order_uuid::text, 1, 8));
END;
$$ LANGUAGE plpgsql;

-- 9. Vue pour afficher les commandes avec ID lisible
CREATE OR REPLACE VIEW orders_with_display_id AS
SELECT 
    id,
    generate_order_display_id(id) as display_id,
    full_name,
    phone,
    address,
    email,
    notes,
    quantity,
    total_price,
    product_name,
    product_price,
    status,
    delivery_date,
    created_at,
    updated_at
FROM orders;

-- 10. Fonction pour obtenir les statistiques des commandes
CREATE OR REPLACE FUNCTION get_order_stats()
RETURNS TABLE (
    total_orders bigint,
    pending_orders bigint,
    confirmed_orders bigint,
    delivered_orders bigint,
    total_revenue bigint,
    avg_order_value numeric
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) as total_orders,
        COUNT(*) FILTER (WHERE status = 'pending') as pending_orders,
        COUNT(*) FILTER (WHERE status = 'confirmed') as confirmed_orders,
        COUNT(*) FILTER (WHERE status = 'delivered') as delivered_orders,
        COALESCE(SUM(total_price), 0) as total_revenue,
        COALESCE(AVG(total_price), 0) as avg_order_value
    FROM orders;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- VÉRIFICATIONS ET TESTS
-- =============================================================================

-- Vérifier la structure de la table
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
    cmd
FROM pg_policies 
WHERE tablename = 'orders';

-- Vérifier les index
SELECT 
    indexname,
    indexdef
FROM pg_indexes 
WHERE tablename = 'orders';

-- Tester la fonction d'ID d'affichage
SELECT 
    id,
    generate_order_display_id(id) as display_id,
    full_name,
    created_at
FROM orders
ORDER BY created_at DESC
LIMIT 5;

-- Obtenir les statistiques
SELECT * FROM get_order_stats();

-- =============================================================================
-- SUCCÈS
-- =============================================================================
-- Base de données mise à jour avec succès !
-- - Table orders optimisée
-- - Index de performance ajoutés
-- - Politiques de sécurité configurées
-- - Fonctions utilitaires créées
-- - ID de commande compatible avec les emails
-- ============================================================================= 