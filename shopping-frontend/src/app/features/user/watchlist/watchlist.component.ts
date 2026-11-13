
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WatchlistService } from '../../../core/services/watchlist.service';
import { UserProduct } from 'src/models/product.model';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  products: UserProduct[] = [];

  displayedColumns: string[] = [
    'productId',
    'productName',
    'retailPrice',
    'actions'
  ];

  isLoading = false;
  removingProductId: number | null = null;

  errorMessage = '';
  successMessage = '';

  constructor(
    private watchlistService: WatchlistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadWatchlist();
  }

  loadWatchlist(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.watchlistService.getWatchlist().subscribe({
      next: (response: UserProduct[]) => {
        this.products = response;
        this.isLoading = false;
      },
      error: error => {
        this.errorMessage =
          error.error?.message || 'Failed to load watchlist';

        this.isLoading = false;
      }
    });
  }

  viewProduct(productId: number): void {
    this.router.navigate(['/user/products', productId]);
  }

  removeProduct(productId: number): void {

    if (this.removingProductId !== null) {
      return;
    }

    this.removingProductId = productId;
    this.errorMessage = '';
    this.successMessage = '';

    this.watchlistService.removeFromWatchlist(productId)
      .subscribe({
        next: () => {

          this.products = this.products.filter(
            product => product.productId !== productId
          );

          this.removingProductId = null;
          this.successMessage = 'Product removed from watchlist';
        },
        error: error => {
          this.removingProductId = null;

          this.errorMessage =
            error.error?.message ||
            'Failed to remove product';
        }
      });
  }
}
