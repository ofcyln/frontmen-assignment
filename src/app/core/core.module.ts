import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { AlertModule } from './alert/alert.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
    declarations: [HeaderComponent],
    imports: [CommonModule, AlertModule, AppRoutingModule],
    exports: [HeaderComponent, AlertModule, AppRoutingModule],
})
export class CoreModule {}
