import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../shared/models/cart-item.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cart = this.cartService.getCart();
  }

  removeItem(foodId: number) {
    this.cartService.removeFromCart(foodId);
    this.cart = this.cartService.getCart(); // Update view
  }

  getTotal(): number {
    return this.cartService.getTotalAmount();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cart = [];
  }
}
