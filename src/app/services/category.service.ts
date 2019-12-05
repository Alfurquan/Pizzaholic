import { Injectable } from '@angular/core';
import { AngularFireDatabase , AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db:AngularFireDatabase) { }

  getCategories():Observable<any[]>{
    return this.db.list("/categories").snapshotChanges().map(changes=>{
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
   });
  }
}
