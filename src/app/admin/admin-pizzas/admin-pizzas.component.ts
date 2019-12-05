import { Component, OnInit } from '@angular/core';
import { PizzaService } from 'src/app/services/pizza.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-pizzas',
  templateUrl: './admin-pizzas.component.html',
  styleUrls: ['./admin-pizzas.component.css']
})
export class AdminPizzasComponent implements OnInit {

  pizzas$ : Observable<any[]>;
  constructor(private pizzaService : PizzaService) {
    this.pizzas$ = this.pizzaService.getAll();
    console.log("pizzas",this.pizzas$);
   }

  ngOnInit() {
  }

}
