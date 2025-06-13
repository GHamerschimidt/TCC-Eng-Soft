import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Beer } from '../../interfaces/beer.interface';
import { Brewery } from '../../interfaces/brewery.interface';
import { Cart, CartItem } from '../../interfaces/cart-item.interface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private readonly STORAGE_KEY = 'cart';
  private readonly cartSubject = new BehaviorSubject<Cart | null>(
    this.loadInitialCart()
  );

  readonly cart$ = this.cartSubject.asObservable();

  addItem(beer: Beer, breweryId: number, quantity: number): void {
    if (quantity <= 0) return;

    const currentCart = this.cartSubject.getValue();
    const newItem: CartItem = { beer, selectedQuantity: quantity };

    if (!currentCart || currentCart.breweryId !== breweryId) {
      this.updateCart(this.createNewCart(breweryId, newItem));
      return;
    }

    const updatedItems = this.mergeCartItems(currentCart.cartItems, newItem);
    this.updateCart({ ...currentCart, cartItems: updatedItems });
  }

  removeItem(beerId: number): void {
    const currentCart = this.cartSubject.getValue();
    if (!currentCart) return;

    const updatedItems = currentCart.cartItems.filter(
      (item) => item.beer.id !== beerId
    );

    updatedItems.length === 0
      ? this.clearCart()
      : this.updateCart({ ...currentCart, cartItems: updatedItems });
  }

  updateQuantity(beerId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(beerId);
      return;
    }

    this.cart$
      .pipe(
        map((cart) => {
          if (!cart) return null;

          const updatedItems = cart.cartItems.map((item) =>
            item.beer.id === beerId
              ? { ...item, selectedQuantity: quantity }
              : item
          );

          return { ...cart, cartItems: updatedItems };
        })
      )
      .subscribe((updatedCart) => {
        if (updatedCart) this.updateCart(updatedCart);
      });
  }

  clearCart(): void {
    this.updateCart(null);
  }

  private createNewCart(breweryId: number, item: CartItem): Cart {
    return {
      breweryId,
      cartItems: [item],
    };
  }

  private mergeCartItems(
    existingItems: CartItem[],
    newItem: CartItem
  ): CartItem[] {
    const existingItemIndex = existingItems.findIndex(
      (item) => item.beer.id === newItem.beer.id
    );

    if (existingItemIndex === -1) {
      return [...existingItems, newItem];
    }

    return existingItems.map((item, index) =>
      index === existingItemIndex ? newItem : item
    );
  }

  private loadInitialCart(): Cart | null {
    const storedCart = localStorage.getItem(this.STORAGE_KEY);
    if (!storedCart) return null;

    const parsedCart = JSON.parse(storedCart);
    return this.isValidCart(parsedCart) ? parsedCart : null;
  }

  private isValidCart(cart: unknown): cart is Cart {
    return (
      cart !== null &&
      typeof cart === 'object' &&
      'breweryId' in cart &&
      'cartItems' in cart
    );
  }

  private persistCart(cart: Cart | null): void {
    cart
      ? localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart))
      : localStorage.removeItem(this.STORAGE_KEY);
  }

  private updateCart(cart: Cart | null): void {
    this.persistCart(cart);
    this.cartSubject.next(cart);
  }
}
