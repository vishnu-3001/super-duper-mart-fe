
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { OrderItemRequest,CreateOrderRequest } from 'src/models/order.model';

// export interface OrderItemRequest {
//   productId: number;
//   quantity: number;
// }

// export interface CreateOrderRequest {
//   orderItems: OrderItemRequest[];
// }

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private apiService: ApiService,private authService: AuthService) {}

  private get baseUrl(): string {
    return this.authService.getShoppingBaseUrl();
  }

  getOrders(): Observable<any[]> {
    return this.apiService.get<any[]>(`${this.baseUrl}/orders`);
  }

  getOrderDetail(orderId: string): Observable<any> {
    return this.apiService.get<any>(`${this.baseUrl}/orders/${orderId}`);
  }

  updateOrder(orderId: string,type: 'cancel' | 'complete'): Observable<any> {
    return this.apiService.patch<any>(`${this.baseUrl}/orders/${orderId}/${type}`);
  }

  placeOrder(order: CreateOrderRequest): Observable<any> {
    return this.apiService.post<any>(`${this.baseUrl}/orders`,order);
  }
}
