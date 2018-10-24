import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class AuthService implements OnInit {
    public isAuthenticated: boolean;

    constructor() {}

    ngOnInit() {
        this.isAuthenticated = false;
    }
}
