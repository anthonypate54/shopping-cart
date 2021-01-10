import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

    constructor(private authService: AuthService) { 
    }

    login() {
        console.log('AT LOGIN COMPONENT');
        this.authService.login();
    }
 }
