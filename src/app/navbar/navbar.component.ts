import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { faHome, faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
import { AppUser } from '../models/app-user';
import { tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    home = faHome;
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
