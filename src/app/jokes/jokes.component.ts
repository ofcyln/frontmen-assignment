import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { JokesRequestService } from '../shared/service/jokes-request.service';
import { Joke, JokesResponse } from '../shared/interface/jokes-interface.model';
import { AlertService } from '../core/alert/alert.service';

@Component({
    selector: 'app-jokes',
    templateUrl: './jokes.component.html',
    styleUrls: ['./jokes.component.scss'],
})
export class JokesComponent implements OnInit {
    public jokes: Joke[];

    private readonly MAX_JOKE_COUNT: number = 10;

    constructor(private jokesService: JokesRequestService, private alertService: AlertService) {}

    ngOnInit() {
        this.initJokes(this.MAX_JOKE_COUNT);
    }

    public initJokes(amount: number): void {
        this.jokesService
            .getJoke(amount)
            .pipe(
                map((jokes: JokesResponse) => {
                    return jokes.value;
                }),
            )
            .subscribe(
                (jokes: Joke[]) => {
                    this.jokes = jokes.map((joke: Joke) => {
                        return {
                            id: joke.id,
                            joke: this.replaceTextNode(joke.joke, /&quot;/g, "'"),
                            category: joke.category,
                        };
                    });
                },
                (error) => {
                    this.alertService.error(`Error: ${error}`);
                },
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
