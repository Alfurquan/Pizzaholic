import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  appUser : AppUser;
  shoppingCartItemCount : number = 0;
  constructor(public authService:AuthService,private shoppingCartService:ShoppingCartService) {
     authService.appUser$.subscribe(appUser => {
       this.appUser = appUser;
       console.log("app",this.appUser);
     });
   }

  async ngOnInit(){
     this.authService.getEmitter().subscribe(res=>{
      this.authService.appUser$.subscribe(appUser => {
        this.appUser = appUser;
        console.log("app",this.appUser);
       });
     })

      this.shoppingCartService.getEmitter().subscribe(res=>{
         this.updateCount()
     })
    
   }

  logout(){
      this.authService.logout();
  }

  async updateCount(){
    let cart$ = (await this.shoppingCartService.getCart()).valueChanges();
    cart$.subscribe(cart=>{
      console.log("called");
      this.shoppingCartItemCount = 0;
      if(cart!=null){
        for(let pizzaId in cart.items){
          this.shoppingCartItemCount +=  cart.items[pizzaId].quantity;
        }
      }
      console.log("count",this.shoppingCartItemCount);
    })
  }





}
