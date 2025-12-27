
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string; // Imagem principal
  image2?: string;
  image3?: string;
  image4?: string;
  description: string;
  sku: string;
  stock: number;
  isBestSeller: boolean;
  isNew: boolean;
  isPromotion: boolean;
}

export enum Category {
  ALL = 'Todos',
  DRESSES = 'Vestidos',
  BLOUSES = 'Blusas',
  PANTS = 'Calças',
  SKIRTS = 'Saias',
  ACCESSORIES = 'Acessórios',
  SALE = 'Sale'
}
