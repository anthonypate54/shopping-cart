import { NgModule } from '@angular/core';
import { ProductsComponent } from './shopping/products/products.component';
import { ShoppingCartComponent } from './shopping/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './shopping/components/check-out/check-out.component';
import { OrderSuccessComponent } from './shopping/order-success/order-success.component';
import { MyOrdersComponent } from './shopping/my-orders/my-orders.component';
import { ProductFilterComponent } from './shopping/products/product-filter/product-filter.component';
import { ShoppingCartSummaryComponent } from './shopping/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shopping/shipping-form/shipping-form.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'app/core/components/login/login.component';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { PageNotFoundComponent } from 'app/core/components/page-not-found/page-not-found.component';
import { SharedModule } from 'shared/shared.module';
import { AdminModule } from 'app/admin/admin.module';
import { AuthService } from 'shared/services/auth.service';

const appRoutes: Routes = [
    { path: '', component: ProductsComponent },
    { path: 'shopping-cart', component: ShoppingCartComponent },
    { path: 'login', component: LoginComponent },
 
    { path: 'check-out', component: CheckOutComponent, canActivate: [ AuthGuard ] },
    { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [ AuthGuard ] },
    { path: 'my/orders', component: MyOrdersComponent, canActivate: [ AuthGuard ] },
    
 { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
     
];

@NgModule({
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,

  ],
  imports: [
    SharedModule,
    AdminModule,

    RouterModule.forChild(appRoutes),  
  ],
  providers: [
      AuthService,
  ],
exports: [RouterModule]
})
export class ShoppingModule { }
