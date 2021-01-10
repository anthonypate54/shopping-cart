import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'shared/shared.module';

import { environment } from '../environments/environment';
import { LoginComponent } from 'app/core/components/login/login.component';
import { AdminModule } from './admin/admin.module';
import { AdminAuthGuard } from './admin/components/services/admin-auth-guard.service';
import { AppComponent } from './app.component';

import { ProductsComponent } from './core/components/shopping/products/products.component';
import { ShoppingModule } from './core/components/shopping.module';
import { CoreModule } from './core/core.module';

const appRoutes: Routes = [
    { path: '', component: ProductsComponent },
    { path: 'login', component: LoginComponent },     
];

@NgModule({
  declarations: [
    AppComponent,
    ],
  imports: [
    SharedModule,
    ShoppingModule,
    AdminModule,
    CoreModule,
  
    AngularFireModule.initializeApp(environment.firebaseConfig),
    RouterModule.forRoot(appRoutes), 
  ],
  providers: [ 
        AdminAuthGuard,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }

