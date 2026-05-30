-- Performance indexes for common query patterns.

-- Products: public listing filters
CREATE INDEX IF NOT EXISTS idx_products_is_published ON products (is_published);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products (category_id);
CREATE INDEX IF NOT EXISTS idx_products_brand_id ON products (brand_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products (slug);
CREATE INDEX IF NOT EXISTS idx_products_featured_promo ON products (featured_promo) WHERE featured_promo = true;
CREATE INDEX IF NOT EXISTS idx_products_featured_bestseller ON products (featured_bestseller) WHERE featured_bestseller = true;

-- Orders: admin listing and user lookups
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders (customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders (status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders (created_at DESC);

-- Order items: join from orders
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items (order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items (product_id);

-- Cart items: per-user and per-session lookups
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items (user_id);

-- Addresses: user lookup
CREATE INDEX IF NOT EXISTS idx_addresses_user_id ON addresses (user_id);

-- Articles: public listing
CREATE INDEX IF NOT EXISTS idx_articles_is_published ON articles (is_published);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles (slug);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles (published_at DESC);

-- Wishlist items: per-user lookup
CREATE INDEX IF NOT EXISTS idx_wishlist_items_user_id ON wishlist_items (user_id);

-- Pharmacie de garde: latest entry lookup
CREATE INDEX IF NOT EXISTS idx_garde_week_start ON pharmacie_de_garde (week_start_date DESC);
