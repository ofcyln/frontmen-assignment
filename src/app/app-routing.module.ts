import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { JokesComponent } from './jokes/jokes.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuardService } from './auth/auth-guard.service';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/jokes',
        pathMatch: 'full',
    },
    { path: 'login', component: LoginComponent },
    { path: 'jokes', component: JokesComponent, canActivate: [AuthGuardService] },
    { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuardService] },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: 'not-found' },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
