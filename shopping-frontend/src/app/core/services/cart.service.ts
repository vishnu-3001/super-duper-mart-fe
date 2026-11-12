import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { CartItem,CartProduct } from "src/models/cart.model";

@Injectable({
    providedIn:'root'
})
export class CartService{
    private cartSubject=new BehaviorSubject<CartItem[]>(this.loadCart());
    cart$=this.cartSubject.asObservable();
    cartCount$=this.cart$.pipe(map(items =>items.reduce((total, item) => total + item.quantity, 0)));
    cartTotal$=this.cart$.pipe(map(items=>items.reduce((total,item)=>total+item.retailPrice,0)));
    private loadCart():CartItem[]{
        try{
            const data=localStorage.getItem('shopping_cart');
            const parsed = data ? JSON.parse(data) : [];
            return Array.isArray(parsed)?parsed.filter(item=>item &&
                Number.isInteger(item.productId) &&
                typeof item.productName === 'string' &&
                Number.isFinite(item.retailPrice) &&
                item.retailPrice >= 0 &&
                Number.isInteger(item.quantity) &&
                item.quantity > 0):[]
        }catch {
            return [];
          }
    }
    private saveCart(items:CartItem[]):void{
        localStorage.setItem('shopping_cart',JSON.stringify(items));
        this.cartSubject.next(items);
    }
    getCartItems(): CartItem[] {
        return [...this.cartSubject.getValue()];
      }
  addToCart(product: CartProduct, quantity: number = 1): void {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error('Quantity must be a positive integer');
    }
    const items = this.getCartItems();

    const existingItem = items.find(
      item => item.productId === product.productId
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      items.push({
        productId: product.productId,
        productName: product.productName,
        retailPrice: product.retailPrice,
        quantity: quantity
      });
    }

    this.saveCart(items);
  }

  updateQuantity(productId: number, quantity: number): void {
    if (!Number.isInteger(quantity) || quantity < 0) {
      throw new Error('Quantity must be a non-negative integer');
    }
    if (quantity === 0) {
      this.removeFromCart(productId);
      return;
    }
    const items = this.getCartItems().map(item =>
      item.productId === productId
        ? { ...item, quantity: quantity }
        : item
    );
    this.saveCart(items);
  }

  removeFromCart(productId: number): void {
    const items = this.getCartItems().filter(
      item => item.productId !== productId
    );
    this.saveCart(items);
  }
  clearCart(): void {
    this.saveCart([]);
  }
}