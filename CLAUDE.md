# Pharmacie Rommana — Build From Zero

I'm building a new e-commerce platform for **Pharmacie Rommana**, a parapharmacy in Tétouan, Morocco. We're starting from an empty folder and building the entire stack from scratch. The technical architecture mirrors a previous project I built (La Beauté Libre at paralbl.vercel.app) — same stack, same feature set, same structural patterns. **But the brand, design, and content must be meaningfully different.** Pharmacie Rommana is its own identity, not a clone with new colors.

---

## 1. Business Identity

- **Name:** Pharmacie Rommana
- **Type:** Parapharmacie (online + physical location in Tétouan, Morocco)
- **Industry scope:** broader than typical parapharmacy — covers health, hygiene, wellness, beauty, baby & maternal care, OTC products
- **Primary language:** French (Arabic used for some reviews and address)
- **Currency:** MAD (د.م. / DH)
- **Meta description / tagline:** "Pharmacie Rommana, basée à Tétouan, est une parapharmacie en ligne spécialisée dans les produits de soin, d'hygiène et de bien-être. Nous proposons des produits de qualité avec une livraison rapide."
- **Site title pattern:** "Pharmacie Rommana — Parapharmacie en ligne à Tétouan"

## 2. Contact Information

- **Phone (landline):** 05 39 71 42 72
- **WhatsApp:** +212 641 33 74 43 (link: https://wa.me/212641337443)
- **Address (FR):** 344 Av Al Hijra, Tétouan, Morocco
- **Address (AR):** شارع الريف الرمانة, 344 Av Al Hijra, Tétouan
- **Coordinates:** 35.567009, -5.393409
- **Google Maps embed URL:** https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d537.7808256049897!2d-5.393409205622905!3d35.56700913748666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b42786c826805%3A0xe57ee821295b7abd!2z2LXZitiv2YTZitipINin2YTYsdmF2KfZhtip!5e0!3m2!1sen!2sma!4v1778582711786!5m2!1sen!2sma

Don't fabricate social media links. I'll provide real handles before launch.

## 3. Delivery & Payment

- **Free delivery thresholds:**
  - 400 MAD on Tétouan
  - 800 MAD on rest of Morocco
- **Primary payment:** Cash on Delivery (Paiement à la Livraison)
- **Card payment:** CMI (Centre Monétique Interbancaire — Moroccan card gateway). Integration must be built; activated later with real merchant credentials.
- **Marketing copy:**
  - "Livraison Gratuite — Dès 400 DH sur Tétouan et dès 800 DH sur tout le Maroc."
  - "Paiement à la Livraison — Commandez en toute confiance et payez cash directement lors de la réception de votre colis."

## 4. Services Beyond Catalog

Two pharmacy-specific features that don't exist in the reference project:
- **Pharmacie de garde** — weekly PDF of on-duty pharmacies in Tétouan. Admin must upload/replace each week. Display prominently on homepage.
- **Consultation WhatsApp** — homepage CTA that opens WhatsApp chat with the pharmacist for product advice.

## 5. Real Customer Reviews (seed as initial testimonials)

1. **Assim El Mojahid** (5 stars, 3 years ago)
   > "Since i was a kid i used to buy medicine from there ana here am i buying while growing."

2. **Taoufik EL MOUBARIK** (5 stars, 6 months ago, Arabic)
   > "نعم، التعامل ممتاز جدا وخدمة رائعة وسريعة. فريق العمل محترف ومتعاون ويوفر تجربة شراء مريحة وآمنة، أنصح بالتعامل معهم بكل ثقة."

3. **Hamid boorho** (5 stars, 8 years ago, Arabic)
   > "جميلة جدا ومنظمة بشكل رائع، توفر منتجات متنوعة وجودة عالية مع خدمة ممتازة وتعامل راق يبعث على الثقة."

## 6. Product Catalog Taxonomy

Seed this hierarchy in Supabase. Use French display names, generate URL-safe slugs.

**Top-level categories:**
- Bébé et maman
- Cheveux
- Corps
- Homme
- Hygiène
- Santé
- Solaire
- Visage

**Full taxonomy:**

- **Bébé et maman**
  - Accessoires: anneaux, biberon, mouche bébé, sucettes, tétine, vaisselle
  - Change: couches, crème de change, lingettes, poudre
  - Hygiène: bain, cheveux, corps, dentaire, eau de toilette, entretien
  - Maman: grossesse, hygiène, tire-lait, vitamines
  - Santé: hydratation, massage, nez et gorge, poux et insectes, solaires, thermomètre, vitamines

- **Cheveux**
  - Bio: huiles
  - Shampoing: anti-chute, anti-pelliculaire
  - Soin anti-poux: brosse, lotion, pack anti-poux, shampoing

- **Corps**
  - Hygiène de corps: déodorant, gel douche, huile lavante, savons
  - Mains et pieds: crèmes pieds, hydratant mains, rafraîchissant et déodorant
  - Soins de corps: cicatrisant, éclaircissant, huile, hydratant
  - Solaire

- **Homme**
  - Lubrifiants
  - Préservatifs

- **Hygiène**
  - Corps et visage: anti-bactérien, déodorant, gel douche, huile lavante, savons
  - Dentaire: aphtes et douleurs dentaires, bain de bouche, brosse à dents, brosse à dents enfant, brossettes et fils dentaires, dentifrice, dentifrice enfant, soins dentaires
  - Hygiène intime: gels, serviettes hygiéniques

- **Santé**
  - Bien-être: appétit, peau-cheveux-ongles, stress et sommeil, tonus et vitalité, vitamines
  - Soins et confort: bandes adhésives, compresse et coton, désinfectants et antiseptiques, gants stériles, pansement adulte, pansement enfant
  - Tests et mesures: diabétologie, tensiomètre, test de grossesse, thermomètre
  - Yeux-nez-oreille: bouchons d'oreilles, hygiène des yeux, soins de nez

- **Solaire**
  - Caractéristique: acné, anti-âge, anti-taches, après-soleil, bronzage, hydratation
  - Indication: bébé et enfant, capillaire, corps, corps et visage, visage
  - Texture: brume, crème, fluide, gel-crème, huile, lait, lotion
  - Types de peau: atopique, mixte à grasse, normale, rougeurs, sèche, sensible, tous types de peau

- **Visage**
  - Bio: huile naturelle
  - Soin visage: acné et imperfections, anti-âge, anti-rougeurs, anti-taches, hydratation, nettoyant, réparateur et anti-bactérien, yeux et lèvres
  - Solaire
  - Types de peau: peau à tendance acnéique, peau atopique, peau mixte à grasse, peau normale, peau sèche, peau sensible

Sample products for naming/pricing reference (full catalog comes later from client):
- MANIX SKYN AQUA FEEL 80 ML — 135 → 110 MAD (-19%)
- PEDIAKID GOMMES MULTIVITAMINÉES 60 oursons — 180 → 169 MAD (-6%)
- On Call Plus lecteur de glycémie — 240 → 199 MAD (-17%)
- PHYSIODOSE SÉRUM PHYSIOLOGIQUE 30×5 ML — 240 → 187 MAD (-22%)
- DERCOS ENERGISANT+ shampooing complément anti-chute — 180 → 155 MAD (-14%)

Naming convention: brand name uppercase, product description sentence case.

## 7. Brand Direction (must differ from reference)

**Reference project (La Beauté Libre / paralbl.vercel.app)** uses:
- Editorial, premium, minimal aesthetic with serif headers and italic accents
- Color palette: muted creams, blush/rose tones, soft browns — feminine, beauty-focused
- Typography: serif display + clean sans, with italic emphasis on key words
- Tone: poetic, slow, "rituel de beauté"
- Hero: full-bleed video with overlay quote

**Pharmacie Rommana must look meaningfully different:**
- More trustworthy, slightly more clinical without feeling sterile — this is a *pharmacy*, broader than beauty
- Appeals to families, mothers, general health customers — not just skincare enthusiasts
- Calm, warm, authoritative
- Suggest 2-3 color palette options (likely: clean whites, a soft trustworthy green or muted teal, a warm neutral, one accent). **Wait for me to choose before applying.**
- Suggest 2-3 typography pairings. **Wait for me to choose.**
- Hero should communicate "trusted neighborhood pharmacy that delivers" — not a beauty editorial
- Avoid mimicking paralbl's italic-accent headers, blush palette, or "rituel" tone

**Hard rule:** I'll provide the Pharmacie Rommana logo file. **Never recreate logos in SVG or any other format. Use the file I give you as-is.**

## 8. Technical Stack

Build with exactly this stack:
- **Next.js (App Router) + TypeScript**
- **Tailwind CSS**
- **Supabase** (Postgres + Auth + Storage + Row Level Security)
- **Cloudinary** for images and video hosting
- **CMI** for card payments
- **Resend** for transactional emails
- **UploadThing** for admin file uploads (optional — can also use Cloudinary direct)
- **Vercel** for deployment

Use `npm` (matches my workflow). Use Server Components and Server Actions where possible. Use Supabase server client + browser client pattern (separate files).

## 9. Routing Structure (mirror reference project)

Routes to build, organized by group:

**(store) — public-facing:**
- `/` — homepage
- `/boutique` — full product catalog with filters
- `/boutique/[categorie]` — category page
- `/categories` — categories overview
- `/marques` — brands index
- `/marques/[slug]` — brand page
- `/produit/[slug]` — product detail
- `/diagnostic` — interactive quiz (pharmacy version: "Trouvez votre produit" — needs adapting from skin-only to broader health)
- `/notre-histoire` — about page
- `/le-carnet` — blog index
- `/le-carnet/[slug]` — blog article
- `/contact` — contact page
- `/panier` — cart
- `/commande` — checkout
- `/commande/succes` — payment success
- `/commande/echec` — payment failed
- `/favoris` — wishlist
- `/mon-compte` — account dashboard with tabs (overview, orders, profile, address, security)
- `/connexion` — login
- `/inscription` — register
- `/cgv`, `/mentions-legales`, `/livraison`, `/retours` — legal/info pages

**admin (protected):**
- `/admin` — dashboard
- `/admin/produits` — products CRUD
- `/admin/produits/nouveau`, `/admin/produits/[id]` — create/edit
- `/admin/categories` — categories manager
- `/admin/marques` — brands manager
- `/admin/commandes` — orders list
- `/admin/commandes/[id]` — order detail with status updates
- `/admin/carnet` — blog articles CRUD
- `/admin/carnet/nouveau`, `/admin/carnet/[id]` — create/edit
- `/admin/login` — admin login

**API routes:**
- `/api/admin/auth` — admin auth
- `/api/admin/products`, `/api/admin/products/[id]`
- `/api/admin/categories`, `/api/admin/categories/[id]`
- `/api/admin/brands`, `/api/admin/brands/[id]`
- `/api/admin/carnet`, `/api/admin/carnet/[id]`
- `/api/admin/orders/status`
- `/api/admin/upload`, `/api/admin/upload/primary`
- `/api/cmi/callback` — CMI payment callback

## 10. Component Architecture (reference patterns from paralbl)

Build these components — visual design differs, structure stays similar:

**Store layout:**
- `Header.tsx` — logo, search, auth, cart, wishlist counters
- `MobileNav.tsx`
- `Footer.tsx` — multi-column with boutique/maison/aide links, newsletter signup
- `Providers.tsx` — wraps cart + wishlist + auth modal contexts
- `AuthButtons.tsx`, `AuthModal.tsx`, `AuthModalContext.tsx`
- `CartButton.tsx`, `CartContext.tsx`, `CartDrawer.tsx`
- `WishlistContext.tsx`
- `ProductCard.tsx`
- `SectionHeader.tsx`

**Homepage sections (the reference uses these; pharmacy version may reorder or replace):**
- `HeroSection.tsx` + `HeroParallax.tsx` + `VideoBackground.tsx` (consider a more grounded hero for pharmacy)
- `FeaturesStrip.tsx` — trust signals (livraison gratuite, conseil, etc.)
- `BoutiqueStrip.tsx` — promo/CTA strip
- `CategoriesSection.tsx`
- `BestSellersSection.tsx`
- `BrandsWall.tsx`
- `RitualSection.tsx` (reference name — adapt: maybe "Notre approche" or "Pourquoi nous")
- `FounderStrip.tsx` — adapt for pharmacist's note
- `PackGallery.tsx` — product packs/bundles
- `SkinDiagnosticSection.tsx` — adapt to broader health diagnostic
- `DiagnosticTeaser.tsx`
- `CarnetSection.tsx` — featured blog articles
- `ArticlesGrid.tsx`
- `PetalBackground.tsx` (decorative — likely skip for pharmacy)

**Boutique:**
- `FilterBar.tsx`
- `Sidebar.tsx`
- `Pagination.tsx`
- `ProductRow.tsx`

**Product detail:**
- `ProductActions.tsx`
- `ProductGallery.tsx`

**Pharmacy-specific NEW components to add (not in reference):**
- `PharmacieDeGardeWidget.tsx` — display + admin upload for weekly PDF
- `ConsultationWhatsAppCTA.tsx` — prominent WhatsApp consultation button

## 11. Supabase Schema (model after reference)

Build tables and RLS policies for:

- `products` (slug, name, brand_id, category_id, description, price, sale_price, stock, images, featured flags, SEO fields)
- `categories` (hierarchical: parent_id self-reference for subcategories)
- `brands`
- `articles` (blog posts / Le Carnet — slug, title, excerpt, cover image, body, category, published flag)
- `article_categories` (or simple text field)
- `orders` (status, customer info, payment method, shipping address, totals)
- `order_items`
- `cart_items` (or session-based)
- `wishlist_items`
- `users` (Supabase Auth + profile table)
- `addresses`
- `testimonials`
- `pharmacie_de_garde` (week_start_date, pdf_url, uploaded_at) — pharmacy-specific
- `loyalty_points` (fidelity system from reference)

Use Supabase migrations from the start. Every schema change is a numbered migration in `supabase/migrations/`. Never use Supabase Studio for schema work — always migrations, always versioned.

Implement RLS policies on every user-data table:
- Public can read published products, categories, brands, articles
- Users can read/write their own cart, wishlist, orders, addresses
- Admin can do everything (use a role check)

API routes that mutate data must verify authorization server-side. Don't rely on client-side admin guards.

## 12. Third-party Integrations (build now, activate later)

For each integration, build the code path with environment variables; use placeholder values until activation.

**Supabase** — required immediately, fully active.

**Cloudinary** — image and video hosting. Build the upload helper and URL transformation utility. Placeholder env vars until I provide real ones.

**CMI** — Moroccan payment gateway. Critical implementation notes (I've debugged this on a previous project — apply these from the start):
- Use plain SHA-512 with concatenated store key (NOT HMAC-SHA-512)
- Escape pipes (`|`) and backslashes (`\`) in hashed values
- `storetype` must be lowercase: `3D_PAY_HOSTING`
- Verify callback hash with `crypto.timingSafeEqual` to prevent timing attacks
- Use a shared `computeCmiHash` function for both initiating payment and verifying callback
- Test environment requires CMI test credentials, integration PDF reference, and public callback URL

**Resend** — transactional email (order confirmation, shipping updates, admin notifications). Build the templates and helper. Placeholder API key.

**UploadThing OR Cloudinary direct** — pick one for admin file uploads. Recommend Cloudinary direct to reduce dependencies.

## 13. Diagnostic Tool Adaptation

The reference project has a **skin diagnostic quiz** ("Quel est votre type de peau?"). For Pharmacie Rommana, adapt this to a broader **"Trouvez le produit qu'il vous faut"** quiz:

- Multiple paths: "Pour moi" / "Pour mon bébé" / "Pour ma famille"
- Questions adapt based on path (skin type for skincare, age range for baby products, symptoms for health products)
- Output: 3-5 product recommendations + option to chat on WhatsApp for personalized advice

Build the quiz engine generically (configurable questions/branches) so we can iterate on the questions without code changes. Wait for me to specify exact questions before coding the question set — first build the engine and quiz UI.

## 14. Content That Already Exists vs. Content TODO

**Use these as authoritative content:**
- Business meta description (section 1)
- Contact info (section 2)
- Delivery / payment copy (section 3)
- Real customer testimonials (section 5)
- Category taxonomy (section 6)

**Do NOT fabricate or invent:**
- About / "Notre Histoire" page — I'll write this with the client
- FAQ entries — leave as scaffold, client provides
- Blog articles — client provides, or I draft separately
- Founder/pharmacist quote — wait for me to provide
- Mission statement, "Our approach" copy — wait for me
- Real social media handles
- Real product descriptions (sample products are reference only)

For TODO sections, scaffold the page with a clearly marked placeholder like `{/* TODO: Real About copy from client */}`.

## 15. My Working Preferences

- **Targeted edits over full rewrites.** Long files (over ~200 lines) get `str_replace` edits, never full overwrites. Full rewrites cost ~50× more tokens.
- **Plan first, confirm with me, then code.** Summarize what you'll change before changing it.
- **Conserve tokens.** Don't dump huge file contents unless asked. Reference by path + line numbers.
- **Vanilla-first.** Don't add new dependencies without asking. The stack list above is intentional.
- **Be explicit about trade-offs.** I review your output critically. Frame choices, don't just pick.
- **Never recreate provided assets** (logos, photos, illustrations) in SVG or any other format. Use the file I provide as-is. Hard rule.
- **One concern at a time.** If I ask for branding, don't also reorganize routes. If I ask for content, don't refactor components.
- **Confirm capabilities, don't assume.** If you're unsure whether a feature exists in the current schema/code, ask.
- **French copy:** the site is in French. Use proper French (accents, typography, no anglicisms). Moroccan Darija only in customer-facing reviews if I add them — never in UI copy.
- **Commit often.** Small, named commits per logical change. Avoid huge "did 20 things" commits.

## 16. Phased Build Plan

Build in phases. Each phase has clear deliverables; don't skip ahead.

### Phase 0 — Foundation (start here)

1. Initialize Next.js project: `npx create-next-app@latest . --typescript --tailwind --app --eslint --src-dir=false --import-alias="@/*"`
2. Set up Supabase: create project (I'll provide the project ref), CLI link, initial migration scaffold
3. Set up `.env.local` with placeholder values for all services
4. Configure `.gitignore` properly (`.env*.local` already protected by Next.js default — verify)
5. Set up Tailwind config with design tokens (placeholder palette — I'll choose real one in Phase 1)
6. Create folder structure matching the routing plan in section 9
7. Build a minimal `layout.tsx` + homepage skeleton that renders "Pharmacie Rommana" with the meta description
8. Push first commit, deploy preview on Vercel to verify it works
9. **Deliverable:** Empty but live site, all infrastructure connected, ready for design + features

### Phase 1 — Brand identity & design system

1. Propose 2-3 color palette options + 2-3 typography pairings (visually distinct from La Beauté Libre). **Wait for my choice.**
2. Build design tokens file (colors, typography, spacing, shadows, radii) in Tailwind config + globals.css
3. Build a `/styleguide` page (admin-only or dev-only) that renders all tokens, buttons, form elements, product card states — so I can review the system
4. Once approved, build core layout components: Header, Footer, MobileNav, Providers
5. **Deliverable:** Visual identity locked in, components ready to fill with content

### Phase 2 — Database schema & admin foundation

1. Write all Supabase migrations (section 11)
2. Push to remote Supabase
3. Build admin login page + admin guard middleware
4. Build admin dashboard skeleton + sidebar
5. Build categories admin (CRUD) — easiest table, validates the admin pattern
6. **Deliverable:** Schema live, admin can log in, can manage categories

### Phase 3 — Core e-commerce

1. Products admin (CRUD with Cloudinary image upload)
2. Brands admin (CRUD)
3. Public product card + product detail page
4. Cart context + cart drawer + cart page
5. Wishlist context + wishlist page
6. Boutique page with filters, pagination, category navigation
7. **Deliverable:** Full product catalog browsable, items addable to cart/wishlist

### Phase 4 — Checkout & payments

1. Checkout flow (address collection, summary, payment method choice)
2. Cash on Delivery flow (order creation, admin notification email)
3. CMI integration (initiate + callback with hash verification — use the notes in section 12)
4. Order success / failure pages
5. Order admin (list, detail, status updates)
6. Resend email templates (order confirmation, status updates, admin alerts)
7. **Deliverable:** End-to-end purchase works (test with COD; CMI in test mode if credentials available)

### Phase 5 — Account, auth, account features

1. Supabase Auth: login, register, password reset
2. Auth modal (drawer/popup pattern from reference)
3. Mon Compte page with tabs (overview, orders, profile, address, security)
4. Address management
5. **Deliverable:** Users can register, log in, manage profile and orders

### Phase 6 — Content pages & marketing

1. Homepage sections (hero, features strip, categories, best sellers, brands wall, testimonials, blog teaser, founder strip placeholder)
2. Pharmacie de garde widget (admin upload + public display)
3. WhatsApp consultation CTA
4. Le Carnet (blog index + article page + admin)
5. Diagnostic quiz engine (generic, then wait for me on question set)
6. Notre Histoire (scaffold only, I'll provide content)
7. Contact page
8. FAQ (scaffold, I'll provide content)
9. Legal pages (CGV, mentions légales, livraison, retours — scaffolds, I'll provide content)
10. **Deliverable:** Full site complete with placeholder content where client copy is needed

### Phase 7 — Polish & launch prep

1. SEO metadata pass (every page, OG tags, structured data)
2. Performance pass (image optimization, lazy loading, bundle analysis)
3. Accessibility pass (ARIA, keyboard nav, contrast, focus states)
4. Mobile responsive QA across all pages
5. Real env vars from client (Cloudinary, Resend, CMI, Supabase Auth redirect URLs)
6. Production deploy + smoke test
7. **Deliverable:** Ready to launch

## 17. Hard Rules (Repeat for Emphasis)

- ✅ Targeted `str_replace` edits, not full file rewrites
- ✅ Plan first, confirm with me, then edit
- ✅ Use provided logo/image files as-is — never recreate
- ✅ No new dependencies without asking
- ✅ Conserve tokens
- ✅ Use Supabase migrations from the start, never Supabase Studio for schema work
- ✅ Verify authorization server-side; never trust client guards alone
- ❌ Don't copy paralbl.vercel.app's visual identity — same architecture, different brand
- ❌ Don't fabricate content (team, awards, social links, founder quotes)
- ❌ Don't refactor what I didn't ask you to touch
- ❌ Don't skip phases or build features out of order

---

## First Task

Do **only this** before anything else:

1. Read this entire brief and confirm you understand the scope.
2. Confirm the stack and tools you'll initialize (Next.js version, Supabase CLI version, etc.).
3. List any decisions you need from me before starting Phase 0 (e.g. project ref, Supabase region preference, package manager confirmation).
4. **Do not write any code yet.** Wait for my approval to begin Phase 0.

After I approve, begin Phase 0.