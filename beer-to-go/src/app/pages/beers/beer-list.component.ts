import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BeerCardComponent } from '../../components/beer-card/beer-card.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { AddToCartComponent } from '../../components/add-to-cart/add-to-cart.component';
import { Beer, BeerTypeGroup } from '../../interfaces/beer.interface';
import { BeerService } from '../../services/beer/beer.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BeerTypes } from '../../enum/beer-types.enum';
import { CardVariant } from '../../components/card/type/card.variant';

@Component({
  selector: 'app-beer-list',
  standalone: true,
  imports: [
    CommonModule,
    BeerCardComponent,
    LoadingSpinnerComponent,
    AddToCartComponent,
  ],
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.scss'],
})
export class BeerListComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly beerService = inject(BeerService);

  isAddToCartVisible = signal(false);
  currentSelectedBeer = signal<Beer | undefined>(undefined);
  selectedBreweryId = computed(() => this.currentSelectedBeer()?.breweryId);

  beerCardVariant: CardVariant = CardVariant.DetailedCardButton;

  groupedBeers$: Observable<BeerTypeGroup[]> = this.route.queryParams.pipe(
    switchMap((params) =>
      this.beerService.getBeers$(params['search'], params['type'] as BeerTypes)
    ),
    switchMap((beers) => this.beerService.groupBeersByType$(beers))
  );

  showAddToCart(beer: Beer): void {
    this.currentSelectedBeer.set(beer);
    this.isAddToCartVisible.set(true);
  }

  closeAddToCart(): void {
    this.isAddToCartVisible.set(false);
  }
}
