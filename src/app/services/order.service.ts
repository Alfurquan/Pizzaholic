import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db:AngularFireDatabase) { }

  storeOrder(order){
   return this.db.list("/orders").push(order);
  }

  getOrders(){
    return this.db.list("/orders");
  }

  getOrderByUser(userId:string):AngularFireList<any>{
    return this.db.list("/orders",ref => ref.orderByChild('userId').equalTo(userId))
  }
}
