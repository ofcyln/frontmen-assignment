import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Joke, JokesResponse } from '../interface/joke.model';
import { JokesRequestService } from './jokes-request.service';
import { StorageService } from './storage.service';

@Injectable()
export class JokesService {
    public jokes: Joke[];
    public favoriteJokes: Joke[] = [];

    public jokeSubscription: Subscription;

    public animateFavoritesRouteLink: boolean;

    public isFillSwitchActive: boolean = false;

    constructor(
        private jokesRequestService: JokesRequestService,
        private storageService: StorageService,
    ) {}

    public getJokes(amount: number): Observable<Joke[]> {
        return this.jokesRequestService.getJoke(amount).pipe(
            map((jokes: JokesResponse) => {
                return jokes.value;
            }),
        );
    }

    public replaceTextNode(
        textNode: string,
        searchValue: string | RegExp,
        replaceValue: string,
    ): string {
        return textNode.replace(searchValue, replaceValue);
    }

    setFavoriteJokesToStorage() {
        this.storageService.setObject('favoriteJokes', [...this.favoriteJokes]);
    }

    filterUniqueJokes(joke: Joke): Joke[] {
        return this.favoriteJokes.filter((favoriteJoke) => favoriteJoke.id !== joke.id);
    }

    filterSameJokes(joke: Joke): Joke[] {
        return this.favoriteJokes.filter((favoriteJoke) => favoriteJoke.id === joke.id);
    }

    animateFavoriteRouteLink(): void {
        this.animateFavoritesRouteLink = true;

        setTimeout(() => {
            this.animateFavoritesRouteLink = false;
        }, 500);
    }
}
