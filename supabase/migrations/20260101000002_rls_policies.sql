-- ─────────────────────────────────────────────
-- 002 Row Level Security policies
-- ─────────────────────────────────────────────

-- Enable RLS on all tables
alter table public.profiles          enable row level security;
alter table public.categories        enable row level security;
alter table public.brands            enable row level security;
alter table public.products          enable row level security;
alter table public.articles          enable row level security;
alter table public.addresses         enable row level security;
alter table public.orders            enable row level security;
alter table public.order_items       enable row level security;
alter table public.cart_items        enable row level security;
alter table public.wishlist_items    enable row level security;
alter table public.testimonials      enable row level security;
alter table public.pharmacie_de_garde enable row level security;
alter table public.loyalty_points    enable row level security;

-- Helper: is current user an admin?
create or replace function public.is_admin()
returns boolean language sql security definer stable as $$
  select coalesce(
    (select role = 'admin' from public.profiles where id = auth.uid()),
    false
  );
$$;

-- ── Profiles ──
create policy "Users can view their own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Admins can do everything on profiles"
  on public.profiles for all using (public.is_admin());

-- ── Categories — public read ──
create policy "Public can read categories"
  on public.categories for select using (true);

create policy "Admins can manage categories"
  on public.categories for all using (public.is_admin());

-- ── Brands — public read ──
create policy "Public can read brands"
  on public.brands for select using (true);

create policy "Admins can manage brands"
  on public.brands for all using (public.is_admin());

-- ── Products — public read published only ──
create policy "Public can read published products"
  on public.products for select using (is_published = true);

create policy "Admins can manage products"
  on public.products for all using (public.is_admin());

-- ── Articles — public read published only ──
create policy "Public can read published articles"
  on public.articles for select using (is_published = true);

create policy "Admins can manage articles"
  on public.articles for all using (public.is_admin());

-- ── Addresses ──
create policy "Users can manage their own addresses"
  on public.addresses for all using (auth.uid() = user_id);

create policy "Admins can read all addresses"
  on public.addresses for select using (public.is_admin());

-- ── Orders ──
create policy "Users can view their own orders"
  on public.orders for select using (auth.uid() = user_id);

create policy "Admins can manage all orders"
  on public.orders for all using (public.is_admin());

-- Allow guest order creation (user_id can be null for COD guests)
create policy "Anyone can create an order"
  on public.orders for insert with check (true);

-- ── Order Items ──
create policy "Users can view their own order items"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
        and orders.user_id = auth.uid()
    )
  );

create policy "Admins can manage all order items"
  on public.order_items for all using (public.is_admin());

create policy "Anyone can insert order items"
  on public.order_items for insert with check (true);

-- ── Cart Items ──
create policy "Users can manage their own cart"
  on public.cart_items for all using (auth.uid() = user_id);

-- ── Wishlist Items ──
create policy "Users can manage their own wishlist"
  on public.wishlist_items for all using (auth.uid() = user_id);

-- ── Testimonials — public read published ──
create policy "Public can read published testimonials"
  on public.testimonials for select using (is_published = true);

create policy "Admins can manage testimonials"
  on public.testimonials for all using (public.is_admin());

-- ── Pharmacie de Garde — public read ──
create policy "Public can read pharmacie de garde"
  on public.pharmacie_de_garde for select using (true);

create policy "Admins can manage pharmacie de garde"
  on public.pharmacie_de_garde for all using (public.is_admin());

-- ── Loyalty Points ──
create policy "Users can view their own points"
  on public.loyalty_points for select using (auth.uid() = user_id);

create policy "Admins can manage all loyalty points"
  on public.loyalty_points for all using (public.is_admin());
