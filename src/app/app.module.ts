import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';
import { UserService } from './user.service';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { CategoryService } from './category.service';
import { ProductService } from './product.service';
import { CustomFormsModule } from 'ng2-validation';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { NavbarComponent } from './navbar/navbar.component';
import { ShoppingCartService } from './shopping-cart.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,

    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,

    FontAwesomeModule,
    NgbModule,
    AppRoutingModule,
  
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage  
  ],
  providers: [ 
        AuthService, 
        UserService,
        CategoryService,
        ProductService,
        ShoppingCartService
     ],
  bootstrap: [AppComponent]
})
export class AppModule { }

