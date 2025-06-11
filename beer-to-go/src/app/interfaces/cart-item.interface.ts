import { Beer } from './beer.interface';

export interface Cart {
  breweryId: number;
  cartItems: CartItem[];
}

export interface CartItem {
  selectedQuantity: number;
  beer: Beer;
}
