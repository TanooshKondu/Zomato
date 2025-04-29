import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  message: string = '';
  error: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (!this.email) {
      this.error = 'Email is required';
      return;
    }

    // Send password reset request (you must have backend support for this)
    this.http.post('https://localhost:7129/api/auth/forgot-password', { email: this.email }).subscribe({
      next: () => {
        this.message = 'Password reset link sent to your email.';
        this.error = '';
      },
      error: () => {
        this.error = 'Something went wrong. Please try again.';
        this.message = '';
      }
    });
  }
}
