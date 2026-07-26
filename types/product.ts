export interface ProductImage {
  id: string;
  product_id: string;
  storage_path: string;
  alt_text: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;

  name: string;
  slug: string;
  description: string;

  price: number;
  stock: number;

  featured: boolean;
  active: boolean;

  category_id: string;

  created_at: string;
  updated_at: string;

  categories?: Category;

  product_images?: ProductImage[];
}