import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartDetails } from '../../interfaces/cart-details.interface';
import { OrderResponse } from '../../interfaces/order-response.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  submitOrder(
    userId: string,
    cartDetails: CartDetails
  ): Observable<OrderResponse> {
    console.log('Ordem Enviada:', {
      userId,
      breweryId: cartDetails.brewery.id,
      breweryName: cartDetails.brewery.name,
      items: cartDetails.cart.cartItems.map((item) => ({
        beerId: item.beer.id,
        name: item.beer.name,
        quantity: item.selectedQuantity,
        unitPrice: item.beer.price,
        totalPrice: item.beer.price * item.selectedQuantity,
      })),
      totalOrderAmount: cartDetails.cart.cartItems.reduce(
        (total, item) => total + item.beer.price * item.selectedQuantity,
        0
      ),
    });

    const expectedArrival = this.getMockExpectedArrival();

    return of({
      orderId: `ORD-${Date.now()}`,
      status: 'confirmed',
      timestamp: new Date().toISOString(),
      expectedArrival: expectedArrival.toISOString(),
    });
  }

  private getMockExpectedArrival() {
    const expectedArrival = new Date();
    expectedArrival.setHours(
      expectedArrival.getHours() + 1,
      expectedArrival.getMinutes() + 30
    );
    return expectedArrival;
  }
}
