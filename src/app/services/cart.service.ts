import { Injectable } from '@angular/core';
import { CartItem } from '../shared/models/cart-item.model';

const CART_KEY = 'food_cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];

  constructor() {
    const stored = localStorage.getItem(CART_KEY);
    this.cart = stored ? JSON.parse(stored) : [];
  }

  private saveCart(): void {
    localStorage.setItem(CART_KEY, JSON.stringify(this.cart));
  }

  getCart(): CartItem[] {
    return [...this.cart]; // return a copy to avoid external mutation
  }

  addToCart(food: CartItem['food']): void {
    const item = this.cart.find(c => c.food.foodItemId === food.foodItemId);
    if (item) {
      item.quantity += 1;
    } else {
      this.cart.push({ food, quantity: 1 });
    }
    this.saveCart();
  }

  removeFromCart(foodId: number): void {
    this.cart = this.cart.filter(c => c.food.foodItemId !== foodId);
    this.saveCart();
  }

  updateQuantity(foodId: number, newQuantity: number): void {
    const item = this.cart.find(c => c.food.foodItemId === foodId);
    if (item) {
      item.quantity = newQuantity;
      if (item.quantity <= 0) {
        this.removeFromCart(foodId);
      } else {
        this.saveCart();
      }
    }
  }

  clearCart(): void {
    this.cart = [];
    this.saveCart();
  }

  getTotalAmount(): number {
    return this.cart.reduce((total, item) => total + (item.food.price * item.quantity), 0);
  }

  getItemCount(): number {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }
}
