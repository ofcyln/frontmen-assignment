import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Joke, JokesResponse } from '../interface/joke.model';
import { JokesRequestService } from './jokes-request.service';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable()
export class JokesService {
    public jokes: Joke[];
    public favoredJokes: Joke[] = [];

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

    setFavoredJokesToStorage() {
        this.storageService.setObject('favoredJokes', [...this.favoredJokes]);
    }
}
