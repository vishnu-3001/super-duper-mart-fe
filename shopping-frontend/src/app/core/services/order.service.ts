import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "./api.service";
import { AuthService } from "./auth.service";

export interface OrderItemRequest {
    productId: number;
    quantity: number;
}
export interface CreateOrderRequest {
    orderItems: OrderItemRequest[];
}
@Injectable({
    providedIn:'root'
})

export class OrderService{
    constructor(private apiService:ApiService,private authService:AuthService){}
    private baseUrl=this.authService.getShoppingBaseUrl();
    
}