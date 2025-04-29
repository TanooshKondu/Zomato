import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-logoff',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './logoff.component.html',
  styleUrls: ['./logoff.component.css']
})
export class LogoffComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Remove token from localStorage or sessionStorage
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    
    // Redirect to login page after logging off
    this.router.navigate(['/login']);
  }
}
