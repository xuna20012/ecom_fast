-- Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id VARCHAR(255) NOT NULL DEFAULT 'nettoyeur-oreille-camera-hd',
    name VARCHAR(255) NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON public.reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews(created_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous users to read reviews
CREATE POLICY "Allow anonymous users to read reviews" ON public.reviews
    FOR SELECT USING (true);

-- Create policy to allow anonymous users to insert reviews
CREATE POLICY "Allow anonymous users to insert reviews" ON public.reviews
    FOR INSERT WITH CHECK (true);

-- Create policy to allow authenticated users to update reviews
CREATE POLICY "Allow authenticated users to update reviews" ON public.reviews
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete reviews
CREATE POLICY "Allow authenticated users to delete reviews" ON public.reviews
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create trigger to automatically update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON public.reviews
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Insert existing reviews from the product data
INSERT INTO public.reviews (name, rating, comment, verified, created_at) VALUES
('Moussa Diop', 5, 'Produit de très haute qualité ! Le son est excellent et la batterie dure longtemps. Je recommande vivement !', true, '2025-03-15 10:00:00+00'),
('Fatou Sow', 5, 'La livraison était rapide et le produit est authentique. Très satisfaite de mon achat.', true, '2025-03-14 15:30:00+00'),
('Abdoulaye Ndiaye', 4, 'Bon rapport qualité-prix. Le design est vraiment élégant.', true, '2025-03-13 12:45:00+00'),
('Aminata Fall', 5, 'Service client excellent et produit conforme à la description.', true, '2025-03-12 09:15:00+00'),
('Ibrahima Sy', 5, 'Meilleur achat de l''année ! La qualité est exceptionnelle.', true, '2025-03-11 14:20:00+00'),
('Aïssatou Diallo', 4, 'Très satisfaite de la qualité sonore. Seul bémol : le temps de charge.', true, '2025-03-10 11:30:00+00'),
('Cheikh Gueye', 5, 'Parfait pour mes besoins quotidiens. La batterie tient vraiment bien !', true, '2025-03-09 16:45:00+00'),
('Mariama Bâ', 5, 'Excellent produit, je ne regrette pas mon achat. La livraison était rapide.', true, '2025-03-08 13:10:00+00'),
('Ousmane Kane', 4, 'Très bon produit, mais le prix est un peu élevé.', true, '2025-03-07 10:25:00+00'),
('Rama Seck', 5, 'La qualité est au rendez-vous. Je suis très contente de mon achat !', true, '2025-03-06 17:40:00+00'),
('Mamadou Diouf', 5, 'Super confortable et la qualité sonore est impressionnante.', true, '2025-03-05 08:55:00+00'),
('Sokhna Ndoye', 4, 'Bon produit dans l''ensemble. Le service après-vente est très réactif.', true, '2025-03-04 14:30:00+00'),
('Babacar Mbaye', 5, 'Excellente expérience d''achat. Le produit est conforme aux photos.', true, '2025-03-03 11:15:00+00'),
('Khady Thiam', 5, 'Je l''utilise tous les jours depuis un mois, aucun problème à signaler !', true, '2025-03-02 16:20:00+00'),
('Omar Fall', 4, 'Très satisfait de la qualité. Le design est moderne et élégant.', true, '2025-03-01 09:40:00+00'),
('Adja Dieng', 5, 'Produit authentique et de très bonne qualité. Je recommande !', true, '2025-02-28 12:05:00+00'),
('Modou Faye', 5, 'Excellent rapport qualité-prix. La livraison était rapide et bien suivie.', true, '2025-02-28 15:50:00+00'),
('Ndeye Gueye', 4, 'Très contente de mon achat. Le son est vraiment de qualité.', true, '2025-02-27 10:35:00+00'),
('Aliou Cissé', 5, 'Parfait ! Rien à dire, je suis plus que satisfait de mon achat.', true, '2025-02-26 13:25:00+00'); 