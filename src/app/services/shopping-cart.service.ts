import { Injectable, Output ,EventEmitter} from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Pizza } from '../models/pizza';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  @Output() cartModified : EventEmitter<any> = new EventEmitter<any>();

  constructor(private db:AngularFireDatabase) { }

 private create(){
   return this.db.list("/shopping-carts").push({
      dateCreated : new Date().getTime()
    })
  }

  async getCart() : Promise<AngularFireObject<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId(); 
    return this.db.object("/shopping-carts/" + cartId);
  }

  getEmitter(){
    return this.cartModified;
  }

 private async getOrCreateCartId(){
    let cartId = localStorage.getItem("cartId");
    if(!cartId){
      let result = await this.create();
      localStorage.setItem("cartId",result.key);
      return result.key;
    }
      return cartId;
  }

  async addToCart(pizza:Pizza){
      this.updateItemQuantity(pizza,1).then(()=>{
       
      });
      
  }
 async removeFromCart(pizza:Pizza){
    this.updateItemQuantity(pizza,-1).then(()=>{
    
    });
  }
  
  private async updateItemQuantity(pizza:Pizza,change:number){
    let cartId = await this.getOrCreateCartId()
    let item$$ = this.db.object("/shopping-carts/" + cartId + "/items/" + pizza.key);
    let items$ :Observable<any>= this.db.object("/shopping-carts/" + cartId + "/items/" + pizza.key).valueChanges();
    items$.take(1).subscribe(item =>{
     
        if( item === null ) {
          item$$.set({pizza:pizza, quantity: 1});
          console.log('adding new product to cart');
          this.cartModified.emit();
      }else{
        let quantity = item.quantity + change;
        if(quantity === 0){
          item$$.remove();
        }else{
          item$$.update({quantity: quantity});
          console.log('updating exisiting product ');  
          this.cartModified.emit();  
      } 
    }
    })
  }

 async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object("/shopping-carts/" + cartId + "/items").remove();
  }
}


