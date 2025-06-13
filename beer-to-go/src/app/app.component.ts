import { Component, signal, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchEvent } from './interfaces/search-event.interface';
import { BeerTypes } from './enum/beer-types.enum';
import { SearchParams } from './interfaces/query-params.interface';
import * as _ from 'lodash';

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
    BEERS: '/beers',
  } as const;

  ngOnInit(): void {
    this.resetQueryParams();
  }

  onSearch(event: SearchEvent): void {
    this.handleSearchNavigation(event);
  }
  private handleSearchNavigation(event: SearchEvent): void {
    if (event.type === 'breweries') {
      this.handleBrewerySearch(event.term);
      return;
    }

    if (event.type === 'beers') {
      this.handleBeerSearch(event.term);
      return;
    }

    if (Object.values(BeerTypes).includes(event.type as BeerTypes)) {
      this.handleBeerSearch(event.term, event.type as BeerTypes);
      return;
    }
  }

  private handleBrewerySearch(searchTerm: string): void {
    const isOnHomePage = this.isCurrentRoute(this.ROUTES.HOME);
    if (!isOnHomePage) {
      void this.router.navigate([this.ROUTES.HOME]);
    }

    void this.router.navigate([this.ROUTES.HOME], {
      queryParams: this.createSearchParams(searchTerm),
    });
  }

  private handleBeerSearch(searchTerm: string, beerType?: BeerTypes): void {
    void this.router.navigate([this.ROUTES.BEERS], {
      queryParams: this.createSearchParams(searchTerm, beerType),
    });
  }

  private createSearchParams(
    searchTerm?: string,
    beerType?: BeerTypes
  ): SearchParams {
    const searchParams: SearchParams = { search: searchTerm, type: beerType };
    return _.omitBy(searchParams, _.isNull);
  }

  private resetQueryParams(): void {
    void this.router.navigate([this.router.url.split('?')[0]]);
  }

  private isCurrentRoute(route: string): boolean {
    return this.router.url.startsWith(route);
  }
}
