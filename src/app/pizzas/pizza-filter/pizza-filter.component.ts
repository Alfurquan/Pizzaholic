import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'pizza-filter',
  templateUrl: './pizza-filter.component.html',
  styleUrls: ['./pizza-filter.component.css']
})
export class PizzaFilterComponent implements OnInit {
  categories$:Observable<any[]>;
  @Input("category") category;

  constructor(private categoryService:CategoryService) { 
    this.categories$ = this.categoryService.getCategories();

  }

  ngOnInit() {
  }

}
