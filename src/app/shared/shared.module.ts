import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CustomFormsModule } from 'ng2-validation';
import { ProductCardComponent } from 'shared/components/product-card.component';
import { ProductQuantityComponent } from 'shared/components/product-quantity/product-quantity.component';

import { AuthGuard } from 'shared/services/auth-guard.service';
import { AuthService } from 'shared/services/auth.service';
import { CategoryService } from 'shared/services/category.service';
import { OrderService } from 'shared/services/order.service';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { UserService } from 'shared/services/user.service';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
   ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    NgbModule,
 
    ReactiveFormsModule,
    CustomFormsModule,
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFirestoreModule, // storage  


  ],
  exports: [
    CommonModule,
    ProductCardComponent,
    ProductQuantityComponent,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    BrowserModule,
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFirestoreModule, // storage  
    NgbModule,
  ],

  providers: [
    AuthGuard,
    AuthService, 
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService

  ],
})
export class SharedModule { }
