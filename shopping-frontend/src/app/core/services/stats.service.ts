import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private apiService: ApiService,private authService: AuthService) {}

  private get baseUrl(): string {
    return this.authService.getShoppingBaseUrl();
  }

  getFrequentProducts(count: number = 3): Observable<any[]> {
    return this.apiService.get<any[]>(`${this.baseUrl}/products/frequent/${count}`);
  }
  getRecentProducts(count: number = 3): Observable<any[]> {
    return this.apiService.get<any[]>(`${this.baseUrl}/products/recent/${count}`);
  }
  getTotalSold(): Observable<any> {
    return this.apiService.get<any>(`${this.baseUrl}/statistics/total-sold`);
  }

  getTopProducts(): Observable<any[]> {
    return this.apiService.get<any[]>(`${this.baseUrl}/statistics/top-products`);
  }

  getMostProfitableProducts(count: number): Observable<any> {
    return this.apiService.get<any>(`${this.baseUrl}/statistics/most-profitable/${count}`);
  }
}
