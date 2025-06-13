import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EMPTY, Observable, catchError, map, pipe, switchMap } from 'rxjs';
import { BeerCardComponent } from '../../components/beer-card/beer-card.component';
import { NotFoundError } from '../../errors/not-found.error';
import { Beer, BeerTypeGroup } from '../../interfaces/beer.interface';
import { Brewery } from '../../interfaces/brewery.interface';
import { BeerService } from '../../services/beer/beer.service';
import { BreweryService } from '../../services/brewery/brewery.service';
import { AddToCartComponent } from '../../components/add-to-cart/add-to-cart.component';

@Component({
  selector: 'app-brewery',
  standalone: true,
  imports: [CommonModule, BeerCardComponent, AddToCartComponent],
  templateUrl: './brewery.component.html',
  styleUrl: './brewery.component.scss',
})
export class BreweryComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private breweryService = inject(BreweryService);
  private beerService = inject(BeerService);

  brewery$: Observable<Brewery> = this.route.paramMap.pipe(
    this.getBreweryFromRoute()
  );
  groupedBeers$: Observable<BeerTypeGroup[]> = this.getGroupedBeersByType();

  isAddToCartVisible: boolean = false;
  currentSelectedBeer?: Beer;

  showAddToCart(beer: Beer): void {
    this.currentSelectedBeer = beer;
    this.isAddToCartVisible = true;
  }

  closeAddToCart(): void {
    this.isAddToCartVisible = false;
  }

  private getBreweryFromRoute() {
    return pipe(
      map(this.extractBreweryId),
      switchMap((id) => this.getBreweryById(id)),
      map(this.validateBreweryExists),
      catchError(this.handleBreweryError.bind(this))
    );
  }

  private extractBreweryId(params: ParamMap): number {
    const id = params.get('id');
    if (!id) {
      throw new NotFoundError('Cervejaria', 'com ID inválido');
    }
    return Number(id);
  }

  private getBreweryById(id: number): Observable<Brewery | undefined> {
    return this.breweryService.getBreweryById$(id);
  }

  private validateBreweryExists(brewery: Brewery | undefined): Brewery {
    if (!brewery) {
      throw new NotFoundError('Cervejaria');
    }
    return brewery;
  }

  private handleBreweryError(error: unknown): Observable<never> {
    if (error instanceof NotFoundError) {
      this.router.navigate(['/home']);
      return EMPTY;
    }
    throw error;
  }

  private getGroupedBeersByType(): Observable<BeerTypeGroup[]> {
    return this.brewery$.pipe(
      switchMap((brewery) =>
        this.beerService.groupBeersByType$(brewery.beerCatalog)
      )
    );
  }
}
