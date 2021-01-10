import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    appUser: AppUser;
    cart$: Observable<ShoppingCart>;

    constructor(private auth: AuthService,
        private cartService: ShoppingCartService) { 

    }

    async ngOnInit() {
        this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
        this.cart$ = await this.cartService.getCart();
    }

    logout() {
        this.auth.logout();
     }
}
