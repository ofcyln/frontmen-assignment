import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { JokesComponent } from './jokes/jokes.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StorageService } from './shared/service/storage.service';
import { CoreModule } from './core/core.module';
import { JokesRequestService } from './shared/service/jokes-request.service';
import { FillSwitchComponent } from './favorites/fill-switch/fill-switch.component';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarHttpModule } from '@ngx-loading-bar/http';
import { RefreshJokesComponent } from './jokes/refresh-jokes/refresh-jokes.component';
import { JokesService } from './shared/service/jokes.service';

@NgModule({
    declarations: [
        AppComponent,
        JokesComponent,
        FavoritesComponent,
        FillSwitchComponent,
        NotFoundComponent,
        RefreshJokesComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AuthModule,
        LoadingBarHttpClientModule,
        LoadingBarHttpModule,
        CoreModule,
        AppRoutingModule,
    ],
    providers: [StorageService, JokesRequestService, JokesService],
    bootstrap: [AppComponent],
})
export class AppModule {}
