import { Component, OnInit, OnDestroy } from '@angular/core';
import { PizzaService } from '../services/pizza.service';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Pizza } from '../models/pizza';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.css']
})
export class PizzasComponent implements OnInit,OnDestroy {
  // pizzas$:Observable<any[]>;
  pizzas : Pizza[] = [];
  filteredPizzas : Pizza[]
  category:string;
  cart : any;
  subscription : Subscription;
  constructor(private pizzaService:PizzaService,private route:ActivatedRoute,private shoppingCartService:ShoppingCartService) { 
  
  
    this.pizzaService.getAll().subscribe(pizzas=>{
     this.pizzas = pizzas;
     console.log("pizzas",this.pizzas);
     this.route.queryParamMap.subscribe(params=>{
      this.category = params.get("category")
      console.log("cate",this.category);
      this.filteredPizzas = (this.category) ? 
      this.pizzas.filter(p=> p.category === this.category) :
      this.pizzas;
      console.log("fPizzas",this.filteredPizzas);
  });
   })
    
   
  }

 async ngOnInit() {
 this.subscription = (await this.shoppingCartService.getCart()).valueChanges().subscribe(cart => this.cart = cart)

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
