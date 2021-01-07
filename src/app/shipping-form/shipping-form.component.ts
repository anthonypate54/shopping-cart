import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
    @Input('cart') cart: ShoppingCart;
    
    shipping: any = {};
    userSubscription: Subscription;
    userId: string;
 
    constructor(
        private authService: AuthService,
        private orderService: OrderService,
        private router: Router) {}

 
    async placeOrder() {
        let result = await this.orderService.placeOrder(
            new Order(
                this.userId,
                this.shipping,
                this.cart
            )
        );
        this.router.navigate(['/order-success', result.key]);
    }  

    ngOnInit(): void {
        this.userSubscription = this.authService.user$.pipe().subscribe(user => this.userId = user.uid);
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
}
