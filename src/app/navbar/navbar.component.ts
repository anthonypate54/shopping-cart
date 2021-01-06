import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { faHome, faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
import { AppUser } from '../models/app-user';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    home = faHome;
    appUser: AppUser;
    shoppingCartItemCount: number;

    constructor(private auth: AuthService,
        private cartService: ShoppingCartService) { 

    }

    async ngOnInit() {
        this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
        let cart$ = await this.cartService.getCart();
        cart$.pipe(

        ).subscribe(cart => {
            this.shoppingCartItemCount = 0;
            for(let productId in cart.items) {
                this.shoppingCartItemCount += cart.items[productId].quantity
            }
        });
    }

    logout() {
        this.auth.logout();
     }
}
