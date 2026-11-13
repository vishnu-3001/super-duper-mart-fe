
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../../../core/services/cart.service';
import { OrderService } from '../../../core/services/order.service';

import { CartItem } from 'src/models/cart.model';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  displayedColumns: string[] = [
    'productName',
    'retailPrice',
    'quantity',
    'subtotal',
    'actions'
  ];

  isPlacingOrder = false;
  errorMessage = '';

  constructor(
    public cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  viewProduct(productId: number): void {
    this.router.navigate(['/user/products', productId]);
  }

  updateQuantity(
    item: CartItem,
    quantityInput: HTMLInputElement
  ): void {

    if (this.isPlacingOrder) {
      return;
    }

    const quantity = Number(quantityInput.value);

    if (!Number.isInteger(quantity) || quantity < 1) {
      quantityInput.value = String(item.quantity);
      return;
    }

    this.cartService.updateQuantity(
      item.productId,
      quantity
    );
  }

  removeProduct(productId: number): void {

    if (this.isPlacingOrder) {
      return;
    }

    this.cartService.removeFromCart(productId);
  }

  placeOrder(): void {

    if (this.isPlacingOrder) {
      return;
    }

    const cartItems = this.cartService.getCartItems();

    if (cartItems.length === 0) {
      this.errorMessage = 'Your cart is empty';
      return;
    }

    const orderRequest = {
      orderItems: cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };

    this.isPlacingOrder = true;
    this.errorMessage = '';

    this.orderService.placeOrder(orderRequest).subscribe({
      next: () => {

        // Clear cart only after successful order creation
        this.cartService.clearCart();

        this.isPlacingOrder = false;

        // Navigate to the user's orders
        this.router.navigate(['/user/orders']);
      },
      error: error => {
        this.isPlacingOrder = false;

        this.errorMessage =
          error.error?.message ||
          'Failed to place order';
      }
    });
  }
}
