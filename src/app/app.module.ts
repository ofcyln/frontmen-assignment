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

@NgModule({
    declarations: [AppComponent, JokesComponent, FavoritesComponent, NotFoundComponent],
    imports: [BrowserModule, HttpClientModule, AuthModule, CoreModule, AppRoutingModule],
    providers: [StorageService],
    bootstrap: [AppComponent],
})
export class AppModule {}
