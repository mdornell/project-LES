import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterModule,
        NavBarComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title(title: any) {
        throw new Error('Method not implemented.');
    }



}
