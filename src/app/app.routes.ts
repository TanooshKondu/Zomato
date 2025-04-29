// src/app/app.routes.ts
import { Routes } from '@angular/router';

// Guards
import { AdminAuthGuard } from './auth/admin-auth.guard';
import { ClientAuthGuard } from './auth/client-auth.guard';

// Auth components
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LogoffComponent } from './auth/logoff/logoff.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

// Client-side orders
import { OrdersComponent } from './client/orders/orders.component';

// Admin-side orders
import { OrdersComponent as AdminOrdersComponent } from './admin/orders/orders.component';

export const routes: Routes = [ // Change appRoutes to routes
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  // Client routes (protected)
  { path: 'home', loadComponent: () => import('./client/home/home.component').then(m => m.HomeComponent) },
  { path: 'food-menu', loadComponent: () => import('./client/food-menu/food-menu.component').then(m => m.FoodMenuComponent), canActivate: [ClientAuthGuard] },
  { path: 'cart', loadComponent: () => import('./client/cart/cart.component').then(m => m.CartComponent), canActivate: [ClientAuthGuard] },
  { path: 'checkout', loadComponent: () => import('./client/checkout/checkout.component').then(m => m.CheckoutComponent), canActivate: [ClientAuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [ClientAuthGuard] }, // User orders
  
  // Auth routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logoff', component: LogoffComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  
  // Admin routes (protected)
  { path: 'admin-login', loadComponent: () => import('./admin/admin-login/admin-login.component').then(m => m.AdminLoginComponent) },
  { path: 'admin/dashboard', loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [AdminAuthGuard] },
  { path: 'admin/manage-food', loadComponent: () => import('./admin/manage-food/manage-food.component').then(m => m.ManageFoodComponent), canActivate: [AdminAuthGuard] },
  { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AdminAuthGuard] },

  // Catch-all
  { path: '**', redirectTo: 'home' }
];
