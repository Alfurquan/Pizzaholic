import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { PizzaService } from 'src/app/services/pizza.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-pizza-form',
  templateUrl: './pizza-form.component.html',
  styleUrls: ['./pizza-form.component.css']
})
export class PizzaFormComponent implements OnInit {
  categories$;
  pizza = {};
  pizzaOne={};
  id;
  constructor(categoryService:CategoryService,private pizzaService:PizzaService,private router:Router,private route:ActivatedRoute) {
    this.categories$ = categoryService.getCategories();
    console.log("categories",this.categories$);

    this.id = this.route.snapshot.paramMap.get("id");
    console.log("id",this.id);
    console.log("typeId",typeof(this.id));
    if(this.id){
      this.pizzaService.get(this.id).take(1).subscribe(p => {
        this.pizza = p
        console.log("getPizza",this.pizza);
      });
      this.pizzaService.getPizzaById(this.id).take(1).subscribe(p1=>{
          this.pizzaOne = p1;
          console.log("getPizzaone",this.pizzaOne);
      })
    }
   }

  ngOnInit() {
  }

  save(pizza){
    if(this.id){
      this.pizzaService.update(this.id,pizza);
    }else{
      console.log("pizzac",pizza);
      this.pizzaService.create(pizza);
    }
    this.router.navigate(["/admin/pizzas"]);
  }
  delete(){
    // console.log("sendPizza",pizza);
    if(!confirm("Are you sure you want to delete?")){
      return;
    }else{
      this.pizzaService.delete(this.id)
      this.router.navigate(["/admin/pizzas"]);
    }
  }

}
