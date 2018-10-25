import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { JokesComponent } from './jokes/jokes.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AlertModule } from './core/alert/alert.module';
import { StorageService } from './shared/service/storage.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './core/header/header.component';

@NgModule({
    declarations: [
        AppComponent,
        JokesComponent,
        FavoritesComponent,
        NotFoundComponent,
        HeaderComponent,
    ],
    imports: [BrowserModule, HttpClientModule, AuthModule, AppRoutingModule, AlertModule],
    providers: [StorageService],
    bootstrap: [AppComponent],
})
export class AppModule {}
