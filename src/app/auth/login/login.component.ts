import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { AlertService } from '../../shared/alert/alert.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    public username: string;
    public model: any = {};
    public loading = false;
    public returnUrl: string;
    public animationActive: boolean;

    constructor(
        public router: Router,
        private route: ActivatedRoute,
        private authenticationService: AuthService,
        private alertService: AlertService,
    ) {}

    ngOnInit() {
        this.authenticationService.logout();

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/jokes';
    }

    login() {
        this.loading = true;
        this.animationActive = !this.animationActive;

        this.authenticationService.login(this.model.username, this.model.password).subscribe(
            (response) => {
                this.router.navigate([this.returnUrl]);
            },
            (error) => {
                this.alertService.error(error.error.code);

                this.loading = false;
                this.animationActive = false;
            },
        );
    }
}
