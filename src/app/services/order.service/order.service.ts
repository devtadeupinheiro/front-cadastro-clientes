import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '@models/order';
import { Observable } from 'rxjs';

@Service()
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/';

  getListOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}service`);
  }

  updateOrder(id: number, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}order/${id}`, order);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}order`, order);
  }
}
