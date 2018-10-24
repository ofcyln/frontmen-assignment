import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';

@NgModule({
    imports: [CommonModule, FormsModule],
    providers: [AuthGuardService, AuthService],
    declarations: [LoginComponent],
})
export class AuthModule {}
