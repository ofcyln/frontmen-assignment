import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { AlertService } from '../../core/alert/alert.service';
import { LoginResponse } from '../../shared/interface/user.model';

export interface StringBooleanPair {
    [key: string]: boolean;
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;

    public loading: boolean = false;
    public returnUrl: string;
    public animationActive: boolean;

    constructor(
        public router: Router,
        private route: ActivatedRoute,
        private authenticationService: AuthService,
        private alertService: AlertService,
    ) {
        this.authenticationService.removeToken();
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/jokes';

        this.loginForm = new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(7),
                Validators.maxLength(32),
                Validators.pattern(/^[^iOl]*$/),
                this.checkIncreasingLetters.bind(this),
                this.checkNonOverlappingTwoPairs.bind(this),
            ]),
        });
    }

    removeNumbersAndSpecialCharacters(value: string) {
        return value
            .replace(/(?!\w|\s)./g, '')
            .replace(/\s+/g, ' ')
            .replace(/^(\s*)([\W\w]*)(\b\s*$)/g, '$2')
            .replace(/[0-9]/g, '');
    }

    checkIncreasingLetters(control: AbstractControl): StringBooleanPair | null {
        let increasingLetters = '';

        for (let i = 0; i < this.removeNumbersAndSpecialCharacters(control.value).length; ++i) {
            if (
                control.value.charCodeAt(i) === control.value.charCodeAt(i + 1) - 1 &&
                control.value.charCodeAt(i) === control.value.charCodeAt(i + 2) - 2
            ) {
                increasingLetters = control.value.substr(i, i + 3);
            }
        }

        if (increasingLetters.length > 0) {
            return null;
        } else {
            return { usedStraightLetters: true };
        }
    }

    checkNonOverlappingTwoPairs(control: AbstractControl): StringBooleanPair | null {
        let matchingPairs = [],
            sortedValue = [];

        if (control.value.length > 0) {
            sortedValue = Array.from(this.removeNumbersAndSpecialCharacters(control.value)).sort();

            for (let i = 0; i < sortedValue.length - 1; i++) {
                if (sortedValue[i + 1] === sortedValue[i]) {
                    matchingPairs.push(sortedValue[i]);
                }
            }
        }

        if (matchingPairs.length === 2) {
            return null;
        } else {
            return { usedTwoNonOverlappingPairOfLetters: true };
        }
    }

    onSubmit() {
        this.loading = true;
        this.animationActive = !this.animationActive;

        this.authenticationService
            .login(this.loginForm.value.username, this.loginForm.value.password)
            .subscribe(
                () => {
                    this.router.navigate([this.returnUrl]);
                },
                (err: string) => {
                    this.alertService.error(err);

                    this.loading = false;
                    this.animationActive = false;
                },
            );
    }
}
