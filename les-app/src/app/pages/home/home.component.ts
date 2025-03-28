import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        RouterOutlet,
        // CommonModule
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

    logout(): void {
        console.log('User logged out');
        localStorage.removeItem('authToken'); // Clear the token
        // Navigate to the login page or root route
        window.location.href = '';
    }
}
