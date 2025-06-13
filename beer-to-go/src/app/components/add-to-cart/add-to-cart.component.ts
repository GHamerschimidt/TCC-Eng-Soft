import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Beer } from '../../interfaces/beer.interface';
import { Dialog, DialogModule } from 'primeng/dialog';
import { CounterComponent } from '../counter/counter.component';
import { ButtonModule } from 'primeng/button';
import { BeerCardComponent } from '../beer-card/beer-card.component';
import { CardVariant } from '../card/type/card.variant';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { Router } from '@angular/router';
import { BreweryService } from '../../services/brewery/brewery.service';

@Component({
  selector: 'app-add-to-cart',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    CounterComponent,
    ButtonModule,
    BeerCardComponent,
  ],
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
})
export class AddToCartComponent implements OnChanges {
  @Input({ required: false }) beer?: Beer;
  @Input({ required: true }) visible: boolean = false;
  @Input({ required: false }) detailed: boolean = false;
  @Output() onHide = new EventEmitter<void>();

  selectedNumberOfItems = signal(0);
  totalPrice = computed(
    () => this.selectedNumberOfItems() * (this.beer?.price ?? 0)
  );

  brewery = computed(() =>
    this.breweryService.getBreweryById(this.beer!.breweryId)
  );

  readonly beerCardVariant = CardVariant.Borderless;

  private readonly cartService = inject(ShoppingCartService);
  private readonly router = inject(Router);
  private readonly breweryService = inject(BreweryService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['beer']) {
      this.clearSelectedNumberOfItems();
    }
  }

  navigateToBrewery(): void {
    this.router.navigate(['/brewery', this.beer!.breweryId]);
  }

  addToCart(): void {
    if (!this.beer || this.selectedNumberOfItems() <= 0) {
      return;
    }

    this.cartService.addItem(
      this.beer,
      this.beer.breweryId,
      this.selectedNumberOfItems()
    );
    this.closeDialog();
  }

  closeDialog(): void {
    this.clearSelectedNumberOfItems();
    this.onHide.emit();
  }

  private clearSelectedNumberOfItems(): void {
    this.selectedNumberOfItems.set(0);
  }
}
