import { Injectable,Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/observable/of';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './user.service';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();
 user$ : Observable<firebase.User>;
   user : any;
   isEmail:boolean=false;
  constructor(private afAuth:AngularFireAuth,private route:Router,private userService:UserService) { 
    this.user$ = afAuth.authState;
    console.log("user1",this.user$);
      this.afAuth.authState.subscribe(user=>{
        if (user){
          console.log("user",user);
          console.log("isEmail",this.isEmail);
          this.user = user;
          localStorage.setItem("uid",this.user.uid);
          localStorage.setItem('user', JSON.stringify(this.user));
        } else {
          localStorage.setItem('user', null);
        }
      })
  }


  login(){
  //  let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
   localStorage.setItem("returnUrl","/");
    // this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res=>{
      this.route.navigate(['/pizzas']);
      this.isEmail=false;
      this.fireIsLoggedIn.emit();
    });
   
  }

  getEmitter() {
    return this.fireIsLoggedIn;
  }
  isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
}

  logout(){
    this.afAuth.auth.signOut();
    localStorage.removeItem("user");
    this.route.navigate(["/"])
  }
  loginWithEmailandPassword(email,password){
  
     this.afAuth.auth.signInWithEmailAndPassword(email,password).then(res=>{
          this.isEmail = true;
          this.fireIsLoggedIn.emit();
          this.route.navigate(['/pizzas']);     
    }).catch(err=>{
      alert("User not found");
    })
  }

  registerWithEmailAndPassword(email,password,name){
    this.afAuth.auth.createUserWithEmailAndPassword(email,password).then(res=>{
        console.log("res",res);
        this.userService.saveOnEmailRegistration(res.user,email,name);
        this.route.navigate(['/pizzas']);
        this.isEmail = true;
        this.fireIsLoggedIn.emit();

    });
  }

  get appUser$():Observable<AppUser>{
    return this.user$.switchMap(user=>
        // if(user){
        //   this.userService.get(user.uid).valueChanges();
        // }else{
        //   return Observable.of(null);
        // }
        this.userService.get(user.uid).valueChanges()
    )
      
  }
}
