export type Lang = "fr" | "ar";

const translations = {
  // ─── Navigation ───────────────────────────────────────────
  "nav.home": { fr: "Accueil", ar: "الرئيسية" },
  "nav.boutique": { fr: "Boutique", ar: "المتجر" },
  "nav.categories": { fr: "Catégories", ar: "الأقسام" },
  "nav.brands": { fr: "Marques", ar: "العلامات" },
  "nav.blog": { fr: "Blog Santé", ar: "مدونة الصحة" },
  "nav.contact": { fr: "Contact", ar: "تواصل معنا" },
  "nav.faq": { fr: "FAQ", ar: "الأسئلة الشائعة" },
  "nav.livraison": { fr: "Livraison", ar: "التوصيل" },
  "nav.retours": { fr: "Retours", ar: "الإرجاع" },
  "nav.legal": { fr: "Mentions légales", ar: "المعلومات القانونية" },
  "nav.cgv": { fr: "CGV", ar: "شروط البيع" },

  // ─── Top-level categories ──────────────────────────────────
  "cat.bebe-et-maman": { fr: "Bébé & Maman", ar: "الأم والطفل" },
  "cat.visage": { fr: "Visage", ar: "الوجه" },
  "cat.corps": { fr: "Corps", ar: "الجسم" },
  "cat.cheveux": { fr: "Cheveux", ar: "الشعر" },
  "cat.hygiene": { fr: "Hygiène", ar: "النظافة" },
  "cat.sante": { fr: "Santé", ar: "الصحة" },
  "cat.solaire": { fr: "Solaire", ar: "واقي الشمس" },
  "cat.homme": { fr: "Homme", ar: "الرجل" },

  // ─── Subcategories — Bébé et maman ────────────────────────
  "cat.accessoires": { fr: "Accessoires", ar: "الملحقات" },
  "cat.change": { fr: "Change", ar: "الحفاضات" },
  "cat.hygiene-bebe": { fr: "Hygiène bébé", ar: "نظافة الطفل" },
  "cat.maman": { fr: "Maman", ar: "الأم" },
  "cat.sante-bebe": { fr: "Santé bébé", ar: "صحة الطفل" },

  "cat.capillaire": { fr: "Capillaire", ar: "العناية بالشعر" },
  "cat.complements-alimentaires": { fr: "Compléments alimentaires", ar: "المكملات الغذائية" },

  // ─── Subcategories — Cheveux ──────────────────────────────
  "cat.bio": { fr: "Bio", ar: "طبيعي" },
  "cat.shampoing": { fr: "Shampoing", ar: "الشامبو" },
  "cat.soin-anti-poux": { fr: "Soin anti-poux", ar: "علاج القمل" },

  // ─── Subcategories — Corps ────────────────────────────────
  "cat.hygiene-corps": { fr: "Hygiène de corps", ar: "نظافة الجسم" },
  "cat.mains-pieds": { fr: "Mains et pieds", ar: "اليدان والقدمان" },
  "cat.soins-corps": { fr: "Soins de corps", ar: "عناية بالجسم" },

  // ─── Subcategories — Homme ────────────────────────────────
  "cat.lubrifiants": { fr: "Lubrifiants", ar: "مزلقات" },
  "cat.preservatifs": { fr: "Préservatifs", ar: "واقي ذكري" },

  // ─── Subcategories — Hygiène ──────────────────────────────
  "cat.corps-visage": { fr: "Corps et visage", ar: "الجسم والوجه" },
  "cat.dentaire": { fr: "Dentaire", ar: "صحة الأسنان" },
  "cat.hygiene-intime": { fr: "Hygiène intime", ar: "النظافة الحميمة" },

  // ─── Subcategories — Santé ────────────────────────────────
  "cat.bien-etre": { fr: "Bien-être", ar: "الرفاهية" },
  "cat.soins-confort": { fr: "Soins et confort", ar: "الرعاية والراحة" },
  "cat.tests-mesures": { fr: "Tests et mesures", ar: "الاختبارات والقياسات" },
  "cat.yeux-nez-oreille": { fr: "Yeux · Nez · Oreille", ar: "عيون · أنف · أذن" },

  // ─── Subcategories — Solaire ──────────────────────────────
  "cat.caracteristique": { fr: "Caractéristique", ar: "خصائص" },
  "cat.indication": { fr: "Indication", ar: "المؤشرات" },
  "cat.texture": { fr: "Texture", ar: "القوام" },
  "cat.types-peau": { fr: "Types de peau", ar: "أنواع البشرة" },

  // ─── Subcategories — Visage ───────────────────────────────
  "cat.soin-visage": { fr: "Soin visage", ar: "عناية بالوجه" },

  // ─── Header ───────────────────────────────────────────────
  "header.search_placeholder": { fr: "Rechercher des produits...", ar: "ابحث عن منتجاتك..." },
  "header.search_label": { fr: "Rechercher", ar: "بحث" },
  "header.need_help": { fr: "Besoin d'aide ?", ar: "تحتاج مساعدة؟" },
  "header.wishlist": { fr: "Favoris", ar: "المفضلة" },
  "header.account": { fr: "Mon compte", ar: "حسابي" },
  "header.cart": { fr: "Panier", ar: "السلة" },
  "header.all_results": { fr: "Voir tous les résultats pour", ar: "عرض كل النتائج لـ" },
  "header.no_results": { fr: "Aucun produit trouvé pour", ar: "لا توجد منتجات لـ" },

  // ─── Features strip ───────────────────────────────────────
  "features.delivery_label": { fr: "Livraison", ar: "التوصيل" },
  "features.delivery_title": { fr: "Livraison Gratuite", ar: "توصيل مجاني" },
  "features.delivery_badge": { fr: "Dès 400 DH", ar: "ابتداءً من 400 درهم" },
  "features.delivery_sub": { fr: "Tétouan & Maroc", ar: "تطوان وكل المغرب" },
  "features.payment_label": { fr: "Paiement", ar: "الدفع" },
  "features.payment_title": { fr: "Paiement à la Livraison", ar: "الدفع عند الاستلام" },
  "features.payment_badge": { fr: "100% Sécurisé", ar: "100% آمن" },
  "features.payment_sub": { fr: "Payez à la réception", ar: "ادفع عند التسليم" },
  "features.delivery_long": { fr: "Dès {tetouan} DH sur Tétouan · {maroc} DH sur tout le Maroc", ar: "ابتداءً من {tetouan} درهم على تطوان · {maroc} درهم على كل المغرب" },
  "features.payment_long": { fr: "Commandez en toute confiance et payez cash directement lors de la réception de votre colis.", ar: "اطلب بثقة وادفع نقداً عند استلام طردك مباشرةً." },
  "features.whatsapp_title": { fr: "Commande WhatsApp", ar: "طلب عبر واتساب" },
  "features.whatsapp_sub": { fr: "Besoin d'un conseil ou envie de commander rapidement ? Échangez avec nous !", ar: "تحتاج نصيحة أو تريد طلباً سريعاً؟ تواصل معنا!" },

  // ─── Product card ─────────────────────────────────────────
  "product.add_to_cart": { fr: "Panier", ar: "السلة" },
  "product.add_wishlist": { fr: "Ajouter aux favoris", ar: "إضافة للمفضلة" },
  "product.remove_wishlist": { fr: "Retirer des favoris", ar: "إزالة من المفضلة" },
  "product.image_coming": { fr: "Image à venir", ar: "الصورة قريباً" },
  "product.view_all": { fr: "Voir tous les produits", ar: "عرض كل المنتجات" },

  // ─── Cart drawer ──────────────────────────────────────────
  "cart.title": { fr: "Panier", ar: "السلة" },
  "cart.close": { fr: "Fermer le panier", ar: "إغلاق السلة" },
  "cart.empty": { fr: "Votre panier est vide", ar: "سلتك فارغة" },
  "cart.continue": { fr: "Continuer mes achats", ar: "متابعة التسوق" },
  "cart.quantity": { fr: "Qté", ar: "الكمية" },
  "cart.remove": { fr: "Supprimer", ar: "حذف" },
  "cart.total": { fr: "Total", ar: "المجموع" },
  "cart.checkout": { fr: "Commander", ar: "إتمام الطلب" },
  "cart.free_delivery": { fr: "Livraison offerte dès 400 DH", ar: "توصيل مجاني ابتداءً من 400 درهم" },
  "cart.free_delivery_left": { fr: "Plus que {amount} DH pour la livraison gratuite", ar: "تبقى {amount} درهم للحصول على توصيل مجاني" },

  // ─── Homepage sections ────────────────────────────────────
  "home.bestsellers": { fr: "Meilleures Ventes", ar: "الأكثر مبيعاً" },
  "home.bestsellers_sub": { fr: "Les produits préférés de nos clients", ar: "المنتجات المفضلة لدى عملائنا" },
  "home.promotions": { fr: "Offres Spéciales", ar: "عروض خاصة" },
  "home.promotions_sub": { fr: "Profitez de nos réductions exclusives du moment", ar: "استفد من خصوماتنا الحصرية الآن" },
  "home.promotions_up_to": { fr: "Jusqu'à −30 %", ar: "خصم يصل إلى −30 %" },
  "home.brands": { fr: "Nos marques", ar: "علاماتنا التجارية" },
  "home.brands_all": { fr: "Voir toutes les marques", ar: "عرض كل العلامات" },
  "home.reviews": { fr: "Ce que disent nos clients", ar: "ما يقوله عملاؤنا" },
  "home.reviews_badge": { fr: "Avis Google", ar: "تقييمات Google" },
  "home.reviews_count": { fr: "avis", ar: "تقييم" },
  "home.reviews_cta": { fr: "Laisser un avis Google", ar: "اترك تقييماً على Google" },
  "home.categories": { fr: "Nos Catégories", ar: "أقسامنا" },
  "home.categories_sub": { fr: "Trouvez ce dont vous avez besoin", ar: "ابحث عما تحتاجه" },
  "home.promotions_marquee_a": { fr: "Profitez de nos offres spéciales", ar: "استفد من عروضنا الخاصة" },
  "home.promotions_marquee_b": { fr: "Réductions allant jusqu'à 30 %", ar: "خصومات تصل إلى 30 %" },

  // ─── Footer ───────────────────────────────────────────────
  "footer.address": { fr: "Adresse", ar: "العنوان" },
  "footer.whatsapp": { fr: "WhatsApp", ar: "واتساب" },
  "footer.phone": { fr: "Téléphone", ar: "الهاتف" },
  "footer.socials": { fr: "Réseaux sociaux", ar: "التواصل الاجتماعي" },
  "footer.copyright": { fr: "© 2026 Pharmacie Rommana. Tous droits réservés.", ar: "© 2026 صيدلية الرمانة. جميع الحقوق محفوظة." },
  "nav.about": { fr: "À Propos", ar: "من نحن" },
  "footer.description": {
    fr: "Pharmacie Rommana, basée à Tétouan, est une parapharmacie en ligne spécialisée dans les produits de soin, d'hygiène et de bien-être. Livraison rapide partout au Maroc.",
    ar: "صيدلية الرمانة، مقرها تطوان، صيدلية بارامديكالية متخصصة في منتجات العناية والنظافة والعافية. توصيل سريع في جميع أنحاء المغرب.",
  },
  "footer.useful_links": { fr: "Liens Utiles", ar: "روابط مفيدة" },
  "footer.contact": { fr: "Contact", ar: "تواصل معنا" },
  "footer.newsletter": { fr: "Restez informé de nos offres", ar: "ابقَ على اطلاع بعروضنا" },
  "footer.newsletter_sub": { fr: "Inscrivez-vous pour recevoir les dernières nouveautés santé.", ar: "اشترك لتصلك آخر أخبار الصحة والمنتجات." },
  "footer.newsletter_placeholder": { fr: "Votre email", ar: "بريدك الإلكتروني" },
  "footer.newsletter_btn": { fr: "S'inscrire", ar: "اشترك" },
  "footer.newsletter_done": { fr: "Bientôt disponible", ar: "قريباً" },
  "footer.rights": { fr: "Tous droits réservés", ar: "جميع الحقوق محفوظة" },
  "footer.made_in": { fr: "Fait avec ❤ au Maroc", ar: "صُنع بـ ❤ في المغرب" },

  // ─── Checkout / order ─────────────────────────────────────
  "order.title": { fr: "Passer commande", ar: "إتمام الطلب" },
  "order.address": { fr: "Adresse de livraison", ar: "عنوان التوصيل" },
  "order.first_name": { fr: "Prénom", ar: "الاسم الأول" },
  "order.last_name": { fr: "Nom", ar: "اسم العائلة" },
  "order.phone": { fr: "Téléphone", ar: "الهاتف" },
  "order.city": { fr: "Ville", ar: "المدينة" },
  "order.address_line": { fr: "Adresse", ar: "العنوان" },
  "order.payment": { fr: "Mode de paiement", ar: "طريقة الدفع" },
  "order.cod": { fr: "Paiement à la livraison", ar: "الدفع عند الاستلام" },
  "order.summary": { fr: "Récapitulatif", ar: "ملخص الطلب" },
  "order.submit": { fr: "Confirmer la commande", ar: "تأكيد الطلب" },
  "order.subtotal": { fr: "Sous-total", ar: "المجموع الجزئي" },
  "order.delivery": { fr: "Livraison", ar: "التوصيل" },
  "order.free": { fr: "Gratuite", ar: "مجاني" },
  "order.total": { fr: "Total", ar: "المجموع" },
  "order.success_title": { fr: "Commande confirmée !", ar: "تم تأكيد طلبك!" },
  "order.success_sub": { fr: "Merci pour votre commande", ar: "شكراً لك على طلبك" },
  "order.number": { fr: "Numéro de commande", ar: "رقم الطلب" },
  "order.fail_title": { fr: "Paiement échoué", ar: "فشل الدفع" },
  "order.fail_sub": { fr: "Votre paiement n'a pas pu être traité.", ar: "لم نتمكن من معالجة دفعتك." },
  "order.retry": { fr: "Réessayer", ar: "حاول مجدداً" },
  "order.back_cart": { fr: "Retour au panier", ar: "العودة إلى السلة" },

  // ─── General ──────────────────────────────────────────────
  "general.see_more": { fr: "Voir plus", ar: "عرض المزيد" },
  "general.see_all": { fr: "Voir tout", ar: "عرض الكل" },
  "general.loading": { fr: "Chargement...", ar: "جارٍ التحميل..." },
  "general.pharmacie_de_garde": { fr: "Pharmacie de Garde", ar: "صيدلية الحراسة" },
  "general.consultation": { fr: "Consultation WhatsApp", ar: "استشارة واتساب" },
  "general.find_us": { fr: "Nous trouver", ar: "أين نجدنا" },
  "general.view_cart": { fr: "Voir le panier", ar: "عرض السلة" },
  "general.order": { fr: "Commander", ar: "إتمام الطلب" },

  // ─── Boutique / filters ───────────────────────────────────
  "boutique.quick_search": { fr: "RECHERCHE RAPIDE", ar: "بحث سريع" },
  "boutique.search_placeholder": { fr: "Rechercher...", ar: "بحث..." },
  "boutique.all": { fr: "Tous", ar: "الكل" },
  "boutique.min_price": { fr: "Prix min", ar: "أقل سعر" },
  "boutique.max_price": { fr: "Prix max", ar: "أعلى سعر" },
  "boutique.sort": { fr: "Trier par", ar: "ترتيب حسب" },
  "boutique.sort_by": { fr: "Trier par", ar: "ترتيب حسب" },
  "boutique.sort_price_asc": { fr: "Prix croissant", ar: "السعر: من الأقل" },
  "boutique.sort_price_desc": { fr: "Prix décroissant", ar: "السعر: من الأعلى" },
  "boutique.sort_newest": { fr: "Nouveautés", ar: "الأحدث" },
  "boutique.reset_filters": { fr: "Réinitialiser", ar: "إعادة تعيين" },
  "boutique.on_sale": { fr: "En promotion", ar: "الأصناف المخفضة" },
  "boutique.in_stock": { fr: "En stock", ar: "متوفر في المخزن" },
  "boutique.filters": { fr: "Filtres", ar: "تصفية" },
  "boutique.results": { fr: "résultats", ar: "نتيجة" },
  "boutique.no_results": { fr: "Aucun produit trouvé", ar: "لا توجد منتجات" },

  // ─── Blog / Carnet ────────────────────────────────────────
  "home.blog": { fr: "Le Carnet Santé", ar: "مدونة الصحة" },
  "home.blog_sub": { fr: "Conseils et actualités santé", ar: "نصائح وأخبار الصحة" },
  "home.blog_all": { fr: "Voir tous les articles", ar: "عرض كل المقالات" },
  "home.blog_read": { fr: "Lire l'article", ar: "قراءة المقال" },

  // ─── Pharmacy specific ────────────────────────────────────
  "pharmacy.garde_title": { fr: "Pharmacie de Garde", ar: "صيدلية المناوبة" },
  "pharmacy.garde_sub": { fr: "Tétouan · semaine en cours", ar: "تطوان · الأسبوع الحالي" },
  "pharmacy.garde_pdf": { fr: "Télécharger le PDF", ar: "تحميل PDF" },
  "pharmacy.garde_download": { fr: "Télécharger le PDF", ar: "تحميل ملف PDF" },
  "pharmacy.garde_none": { fr: "Aucun planning disponible", ar: "لا يوجد جدول متاح" },
  "pharmacy.garde_popup": { fr: "PDF disponible", ar: "PDF متاح" },
  "pharmacy.whatsapp_title": { fr: "Consultation WhatsApp", ar: "استشارة على واتساب" },
  "pharmacy.whatsapp_sub": { fr: "Posez vos questions à notre pharmacien", ar: "اسأل صيدلانيَّنا مباشرةً" },
  "pharmacy.whatsapp_cta": { fr: "Consulter maintenant", ar: "استشر الآن" },
  "pharmacy.consult_title": { fr: "Votre Consultation", ar: "استشارتك" },
  "pharmacy.consult_sub": { fr: "Posez vos questions à notre pharmacien", ar: "اسأل صيدلانينا مباشرة" },
  "pharmacy.consult_cta": { fr: "Démarrer sur WhatsApp", ar: "ابدأ على واتساب" },

  // ─── Hero ─────────────────────────────────────────────────
  "hero.badge": { fr: "Expertise Pharmaceutique", ar: "خبرة صيدلانية" },
  "hero.title": { fr: "Votre santé, notre priorité numérique.", ar: "صحتك، أولويتنا الرقمية." },
  "hero.subtitle": {
    fr: "Découvrez une large gamme de produits parapharmaceutiques sélectionnés pour votre bien-être quotidien, livrés directement chez vous.",
    ar: "اكتشف مجموعة واسعة من منتجات الصيدلية المختارة لصحتك اليومية، مع توصيل مباشر إلى منزلك.",
  },
  "hero.cta_shop": { fr: "Voir les offres", ar: "استعرض العروض" },
  "hero.cta_whatsapp": { fr: "WhatsApp Conseil", ar: "استشارة واتساب" },

  // ─── Account / auth ───────────────────────────────────────
  "auth.login": { fr: "Connexion", ar: "تسجيل الدخول" },
  "auth.register": { fr: "Inscription", ar: "إنشاء حساب" },
  "auth.logout": { fr: "Se déconnecter", ar: "تسجيل الخروج" },
  "auth.my_account": { fr: "Mon Compte", ar: "حسابي" },
  "auth.my_orders": { fr: "Mes commandes", ar: "طلباتي" },
  "auth.my_addresses": { fr: "Mes adresses", ar: "عناويني" },
  "auth.my_wishlist": { fr: "Ma liste de souhaits", ar: "قائمة أمنياتي" },
  "account.title": { fr: "Mon Compte", ar: "حسابي" },
  "account.tab_overview": { fr: "Aperçu", ar: "نظرة عامة" },
  "account.tab_orders": { fr: "Commandes", ar: "الطلبات" },
  "account.tab_profile": { fr: "Profil", ar: "الملف الشخصي" },
  "account.tab_addresses": { fr: "Adresses", ar: "العناوين" },
  "account.tab_security": { fr: "Sécurité", ar: "الأمان" },
  "account.no_orders": { fr: "Aucune commande pour l'instant", ar: "لا توجد طلبات حتى الآن" },
  "account.edit": { fr: "Modifier", ar: "تعديل" },
  "account.save": { fr: "Enregistrer", ar: "حفظ" },
  "auth.email": { fr: "Adresse e-mail", ar: "البريد الإلكتروني" },
  "auth.password": { fr: "Mot de passe", ar: "كلمة المرور" },
  "auth.forgot_password": { fr: "Mot de passe oublié ?", ar: "هل نسيت كلمة المرور؟" },
  "auth.no_account": { fr: "Pas encore de compte ?", ar: "ليس لديك حساب؟" },
  "auth.sign_in": { fr: "Se connecter", ar: "تسجيل الدخول" },
  "auth.create_account": { fr: "Créer un compte", ar: "إنشاء حساب" },
  "auth.full_name": { fr: "Prénom & nom", ar: "الاسم الكامل" },
  "auth.confirm_password": { fr: "Confirmer le mot de passe", ar: "تأكيد كلمة المرور" },
  "auth.have_account": { fr: "Déjà un compte ?", ar: "لديك حساب بالفعل؟" },

  // ─── Wishlist page ────────────────────────────────────────────
  "wishlist.empty": { fr: "Votre liste de favoris est vide", ar: "قائمة المفضلة فارغة" },
  "wishlist.discover": { fr: "Découvrir nos produits", ar: "اكتشاف منتجاتنا" },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, lang: Lang, vars?: Record<string, string | number>): string {
  let str: string = translations[key][lang];
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      str = str.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
    }
  }
  return str;
}

/** Map a category slug to a translated name */
const SLUG_TO_KEY: Record<string, TranslationKey> = {
  "bebe-et-maman": "cat.bebe-et-maman",
  "visage": "cat.visage",
  "corps": "cat.corps",
  "cheveux": "cat.cheveux",
  "hygiene": "cat.hygiene",
  "sante": "cat.sante",
  "solaire": "cat.solaire",
  "homme": "cat.homme",
  "accessoires": "cat.accessoires",
  "change": "cat.change",
  "maman": "cat.maman",
  "bio": "cat.bio",
  "shampoing": "cat.shampoing",
  "soin-anti-poux": "cat.soin-anti-poux",
  "hygiene-de-corps": "cat.hygiene-corps",
  "mains-et-pieds": "cat.mains-pieds",
  "soins-de-corps": "cat.soins-corps",
  "lubrifiants": "cat.lubrifiants",
  "preservatifs": "cat.preservatifs",
  "corps-et-visage": "cat.corps-visage",
  "dentaire": "cat.dentaire",
  "hygiene-intime": "cat.hygiene-intime",
  "bien-etre": "cat.bien-etre",
  "soins-et-confort": "cat.soins-confort",
  "tests-et-mesures": "cat.tests-mesures",
  "yeux-nez-oreille": "cat.yeux-nez-oreille",
  "caracteristique": "cat.caracteristique",
  "indication": "cat.indication",
  "texture": "cat.texture",
  "types-de-peau": "cat.types-peau",
  "soin-visage": "cat.soin-visage",
  "capillaire": "cat.capillaire",
  "complements-alimentaires": "cat.complements-alimentaires",
};

export function translateCategory(name: string, slug: string, lang: Lang): string {
  if (lang === "fr") return name;
  const key = SLUG_TO_KEY[slug];
  if (!key) return name;
  return translations[key][lang];
}
