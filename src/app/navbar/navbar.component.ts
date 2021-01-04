import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { faHome, faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
import { AppUser } from '../models/app-user';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    home = faHome;
    appUser: AppUser;

    constructor(private auth: AuthService) { 
    }

    ngOnInit() {
        this.auth.appUser$.subscribe(appUser => this.appUser = appUser); 
    }

    logout() {
        this.auth.logout();
    }
}
