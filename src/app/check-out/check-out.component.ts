import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit,OnDestroy {
  shipping ={};
  cart : ShoppingCart;
  items = [];
  totalPrice:number=0;
  userId :String;
  totalQuantity:number=0;

  subscription : Subscription;

  constructor(
    private router:Router,
    private shoppingCartService:ShoppingCartService,
    private orderService:OrderService,
    private authService:AuthService) { }

 async ngOnInit() {
   let cart$ = (await this.shoppingCartService.getCart()).valueChanges();
   this.subscription = cart$.subscribe(cart=>this.cart = cart)
   this.authService.user$.subscribe(user=>{
      this.userId = user.uid;
   })
  }

  async save(f){
    console.log("type",typeof(this.cart.items));
    console.log("cart-items",this.cart.items);
    for(let item in this.cart.items){
      console.log("item",item);
      this.items.push(item);
    }
    this.getTotalPrice()
    this.getTotalQuantity();
    console.log("type",typeof(this.items));
    console.log("items",this.items);
     let order = {
      userId:this.userId, 
      datePlaced : new Date().getTime(),
      shipping : f ,
      items: this.cart.items,
      totalQuantity : this.totalQuantity,
      totalPrice : this.totalPrice
      // items : this.items.map(i=>{
      //   console.log("i",i);
      //   return{
      //     pizza : {
      //         title : i.pizza.title,
      //         imageUrl : i.pizza.imageUrl,
      //         price : i.pizza.price
      //     },
      //     quantity : i.quantity,
      //     totalPrice : i.totalPrice
      //   }
      // })    
    };
    let result = await this.orderService.storeOrder(order);
    this.shoppingCartService.clearCart();
    this.router.navigate(["/order-success",result.key]);
  }
  getPizzaIds(){
    return Object.keys(this.cart.items);
   }

   getTotalPrice(){
  
    for(let pizzaId in this.cart.items){
      this.totalPrice += ((this.cart.items[pizzaId].quantity)*(this.cart.items[pizzaId].pizza.price));
    }
    console.log("sum",this.totalPrice);
  }

  getTotalQuantity(){
    for(let pizzaId in this.cart.items){
      this.totalQuantity += this.cart.items[pizzaId].quantity;
    }
    console.log("sum",this.totalQuantity);
  }
 
  ngOnDestroy(){
  this.subscription.unsubscribe();
  }

 

}
