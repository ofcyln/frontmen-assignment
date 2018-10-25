import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { JokesComponent } from './jokes/jokes.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AlertModule } from './shared/alert/alert.module';
import { StorageService } from './shared/storage.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [AppComponent, JokesComponent, FavoritesComponent, NotFoundComponent],
    imports: [BrowserModule, HttpClientModule, AuthModule, AppRoutingModule, AlertModule],
    providers: [StorageService],
    bootstrap: [AppComponent],
})
export class AppModule {}
