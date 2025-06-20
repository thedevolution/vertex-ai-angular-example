import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem, Restaurant } from '../domain/restaurant';
import { Order } from '../domain/order';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  
  constructor(private http: HttpClient) { }

  public getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>('http://localhost:5279/Restaurants');
  }

  public getMyRecentOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('http://localhost:5279/Restaurants/GetMyRecentOrders');
  }

  readonly menuItemCart = signal<MenuItem[]>([]);

  readonly menuCartTotal = computed(() => {
    return this.getCart().reduce((total, menuItem) => {
      return total + menuItem.price;
    }, 0);
  });
  
  getCart(): MenuItem[] {
    return this.menuItemCart();
  }

  addToCart(menuItem: MenuItem) {
    this.menuItemCart.update((cart) => [...cart, menuItem]);
  }

  addAllToCart(menuItems: MenuItem[]) {
    menuItems?.forEach(mi => this.addToCart(mi));
  }
}
