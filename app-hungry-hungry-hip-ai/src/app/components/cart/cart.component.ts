import { Component } from '@angular/core';
import { RestaurantService } from '../../modules/core/services/restaurant.service';
import { MenuItem } from '../../modules/core/domain/restaurant';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  constructor(private restaurantService: RestaurantService) {}

  public orderItemsInCart(): number {
    return this.restaurantService.menuItemCart().length;
  }

  public orderItemsTotal(): number {
    return this.restaurantService.menuCartTotal();
  }

  public orderItems(): MenuItem[] {
    return this.restaurantService.menuItemCart();
  }
}
