
export interface OrderItemRequest {
    productId: number;
    quantity: number;
  }
  
  export interface CreateOrderRequest {
    orderItems: OrderItemRequest[];
  }
  
  export type OrderStatus =
    'PROCESSING' | 'COMPLETED' | 'CANCELED';
  
  export interface OrderSummary {
    orderId: string;
    status: OrderStatus;
    placedAt: string;
  }
  
  export interface OrderItemResponse {
    productId: number;
    quantity: number;
    retailPriceAtPurchase?: number;
  }
  
  export interface OrderDetail extends OrderSummary {
    orderItems: OrderItemResponse[];
  }
  