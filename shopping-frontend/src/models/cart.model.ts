export interface CartProduct {
    productId: number;
    productName: string;
    retailPrice: number;
  }
  
  export interface CartItem extends CartProduct {
    quantity: number;
  }  