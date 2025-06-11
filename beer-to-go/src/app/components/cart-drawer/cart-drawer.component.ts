import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  Signal,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { BreweryService } from '../../services/brewery/brewery.service';
import {
  Observable,
  map,
  switchMap,
  filter,
  Subject,
  BehaviorSubject,
} from 'rxjs';
import { CartDetails } from '../../interfaces/cart-details.interface';
import { Cart } from '../../interfaces/cart-item.interface';
import { CounterComponent } from '../counter/counter.component';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule, DrawerModule, CounterComponent, ButtonModule],
  templateUrl: './cart-drawer.component.html',
  styleUrls: ['./cart-drawer.component.scss'],
})
export class CartDrawerComponent {
  @Input() visible: boolean = false;

  @Output() onHide = new EventEmitter<void>();

  private readonly cartService = inject(ShoppingCartService);
  private readonly breweryService = inject(BreweryService);

  readonly cart$: Observable<Cart | null> = this.cartService.cartChanges$;

  readonly cartDetails$: Observable<CartDetails | null> =
    this.cartService.cartChanges$.pipe(
      switchMap((cart: Cart | null) => {
        if (!cart) return Promise.resolve(null);

        return this.breweryService
          .getBreweryById$(cart.breweryId)
          .pipe(map((brewery) => (brewery ? { cart, brewery } : null)));
      }),
      filter((details): details is CartDetails => details !== null)
    );

  readonly totalPrice = computed(() => {
    const cart = this.cartService.getCart();
    if (!cart) return 0;

    return cart.cartItems.reduce(
      (total, item) => total + item.beer.price * item.selectedQuantity,
      0
    );
  });

  onQuantityChange(beerId: number, newQuantity: number): void {
    if (newQuantity === 0) {
      this.cartService.removeItem(beerId);
    } else {
      this.cartService.updateQuantity(beerId, newQuantity);
    }
  }

  updateQuantity(beerId: number, quantity: number): void {
    this.cartService.updateQuantity(beerId, quantity);
  }

  removeItem(beerId: number): void {
    this.cartService.removeItem(beerId);
  }
}
