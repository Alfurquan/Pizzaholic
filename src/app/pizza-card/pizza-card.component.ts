import { Component, OnInit, Input } from '@angular/core';
import { Pizza } from '../models/pizza';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'pizza-card',
  templateUrl: './pizza-card.component.html',
  styleUrls: ['./pizza-card.component.css']
})
export class PizzaCardComponent implements OnInit {
 @Input("pizza") pizza : Pizza; 
 @Input("shopping-cart") shoppingCart;
  constructor(private shoppingCartService:ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart(){
   this.shoppingCartService.addToCart(this.pizza);
  }

  getQuantity(){
   if(!this.shoppingCart){
     return 0;
   } 
   let item = this.shoppingCart.items[this.pizza.key];
   return item ? item.quantity : 0;
  }

  removeFromCart(){
    this.shoppingCartService.removeFromCart(this.pizza);
  }


}
