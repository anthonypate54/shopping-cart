import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrderListComponent } from './components/shopping/order-list/order-list.component';
import { LoginComponent } from './components/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent,
    OrderListComponent,
    LoginComponent,

  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule.forChild([]),

  ],
  exports: [
    NavbarComponent 
  ]
})
export class CoreModule { }
