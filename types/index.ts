export interface Product {
  id: string;
  slug: string;
  name: string;
  brand_id: string | null;
  category_id: string | null;
  description: string | null;
  price: number;
  sale_price: number | null;
  stock: number;
  images: string[];
  featured_promo: boolean;
  featured_bestseller: boolean;
  is_published: boolean;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  parent_id: string | null;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  logo_url: string | null;
  description: string | null;
  is_featured: boolean;
  created_at: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  body: string | null;
  category: string | null;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string | null;
  status: OrderStatus;
  payment_method: "cod" | "cmi";
  payment_status: "pending" | "paid" | "failed" | "refunded";
  subtotal: number;
  shipping_cost: number;
  total_amount: number;
  shipping_address: Address;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_image: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  region: string;
  postal_code?: string;
  country: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  author_name: string;
  author_initials: string;
  body: string;
  rating: number;
  time_ago: string;
  lang: "fr" | "ar" | "en";
}

export interface PharmacieDeGarde {
  id: string;
  week_start_date: string;
  pdf_url: string;
  uploaded_at: string;
}
