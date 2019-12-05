import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
 cart$;
 cart : ShoppingCart;
 shoppingCartItemCount : number;
  constructor(private shoppingCartService: ShoppingCartService) { }

 async ngOnInit() {
   this.cart$ = (await this.shoppingCartService.getCart()).valueChanges();
   this.cart$.subscribe(cart=>{
    this.cart = cart; 
    console.log("this.cart",this.cart);
    this.shoppingCartItemCount = 0;
    if(this.cart!=null){
      for(let pizzaId in this.cart.items){
        this.shoppingCartItemCount +=  cart.items[pizzaId].quantity;
        }
    }
  })
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

  
}
