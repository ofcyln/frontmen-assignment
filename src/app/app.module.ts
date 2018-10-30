import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { JokesComponent } from './jokes/jokes.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { StorageService } from './shared/service/storage.service';
import { CoreModule } from './core/core.module';
import { JokesRequestService } from './shared/service/jokes-request.service';
import { FillSwitchComponent } from './favorites/fill-switch/fill-switch.component';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { RefreshJokesButtonComponent } from './jokes/refresh-jokes-button/refresh-jokes-button.component';
import { JokesService } from './shared/service/jokes.service';
import { JwtInterceptor } from './shared/service/interceptor/jwt.interceptor';
import { MockBackendServerInterceptor } from './shared/service/interceptor/mock-backend-server.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        JokesComponent,
        FavoritesComponent,
        FillSwitchComponent,
        RefreshJokesButtonComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AuthModule,
        LoadingBarHttpClientModule,
        CoreModule,
        AppRoutingModule,
    ],
    providers: [
        StorageService,
        JokesRequestService,
        JokesService,
        { provide: HTTP_INTERCEPTORS, useClass: MockBackendServerInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
