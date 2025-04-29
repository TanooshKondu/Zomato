import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  filteredOrders: any[] = [];
  loading = false;

  filterUserId = '';
  filterStatus = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  // Load orders from backend
  loadOrders() {
    this.loading = true;
    this.http.get<any[]>('https://localhost:7129/api/orders').subscribe({
      next: (data) => {
        this.orders = data;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load admin orders', err);
        this.loading = false;
      }
    });
  }

  // Apply filters based on status and user ID
  applyFilters() {
    this.filteredOrders = this.orders.filter(order => {
      const matchesUserId = this.filterUserId ? order.userId.toString().includes(this.filterUserId) : true;
      const matchesStatus = this.filterStatus ? order.status === this.filterStatus : true;
      return matchesUserId && matchesStatus;
    });
  }

  // Update the status of an order
  updateStatus(orderId: number, event: Event) {
    const target = event.target as HTMLSelectElement; // Casting event.target to HTMLSelectElement
    const newStatus = target.value;

    const url = `https://localhost:7129/api/orders/${orderId}/status`;
    this.http.patch(url, { status: newStatus }).subscribe({
      next: () => {
        this.loadOrders(); // Reload the orders after status update
      },
      error: (err) => {
        console.error('Failed to update order status', err);
      }
    });
  }

  // Delete an order
  deleteOrder(orderId: number) {
    if (!confirm('Are you sure you want to delete this order?')) return;

    // Uncomment when backend supports DELETE
    this.http.delete(`https://localhost:7129/api/orders/${orderId}`).subscribe({
      next: () => {
        this.loadOrders(); // Reload the orders after deletion
      },
      error: (err) => {
        console.error('Failed to delete order', err);
      }
    });
  }
}
