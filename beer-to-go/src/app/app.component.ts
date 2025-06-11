import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CartDrawerComponent, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isCartVisible = signal(false);
}
