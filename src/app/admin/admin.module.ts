import { NgModule } from '@angular/core';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminAuthGuard } from './components/services/admin-auth-guard.service';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';

const appRoutes: Routes = [
    
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
    }     
];

@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forChild(appRoutes),
  ],
  providers: [
    AdminAuthGuard,
  ],
  exports: [RouterModule]  
})
export class AdminModule { }
