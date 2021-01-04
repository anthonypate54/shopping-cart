import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductFormComponent } from './admin/product-form/product-form.component';

import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

import { NavbarComponent } from './navbar/navbar.component';

import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth-guard.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CustomFormsModule } from 'ng2-validation';

import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

const appRoutes: Routes = [
    { path: '', component: ProductsComponent },
    { path: 'shopping-cart', component: ShoppingCartComponent },
    { path: 'login', component: LoginComponent },
 
    { path: 'check-out', component: CheckOutComponent, canActivate: [ AuthGuard ] },
    { path: 'order-success', component: OrderSuccessComponent, canActivate: [ AuthGuard ] },
    { path: 'my/orders', component: MyOrdersComponent, canActivate: [ AuthGuard ] },
    
    {   path: 'admin/products/new', 
        component: ProductFormComponent,
        canActivate: [ AuthGuard, AdminAuthGuard ]
     },
     {   path: 'admin/products/:id', 
        component: ProductFormComponent,
        canActivate: [ AuthGuard, AdminAuthGuard ]
    },
    { path: 'admin/products', 
    component: AdminProductsComponent, 
    canActivate: [ AuthGuard, AdminAuthGuard ] 
    },     
    { path: 'admin/orders', 
    component: AdminOrdersComponent, 
    canActivate: [ AuthGuard, AdminAuthGuard ]
    },

 { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
     
];
@NgModule({
  declarations: [
    AdminProductsComponent,
    ProductsComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
 
    ReactiveFormsModule,
    CustomFormsModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,

    RouterModule.forRoot(appRoutes),
   ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

