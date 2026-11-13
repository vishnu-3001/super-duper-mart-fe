
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OrderService } from '../../../core/services/order.service';
import { AuthService } from '../../../core/services/auth.service';
import { OrderDetail } from 'src/models/order.model';

interface OrderItemView {
  productId: number;
  productName?: string;
  quantity: number;
  priceAtPurchase: number | null;
}

interface ApiOrderItem {
  productId: number;
  productName?: string;
  quantity: number;
  priceAtOrder?: number;
  retailPriceAtPurchase?: number;
}

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  order: OrderDetail | null = null;
  orderId: string | null = null;
  orderItems: OrderItemView[] = [];

  displayedColumns: string[] = [
    'product',
    'quantity',
    'price',
    'actions'
  ];

  isLoading = false;
  isUpdating = false;
  errorMessage = '';

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  get isAdmin(): boolean {
    return this.authService.getRole() === 'ADMIN';
  }

  ngOnInit(): void {
    this.orderId =
      this.route.snapshot.paramMap.get('orderId');

    if (!this.orderId) {
      this.errorMessage = 'Invalid order ID';
      return;
    }

    this.loadOrder();
  }

  loadOrder(): void {
    if (!this.orderId) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.orderService.getOrderDetail(
      this.orderId
    ).subscribe({
      next: response => {

        // Supports "orderItems" or "items" responses
        const items: ApiOrderItem[] =
          response.orderItems ?? response.items ?? [];

        this.order = {
          ...response,
          orderItems: items
        };

        this.orderItems = items.map(item => ({
          productId: item.productId,
          productName: item.productName,
          quantity: item.quantity,
          priceAtPurchase:
            item.priceAtOrder ??
            item.retailPriceAtPurchase ??
            null
        }));

        this.isLoading = false;
      },
      error: error => {
        this.isLoading = false;
        this.errorMessage =
          error.error?.message || 'Failed to load order';
      }
    });
  }

  viewProduct(productId: number): void {
    const path = this.isAdmin
      ? '/admin/products'
      : '/user/products';

    this.router.navigate([path, productId]);
  }

  changeStatus(action: 'cancel' | 'complete'): void {

    if (
      !this.orderId ||
      !this.order ||
      this.order.status !== 'PROCESSING' ||
      this.isUpdating
    ) {
      return;
    }

    if (action === 'complete' && !this.isAdmin) {
      return;
    }

    this.isUpdating = true;
    this.errorMessage = '';

    this.orderService.updateOrder(
      this.orderId,
      action
    ).subscribe({
      next: () => {
        this.isUpdating = false;
        this.loadOrder();
      },
      error: error => {
        this.isUpdating = false;
        this.errorMessage =
          error.error?.message || 'Failed to update order';
      }
    });
  }

  backToOrders(): void {
    this.router.navigate([
      this.isAdmin ? '/admin/orders' : '/user/orders'
    ]);
  }
}
