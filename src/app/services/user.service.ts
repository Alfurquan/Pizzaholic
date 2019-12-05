import { Injectable } from '@angular/core';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db:AngularFireDatabase) { }

  save(user:firebase.User){
    this.db.object("/users/" + user.uid).update({
      name : user.displayName,
      email : user.email
    });
  }

  saveOnEmailRegistration(user:firebase.User,email,name){
    this.db.object("/users/" + user.uid).update({
      name : name,
      email : email,
      isAdmin : false
    });
  }

  get(uid:string):AngularFireObject<AppUser>{
    return this.db.object("/users/" + uid);
  }
}
