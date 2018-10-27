import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Joke, JokesResponse } from '../interface/jokes-interface.model';
import { JokesRequestService } from './jokes-request.service';
import { Observable } from 'rxjs';

@Injectable()
export class JokesService {
    public jokes: Joke[];

    constructor(private jokesRequestService: JokesRequestService) {}

    public initJokes(amount: number): Observable<Joke[]> {
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
}
