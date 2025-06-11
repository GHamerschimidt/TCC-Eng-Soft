import { Injectable, signal } from '@angular/core';
import { Cart, CartItem } from '../../interfaces/cart-item.interface';
import { Beer } from '../../interfaces/beer.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private readonly STORAGE_KEY = 'cart';
  private readonly cartState = signal<Cart | null>(null);
  private cartSubject = new BehaviorSubject<Cart | null>(null);
  cartChanges$: Observable<Cart | null> = this.cartSubject.asObservable();

  constructor() {
    this.initializeCart();
  }

  getCart(): Cart | null {
    return this.cartState();
  }

  addItem(beer: Beer, brewery: { id: number }, quantity: number): void {
    if (quantity <= 0) {
      return;
    }

    const currentCart = this.cartState();
    const newItem = this.createCartItem(beer, quantity);

    if (!currentCart || currentCart.breweryId !== brewery.id) {
      const newCart = this.createNewCart(brewery.id, newItem);
      this.updateCartState(newCart);
      return;
    }

    const updatedCart = {
      ...currentCart,
      cartItems: this.updateExistingCartItems(currentCart.cartItems, newItem),
    };

    this.updateCartState(updatedCart);
  }

  removeItem(beerId: number): void {
    const currentCart = this.cartState();
    if (!currentCart) {
      return;
    }

    const updatedCart = this.removeItemFromCart(currentCart, beerId);
    this.updateCartState(updatedCart);
  }

  updateQuantity(beerId: number, quantity: number): void {
    const currentCart = this.cartState();
    if (!currentCart) {
      return;
    }

    if (quantity <= 0) {
      this.removeItem(beerId);
      return;
    }

    const updatedCart = this.updateItemQuantity(currentCart, beerId, quantity);
    this.updateCartState(updatedCart);
  }

  clearCart(): void {
    this.updateCartState(null);
  }

  private initializeCart(): void {
    const storedCart = this.retrieveCartFromStorage();
    if (this.isValidStoredCart(storedCart)) {
      this.cartState.set(storedCart);
    }
  }

  private retrieveCartFromStorage(): Cart | null {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    if (!storedData) {
      return null;
    }
    return JSON.parse(storedData);
  }

  private isValidStoredCart(cart: unknown): cart is Cart {
    if (!cart || typeof cart !== 'object') return false;
    return 'breweryId' in cart && 'cartItems' in cart;
  }

  private persistCart(cart: Cart | null): void {
    if (!cart) {
      localStorage.removeItem(this.STORAGE_KEY);
      return;
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
  }

  private updateCartState(newCart: Cart | null): void {
    this.cartState.set(newCart);
    this.cartSubject.next(newCart);
    this.persistCart(newCart);
  }

  private createNewCart(breweryId: number, item: CartItem): Cart {
    return {
      breweryId,
      cartItems: [item],
    };
  }

  private createCartItem(beer: Beer, quantity: number): CartItem {
    return {
      beer,
      selectedQuantity: quantity,
    };
  }

  private updateExistingCartItems(
    items: CartItem[],
    itemToUpdate: CartItem
  ): CartItem[] {
    const existingItem = items.find(
      (item) => item.beer.id === itemToUpdate.beer.id
    );

    if (!existingItem) {
      return [...items, itemToUpdate];
    }

    return items.map((item) =>
      item.beer.id === itemToUpdate.beer.id
        ? {
            ...itemToUpdate,
            selectedQuantity: itemToUpdate.selectedQuantity,
          }
        : item
    );
  }

  private removeItemFromCart(currentCart: Cart, beerId: number): Cart | null {
    const updatedItems = currentCart.cartItems.filter(
      (item) => item.beer.id !== beerId
    );

    if (updatedItems.length === 0) {
      return null;
    }

    return { ...currentCart, cartItems: updatedItems };
  }

  private updateItemQuantity(
    currentCart: Cart,
    beerId: number,
    newQuantity: number
  ): Cart {
    const updatedItems = currentCart.cartItems.map((item) =>
      item.beer.id === beerId
        ? { ...item, selectedQuantity: newQuantity }
        : item
    );
    return { ...currentCart, cartItems: updatedItems };
  }
}
