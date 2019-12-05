import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor(private db:AngularFireDatabase) { }

  create(pizza){
    return this.db.list("/pizzas").push(pizza);
  }

  getAll():Observable<any[]>{
   return this.db.list("/pizzas").snapshotChanges().map(changes=>{
       return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    });
  }

  getAllPizzas():Observable<any[]>{
    return this.db.list("/pizzas").valueChanges();
  }

  get(pizzaId):Observable<any>{
    console.log("pizzaId",pizzaId);
    return this.db.object("/pizzas/" + pizzaId).valueChanges();
  // return this.db.object("/pizzas/" + pizzaId).snapshotChanges().map(changes=>{
  //   const $key = changes.key;
  //   const data = { $key, $value: changes.payload.val() };
  //   return data;
  //   }); 
  }

  getPizzaById(pizzaId):Observable<any>{
    return this.db.object("/pizzas/" + pizzaId).snapshotChanges().map(changes=>{
    const $key = changes.key;
    const data = { $key, $value: changes.payload.val() };
    return data;
    }); 
  }

  update(pizzaId,pizza){
   return this.db.object("/pizzas/" + pizzaId).update(pizza);
  }

  delete(id){
    console.log("id",id);
    // console.log("pId",pizza.$key)
    // console.log("type",typeof(pizza.$key));
    // console.log("obj",this.db.object("/pizzas/" + pizza.$key));
    // console.log("list",this.db.list("pizzas"))
     return this.db.object("/pizzas/" + id).remove();
   // return this.db.list("pizzas").remove(id);
  }

  // delete(pizza){
  //   console.log("pId",pizza.$key)
  //   console.log("pizzaRec",pizza);
  //   console.log("type",typeof(pizza.$key));
  //   console.log("doc",this.firestore.collection("pizzas").doc(pizza.$key));
  //   this.firestore.collection("pizzas").doc(pizza.$key).delete();
  // }
}
