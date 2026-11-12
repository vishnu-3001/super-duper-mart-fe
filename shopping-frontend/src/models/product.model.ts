
// USER: Product listing
export interface UserProduct {
    productId: number;
    productName: string;
    retailPrice: number;
  }
  
  // USER: Product details
  export interface UserProductDetail extends UserProduct {
    description: string;
  }
  
  // ADMIN: Product listing
  export interface AdminProduct {
    productId: number;
    productName: string;
    quantity: number;
  }
  
  // ADMIN: Product details
  export interface AdminProductDetail extends AdminProduct {
    description: string;
    wholesalePrice: number;
    retailPrice: number;
  }
  
  // ADMIN: Create or update product
  export interface ProductRequest {
    productName: string;
    description: string;
    wholesalePrice: number;
    retailPrice: number;
    quantity: number;
  }
  