
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

export interface WatchlistProduct {
  productId: number;
  productName: string;
  retailPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  constructor(private apiService: ApiService,private authService: AuthService) {}
  private get baseUrl(): string {
    return `${this.authService.getShoppingBaseUrl()}/watchlist`;
  }
  getWatchlist(): Observable<WatchlistProduct[]> {
    return this.apiService.get<WatchlistProduct[]>(this.baseUrl);
  }

  addToWatchlist(productId: number): Observable<void> {
    return this.apiService.post<void>(`${this.baseUrl}/${productId}`,null);
  }
  removeFromWatchlist(productId: number): Observable<void> {
    return this.apiService.delete<void>(`${this.baseUrl}/${productId}`);
  }
}
