import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { StorageService } from '../shared/service/storage.service';
import { LoginResponse } from '../shared/interface/shared-interfaces.model';

@Injectable()
export class AuthService implements OnInit {
    public isAuthenticated: boolean;

    constructor(
        private http: HttpClient,
        public router: Router,
        private storageService: StorageService,
    ) {}

    ngOnInit() {}

    login(username: string, password: string) {
        let body = new FormData();

        body.append('username', username);
        body.append('password', password);

        return this.http.post<LoginResponse>(`${environment.baseAPIUrl}/login`, body).pipe(
            tap((user) => {
                if (user && user.token) {
                    localStorage.setItem('token', JSON.stringify(user.token));
                }
            }),
        );
    }

    logout() {
        this.storageService.removeObject('token');

        this.router.navigate(['login']);
    }
}
