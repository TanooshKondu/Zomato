// src/app/auth/register/register.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // ✅ Make sure this path is correct
import { ClientUser } from '../../shared/models/client-user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [AuthService], // ✅ Add this line
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string = '';
  phoneNumber: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  private authService = inject(AuthService); // ✅ Use inject() instead of constructor param
  private router = inject(Router);           // ✅ Same for Router

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    if (role === 'client') {
      this.router.navigate(['/']);
    }
    if (role === 'admin') {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  onRegister() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const user: ClientUser = {
      name: this.name,
      phoneNumber: this.phoneNumber,
      password: this.password
    };

    this.authService.register(user).subscribe({
      next: () => {
        alert('Registration successful');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.errorMessage = 'Registration failed. Try again later';
        console.error('Registration failed', err);
      }
    });
  }
}
