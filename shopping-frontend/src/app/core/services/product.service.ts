
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private apiSource: ApiService,private authService: AuthService) {}
  private get baseUrl(): string {
    return this.authService.getShoppingBaseUrl();
  }

  getProducts(): Observable<any[]> {
    return this.apiSource.get<any[]>(`${this.baseUrl}/products`);
  }

  getProductDetail(productId: number): Observable<any> {
    const role = this.authService.getRole();
    return this.apiSource.get<any>(`${this.baseUrl}/product/${productId}`);
  }

  createProduct(product: any): Observable<any> {
    return this.apiSource.post<any>(`${this.baseUrl}/products`,product);
  }

  updateProduct(productId: number,product: any): Observable<any> {
    return this.apiSource.patch<any>(`${this.baseUrl}/products/${productId}`,product);
  }

}
