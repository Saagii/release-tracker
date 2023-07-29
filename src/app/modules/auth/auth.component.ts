import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {

    isLoginPage: boolean = false;

    constructor() {
        if(window.location.href.includes('/login')) {
            this.isLoginPage = true;
        }
    }

    ngOnInit(): void {
        console.log('onInit loaded');
    }

}