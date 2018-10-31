import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';

@NgModule({
    imports: [CommonModule, ReactiveFormsModule],
    providers: [AuthGuardService, AuthService],
    declarations: [LoginComponent],
})
export class AuthModule {}
