import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$;
  user : any;
  constructor(
    private authService:AuthService,
    private orderService:OrderService
  ) { 
     
   this.user = localStorage.getItem("uid")
   console.log("user",this.user);
   this.orders$ = orderService.getOrderByUser(this.user).valueChanges();
  }

  ngOnInit() {
  }

}
