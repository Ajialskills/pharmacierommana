-- ─────────────────────────────────────────────
-- 001 Initial schema — Pharmacie Rommana
-- ─────────────────────────────────────────────

-- Extensions
create extension if not exists "uuid-ossp";

-- ── Profiles (extends Supabase Auth users) ──
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  phone       text,
  avatar_url  text,
  role        text not null default 'customer' check (role in ('customer', 'admin')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ── Categories ──
create table public.categories (
  id          uuid primary key default uuid_generate_v4(),
  slug        text not null unique,
  name        text not null,
  parent_id   uuid references public.categories(id) on delete set null,
  description text,
  image_url   text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

-- ── Brands ──
create table public.brands (
  id          uuid primary key default uuid_generate_v4(),
  slug        text not null unique,
  name        text not null,
  logo_url    text,
  description text,
  is_featured boolean not null default false,
  created_at  timestamptz not null default now()
);

-- ── Products ──
create table public.products (
  id                  uuid primary key default uuid_generate_v4(),
  slug                text not null unique,
  name                text not null,
  brand_id            uuid references public.brands(id) on delete set null,
  category_id         uuid references public.categories(id) on delete set null,
  description         text,
  price               numeric(10,2) not null,
  sale_price          numeric(10,2),
  stock               int not null default 0,
  images              text[] not null default '{}',
  featured_promo      boolean not null default false,
  featured_bestseller boolean not null default false,
  is_published        boolean not null default true,
  meta_title          text,
  meta_description    text,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

-- ── Articles (Le Carnet) ──
create table public.articles (
  id              uuid primary key default uuid_generate_v4(),
  slug            text not null unique,
  title           text not null,
  excerpt         text,
  cover_image     text,
  body            text,
  category        text,
  is_published    boolean not null default false,
  published_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- ── Addresses ──
create table public.addresses (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  label       text,
  line1       text not null,
  line2       text,
  city        text not null,
  region      text not null,
  postal_code text,
  country     text not null default 'MA',
  is_default  boolean not null default false,
  created_at  timestamptz not null default now()
);

-- ── Orders ──
create table public.orders (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid references auth.users(id) on delete set null,
  status           text not null default 'pending'
                   check (status in ('pending','confirmed','processing','shipped','delivered','cancelled','refunded')),
  payment_method   text not null check (payment_method in ('cod','cmi')),
  payment_status   text not null default 'pending'
                   check (payment_status in ('pending','paid','failed','refunded')),
  subtotal         numeric(10,2) not null,
  shipping_cost    numeric(10,2) not null default 0,
  total            numeric(10,2) not null,
  shipping_address jsonb not null,
  customer_name    text not null,
  customer_email   text not null,
  customer_phone   text not null,
  notes            text,
  cmi_order_id     text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- ── Order Items ──
create table public.order_items (
  id             uuid primary key default uuid_generate_v4(),
  order_id       uuid not null references public.orders(id) on delete cascade,
  product_id     uuid references public.products(id) on delete set null,
  product_name   text not null,
  product_image  text,
  quantity       int not null,
  unit_price     numeric(10,2) not null,
  total_price    numeric(10,2) not null
);

-- ── Cart Items ──
create table public.cart_items (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  product_id  uuid not null references public.products(id) on delete cascade,
  quantity    int not null default 1,
  created_at  timestamptz not null default now(),
  unique (user_id, product_id)
);

-- ── Wishlist Items ──
create table public.wishlist_items (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  product_id  uuid not null references public.products(id) on delete cascade,
  created_at  timestamptz not null default now(),
  unique (user_id, product_id)
);

-- ── Testimonials ──
create table public.testimonials (
  id               uuid primary key default uuid_generate_v4(),
  author_name      text not null,
  author_initials  text not null,
  body             text not null,
  rating           int not null default 5 check (rating between 1 and 5),
  time_ago         text not null,
  lang             text not null default 'fr' check (lang in ('fr','ar','en')),
  is_published     boolean not null default true,
  sort_order       int not null default 0,
  created_at       timestamptz not null default now()
);

-- ── Pharmacie de Garde ──
create table public.pharmacie_de_garde (
  id               uuid primary key default uuid_generate_v4(),
  week_start_date  date not null,
  pdf_url          text not null,
  uploaded_at      timestamptz not null default now()
);

-- ── Loyalty Points ──
create table public.loyalty_points (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null references auth.users(id) on delete cascade unique,
  points      int not null default 0,
  updated_at  timestamptz not null default now()
);

-- ── Updated_at triggers ──
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger products_updated_at before update on public.products
  for each row execute function public.handle_updated_at();

create trigger articles_updated_at before update on public.articles
  for each row execute function public.handle_updated_at();

create trigger orders_updated_at before update on public.orders
  for each row execute function public.handle_updated_at();

create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.handle_updated_at();

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
