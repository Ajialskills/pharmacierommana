-- Grant REST API access to all public tables for anon + authenticated roles
grant usage on schema public to anon, authenticated;

grant select on public.products          to anon, authenticated;
grant select on public.categories        to anon, authenticated;
grant select on public.brands            to anon, authenticated;
grant select on public.articles          to anon, authenticated;
grant select on public.testimonials      to anon, authenticated;
grant select on public.pharmacie_de_garde to anon, authenticated;

grant select, insert, update, delete on public.profiles      to authenticated;
grant select, insert, update, delete on public.addresses     to authenticated;
grant select, insert, update, delete on public.orders        to authenticated;
grant select, insert, update, delete on public.order_items   to authenticated;
grant select, insert, update, delete on public.cart_items    to authenticated;
grant select, insert, update, delete on public.wishlist_items to authenticated;
grant select, insert, update, delete on public.loyalty_points to authenticated;

-- Allow anon to insert orders (guest checkout)
grant insert on public.orders      to anon;
grant insert on public.order_items to anon;

-- Service role gets full access
grant all on all tables in schema public to service_role;
grant all on all sequences in schema public to service_role;
