import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { InputTextModule } from 'primeng/inputtext';
import { Observable, combineLatest, filter, map, switchMap, take } from 'rxjs';
import { CartDetails } from '../../interfaces/cart-details.interface';
import { Cart, CartItem } from '../../interfaces/cart-item.interface';
import { BreweryService } from '../../services/brewery/brewery.service';
import { OrderService } from '../../services/order/order.service';
import { ShoppingCartService } from '../../services/shopping-cart/shopping-cart.service';
import { UserService } from '../../services/user/user.service';
import { CounterComponent } from '../counter/counter.component';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DrawerModule,
    CounterComponent,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './cart-drawer.component.html',
  styleUrls: ['./cart-drawer.component.scss'],
})
export class CartDrawerComponent {
  @Input() visible = signal(false);
  @Output() onHide = new EventEmitter<void>();

  private readonly cartService = inject(ShoppingCartService);
  private readonly breweryService = inject(BreweryService);
  private readonly userService = inject(UserService);
  private readonly orderService = inject(OrderService);

  readonly cartDetails$: Observable<CartDetails | null> =
    this.cartService.cart$.pipe(
      switchMap((cart: Cart | null) => {
        if (!cart) return Promise.resolve(null);

        return this.breweryService
          .getBreweryById$(cart.breweryId)
          .pipe(map((brewery) => (brewery ? { cart, brewery } : null)));
      }),
      filter((details): details is CartDetails => details !== null)
    );

  readonly totalPrice$ = this.cartService.cart$.pipe(
    map((cart) => {
      if (!cart) return 0;
      return cart.cartItems.reduce(
        (total, item) => total + item.beer.price * item.selectedQuantity,
        0
      );
    })
  );

  readonly userAddress$ = this.userService
    .getCurrentUser()
    .pipe(map((user) => user.address));

  onQuantityChange(beerId: number, newQuantity: number): void {
    if (newQuantity === 0) {
      this.cartService.removeItem(beerId);
      return;
    }
    this.cartService.updateQuantity(beerId, newQuantity);
  }

  removeItem(beerId: number): void {
    this.cartService.removeItem(beerId);
  }

  calculateTotal(items: CartItem[]): number {
    return items.reduce(
      (total, item) => total + item.beer.price * item.selectedQuantity,
      0
    );
  }

  finishOrder(): void {
    combineLatest([this.userService.getCurrentUser(), this.cartDetails$])
      .pipe(take(1))
      .subscribe(([user, cartDetails]) => {
        if (!user || !cartDetails) return;

        this.orderService
          .submitOrder(user.id, cartDetails)
          .subscribe((response) => {
            console.log('Ordem confirmada:', response);
            this.visible.set(false);
            this.cartService.clearCart();
          });
      });
  }
}
