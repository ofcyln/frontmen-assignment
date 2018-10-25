import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { AlertModule } from './alert/alert.module';
import { AppRoutingModule } from '../app-routing.module';
import { FillSwitchComponent } from './header/fill-switch/fill-switch.component';

@NgModule({
    declarations: [HeaderComponent, FillSwitchComponent],
    imports: [CommonModule, AlertModule, AppRoutingModule],
    exports: [HeaderComponent, AlertModule, AppRoutingModule],
})
export class CoreModule {}
