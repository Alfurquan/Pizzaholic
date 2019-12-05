import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {
    @Input("cart") cart:ShoppingCart;
  constructor() { }

  ngOnInit() {
    console.log("carts",this.cart);
  }

  getPizzaIds(){
    return Object.keys(this.cart.items);
   }

   getTotalPrice(){
    let sum = 0;
    for(let pizzaId in this.cart.items){
      sum += ((this.cart.items[pizzaId].quantity)*(this.cart.items[pizzaId].pizza.price));
    }
    console.log("sum",sum);
    return sum;
  }

  getTotalQuantity(){
    let sum = 0;
    for(let pizzaId in this.cart.items){
      sum += this.cart.items[pizzaId].quantity;
    }
    console.log("sum",sum);
    return sum;
  }


}
