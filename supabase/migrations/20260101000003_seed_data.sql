-- ─────────────────────────────────────────────
-- 003 Seed data — categories, testimonials, sample products
-- ─────────────────────────────────────────────

-- ── Top-level categories ──
insert into public.categories (slug, name, sort_order) values
  ('bebe-et-maman', 'Maternité', 1),
  ('cheveux',       'Cheveux',        2),
  ('corps',         'Corps',          3),
  ('homme',         'Homme',          4),
  ('hygiene',       'Hygiène',        5),
  ('sante',         'Santé',          6),
  ('solaire',       'Solaire',        7),
  ('visage',        'Visage',         8);

-- ── Sub-categories: Bébé et maman ──
with parent as (select id from public.categories where slug = 'bebe-et-maman')
insert into public.categories (slug, name, parent_id, sort_order) values
  ('bebe-accessoires', 'Accessoires', (select id from parent), 1),
  ('bebe-change',      'Change',      (select id from parent), 2),
  ('bebe-hygiene',     'Hygiène bébé',(select id from parent), 3),
  ('bebe-maman',       'Maman',       (select id from parent), 4),
  ('bebe-sante',       'Santé bébé',  (select id from parent), 5);

-- ── Sub-categories: Cheveux ──
with parent as (select id from public.categories where slug = 'cheveux')
insert into public.categories (slug, name, parent_id, sort_order) values
  ('cheveux-bio',        'Bio',            (select id from parent), 1),
  ('cheveux-shampoing',  'Shampoing',      (select id from parent), 2),
  ('cheveux-anti-poux',  'Soin anti-poux', (select id from parent), 3);

-- ── Sub-categories: Corps ──
with parent as (select id from public.categories where slug = 'corps')
insert into public.categories (slug, name, parent_id, sort_order) values
  ('corps-hygiene',   'Hygiène de corps',  (select id from parent), 1),
  ('corps-mains-pied','Mains et pieds',    (select id from parent), 2),
  ('corps-soins',     'Soins de corps',    (select id from parent), 3),
  ('corps-solaire',   'Solaire corps',     (select id from parent), 4);

-- ── Sub-categories: Homme ──
with parent as (select id from public.categories where slug = 'homme')
insert into public.categories (slug, name, parent_id, sort_order) values
  ('homme-lubrifiants',   'Lubrifiants',   (select id from parent), 1),
  ('homme-preservatifs',  'Préservatifs',  (select id from parent), 2);

-- ── Sub-categories: Hygiène ──
with parent as (select id from public.categories where slug = 'hygiene')
insert into public.categories (slug, name, parent_id, sort_order) values
  ('hygiene-corps-visage', 'Corps et visage',  (select id from parent), 1),
  ('hygiene-dentaire',     'Dentaire',          (select id from parent), 2),
  ('hygiene-intime',       'Hygiène intime',    (select id from parent), 3);

-- ── Sub-categories: Santé ──
with parent as (select id from public.categories where slug = 'sante')
insert into public.categories (slug, name, parent_id, sort_order) values
  ('sante-bien-etre',     'Bien-être',         (select id from parent), 1),
  ('sante-soins-confort', 'Soins et confort',  (select id from parent), 2),
  ('sante-tests',         'Tests et mesures',  (select id from parent), 3),
  ('sante-yeux-nez-oreille', 'Yeux-nez-oreille', (select id from parent), 4);

-- ── Sub-categories: Solaire ──
with parent as (select id from public.categories where slug = 'solaire')
insert into public.categories (slug, name, parent_id, sort_order) values
  ('solaire-caracteristique', 'Caractéristique', (select id from parent), 1),
  ('solaire-indication',      'Indication',       (select id from parent), 2),
  ('solaire-texture',         'Texture',          (select id from parent), 3),
  ('solaire-type-peau',       'Types de peau',    (select id from parent), 4);

-- ── Sub-categories: Visage ──
with parent as (select id from public.categories where slug = 'visage')
insert into public.categories (slug, name, parent_id, sort_order) values
  ('visage-bio',        'Bio',          (select id from parent), 1),
  ('visage-soin',       'Soin visage',  (select id from parent), 2),
  ('visage-solaire',    'Solaire visage',(select id from parent), 3),
  ('visage-type-peau',  'Types de peau',(select id from parent), 4);

-- ── Testimonials ──
insert into public.testimonials (author_name, author_initials, body, rating, time_ago, lang, sort_order) values
  (
    'Assim El Mojahid', 'AE',
    'Since i was a kid i used to buy medicine from there ana here am i buying while growing.',
    5, 'Il y a 3 ans', 'en', 1
  ),
  (
    'Taoufik EL MOUBARIK', 'TE',
    'نعم، التعامل ممتاز جدا وخدمة رائعة وسريعة. فريق العمل محترف ومتعاون ويوفر تجربة شراء مريحة وآمنة، أنصح بالتعامل معهم بكل ثقة.',
    5, 'Il y a 6 mois', 'ar', 2
  ),
  (
    'Hamid boorho', 'HB',
    'جميلة جدا ومنظمة بشكل رائع، توفر منتجات متنوعة وجودة عالية مع خدمة ممتازة وتعامل راق يبعث على الثقة.',
    5, 'Il y a 8 ans', 'ar', 3
  );

-- ── Sample brands ──
insert into public.brands (slug, name, is_featured) values
  ('manix',     'MANIX',     true),
  ('pediakid',  'PEDIAKID',  true),
  ('on-call',   'On Call',   true),
  ('physiodose','PHYSIODOSE',true),
  ('dercos',    'DERCOS',    true);

-- ── Sample products ──
with
  cat_homme_lubr as (select id from public.categories where slug = 'homme-lubrifiants'),
  cat_sante_vitm as (select id from public.categories where slug = 'sante-bien-etre'),
  cat_sante_diab as (select id from public.categories where slug = 'sante-tests'),
  cat_sante_nez  as (select id from public.categories where slug = 'sante-yeux-nez-oreille'),
  cat_chev_shamp as (select id from public.categories where slug = 'cheveux-shampoing'),
  brand_manix    as (select id from public.brands where slug = 'manix'),
  brand_pedia    as (select id from public.brands where slug = 'pediakid'),
  brand_oncall   as (select id from public.brands where slug = 'on-call'),
  brand_physio   as (select id from public.brands where slug = 'physiodose'),
  brand_dercos   as (select id from public.brands where slug = 'dercos')
insert into public.products (slug, name, brand_id, category_id, price, sale_price, stock, images, featured_promo, featured_bestseller) values
  (
    'manix-skyn-aqua-feel-80ml',
    'MANIX SKYN AQUA FEEL 80 ML',
    (select id from brand_manix),
    (select id from cat_homme_lubr),
    135.00, 110.00, 50, '{}', true, false
  ),
  (
    'pediakid-gommes-multivitaminees-60',
    'PEDIAKID GOMMES MULTIVITAMINÉES 60 oursons',
    (select id from brand_pedia),
    (select id from cat_sante_vitm),
    180.00, 169.00, 30, '{}', true, true
  ),
  (
    'on-call-plus-lecteur-glycemie',
    'On Call Plus lecteur de glycémie',
    (select id from brand_oncall),
    (select id from cat_sante_diab),
    240.00, 199.00, 20, '{}', true, true
  ),
  (
    'physiodose-serum-physiologique-30x5ml',
    'PHYSIODOSE SÉRUM PHYSIOLOGIQUE 30×5 ML',
    (select id from brand_physio),
    (select id from cat_sante_nez),
    240.00, 187.00, 100, '{}', true, true
  ),
  (
    'dercos-energisant-shampoing-anti-chute',
    'DERCOS ENERGISANT+ shampooing complément anti-chute',
    (select id from brand_dercos),
    (select id from cat_chev_shamp),
    180.00, 155.00, 45, '{}', true, true
  );
