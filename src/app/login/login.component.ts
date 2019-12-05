import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  constructor(private authService:AuthService) { 
    
  }


  login(){
    this.authService.login();
  }
  onSubmit(f){
    this.authService.loginWithEmailandPassword(f.email,f.password);
  }
}
