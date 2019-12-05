import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(auth:AuthService,router:Router,private userService:UserService){
      auth.user$.subscribe(user=>{
        if(user){
          console.log("isEE",auth.isEmail);
          if(auth.isEmail == false){
            userService.save(user);
          }
          let returnUrl = localStorage.getItem("returnUrl");
          router.navigateByUrl(returnUrl);
        }
      });
  }
}
