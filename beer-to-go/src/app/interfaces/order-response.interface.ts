export interface OrderResponse {
  orderId: string;
  status: 'confirmed' | 'failed';
  timestamp: string;
  expectedArrival: string;
}
