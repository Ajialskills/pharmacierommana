-- Migration: mark featured brands and set local logo paths
-- Logos saved to public/brands/ by scripts/fetch-brand-logos.mjs
-- Run in Supabase SQL Editor for both projects

-- Brands with downloaded logos
UPDATE brands SET logo_url = '/brands/vichy.png',    is_featured = true WHERE slug = 'vichy';
UPDATE brands SET logo_url = '/brands/bioderma.png', is_featured = true WHERE slug = 'bioderma';
UPDATE brands SET logo_url = '/brands/cerave.svg',   is_featured = true WHERE slug = 'cerave';
UPDATE brands SET logo_url = '/brands/cetaphil.png', is_featured = true WHERE slug = 'cetaphil';
UPDATE brands SET logo_url = '/brands/klorane.png',  is_featured = true WHERE slug = 'klorane';
UPDATE brands SET logo_url = '/brands/ducray.png',   is_featured = true WHERE slug = 'ducray';
UPDATE brands SET logo_url = '/brands/eucerin.svg',  is_featured = true WHERE slug = 'eucerin';
UPDATE brands SET logo_url = '/brands/noreva.png',   is_featured = true WHERE slug = 'noreva';
UPDATE brands SET logo_url = '/brands/a-derma.png',  is_featured = true WHERE slug = 'a-derma';
UPDATE brands SET logo_url = '/brands/uriage.svg',   is_featured = true WHERE slug = 'uriage';
UPDATE brands SET logo_url = '/brands/pediakid.jpg', is_featured = true WHERE slug = 'pediakid';
UPDATE brands SET logo_url = '/brands/urgo.png',     is_featured = true WHERE slug = 'urgo';

-- Important brands featured with text fallback (upload logo via admin when ready)
UPDATE brands SET is_featured = true WHERE slug = 'la-roche-posay';
UPDATE brands SET is_featured = true WHERE slug = 'avene';
UPDATE brands SET is_featured = true WHERE slug = 'svr';
UPDATE brands SET is_featured = true WHERE slug = 'isdin';
UPDATE brands SET is_featured = true WHERE slug = 'physiodose';
