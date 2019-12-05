import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PizzasComponent } from './pizzas/pizzas.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminPizzasComponent } from './admin/admin-pizzas/admin-pizzas.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './services/auth.service';
import { AuthGuardService as AuthGuard, AuthGuardService } from './services/auth-guard.service';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { UserService } from './services/user.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { PizzaFormComponent } from './admin/pizza-form/pizza-form.component';
import { CategoryService } from './services/category.service';
import { PizzaService } from './services/pizza.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { PizzaFilterComponent } from './pizzas/pizza-filter/pizza-filter.component';
import { PizzaCardComponent } from './pizza-card/pizza-card.component';
import { ShoppingCartService } from './services/shopping-cart.service';
import { OrderService } from './services/order.service';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PizzasComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminPizzasComponent,
    AdminOrdersComponent,
    LoginComponent,
    RegisterComponent,
    PizzaFormComponent,
    PizzaFilterComponent,
    PizzaCardComponent,
    ShoppingCartSummaryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgbModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      { path:"",component:HomeComponent },
      { path:"pizzas",component:PizzasComponent },
      { path:"shopping-cart",component:ShoppingCartComponent },
      { path:"check-out",component:CheckOutComponent,canActivate:[
        AuthGuardService
      ]},
      { path:"order-success/:id",component:OrderSuccessComponent,
      // canActivate:[
      //   AuthGuardService
      // ]
     },
      { path:"login",component:LoginComponent },
      { path:"register",component:RegisterComponent },
      { path:"my/orders",component:MyOrdersComponent ,canActivate:[
        AuthGuardService
      ]},
      { path:"admin/pizzas",component:AdminPizzasComponent,canActivate:[
        AuthGuardService,
        AdminAuthGuardService
      ] },
      { path:"admin/orders",component:AdminOrdersComponent,canActivate:[
        AuthGuardService,
        AdminAuthGuardService
      ] },
      { path:"admin/pizza/new",component:PizzaFormComponent,canActivate:[
        AuthGuardService,
        AdminAuthGuardService
      ] },
      { path:"admin/pizza/:id",component:PizzaFormComponent,canActivate:[
        AuthGuardService,
        AdminAuthGuardService
      ] }

    ])
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    CategoryService,
    PizzaService,
    AngularFirestore,
    ShoppingCartService,
    AngularFireDatabase,
    AdminAuthGuardService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
