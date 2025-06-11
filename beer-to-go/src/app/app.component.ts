import { Component, signal, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchEvent } from './interfaces/search-event.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CartDrawerComponent,
    ButtonModule,
    ToastModule,
    SearchBarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly router = inject(Router);
  isCartVisible = signal(false);

  private readonly ROUTES = {
    HOME: '/',
    BREWERY: '/brewery',
  } as const;

  ngOnInit(): void {
    this.resetQueryParams();
  }

  onSearch(event: SearchEvent): void {
    this.handleSearchNavigation(event);
  }

  private handleSearchNavigation(event: SearchEvent): void {
    switch (event.type) {
      case 'breweries':
        this.handleBrewerySearch(event.term);
        break;
    }
  }

  private handleBrewerySearch(searchTerm: string): void {
    const isOnHomePage = this.isCurrentRoute(this.ROUTES.HOME);
    if (!isOnHomePage) {
      this.navigateToHome();
    }

    this.updateSearchParams(searchTerm);
  }

  private isCurrentRoute(route: string): boolean {
    return this.router.url.startsWith(route);
  }

  private navigateToHome(): void {
    void this.router.navigate([this.ROUTES.HOME]);
  }

  private resetQueryParams(): void {
    this.updateSearchParams();
  }

  private updateSearchParams(term?: string): void {
    const currentUrl = this.getCurrentBaseUrl();
    const queryParams = this.buildSearchQueryParams(term);

    void this.router.navigate([currentUrl], { queryParams });
  }

  private getCurrentBaseUrl(): string {
    return this.router.url.split('?')[0];
  }

  private buildSearchQueryParams(term?: string): { search?: string } {
    return term ? { search: term } : {};
  }
}
