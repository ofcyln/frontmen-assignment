import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { StorageService } from '../shared/service/storage.service';
import { LoginResponse } from '../shared/interface/user.model';

@Injectable()
export class AuthService implements OnInit {
    constructor(
        private http: HttpClient,
        public router: Router,
        private storageService: StorageService,
    ) {}

    ngOnInit() {}

    login(username: string, password: string) {
        return this.http
            .post<LoginResponse>(`${environment.baseAPIUrl}/login`, { username, password })
            .pipe(
                tap((response: LoginResponse) => {
                    if (response.token) {
                        this.storageService.setItem('token', response.token);
                    }
                }),
            );
    }

    logout() {
        this.storageService.removeItem('token');
    }

    isAuthenticated(): boolean {
        return this.storageService.getItem('token') !== null;
    }
}
