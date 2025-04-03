import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        RouterOutlet,
        CommonModule
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

    isSubmenuVisible: boolean = false;

    logout(): void {
        console.log('User logged out');
        localStorage.removeItem('authToken'); // Clear the token
        // Navigate to the login page or root route
        window.location.href = '';
    }


    toggleSubmenu($event: Event): void {
        $event.preventDefault(); // Prevent default link behavior
        this.isSubmenuVisible = !this.isSubmenuVisible;
    }

    closeSubmenu(): void {
        this.isSubmenuVisible = false;
    }

}
