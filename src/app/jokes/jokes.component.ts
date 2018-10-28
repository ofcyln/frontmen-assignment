import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { JokesService } from '../shared/service/jokes.service';
import { Joke } from '../shared/interface/jokes-interface.model';
import { AlertService } from '../core/alert/alert.service';

export interface JokeExtended extends Joke {
    active?: boolean;
}

@Component({
    selector: 'app-jokes',
    templateUrl: './jokes.component.html',
    styleUrls: ['./jokes.component.scss'],
})
export class JokesComponent implements OnInit {
    private readonly MAX_JOKE_COUNT: number = 10;
    private readonly QUOT_TEXT = /&quot;/g;
    private readonly QUOTATION_MARK = "'";

    constructor(
        public jokesService: JokesService,
        private alertService: AlertService,
        private router: Router,
    ) {}

    ngOnInit() {
        this.jokesService.getJokes(this.MAX_JOKE_COUNT).subscribe(
            (jokes: Joke[]) => {
                this.jokesService.jokes = jokes.map((joke: Joke) => {
                    return {
                        id: joke.id,
                        joke: this.jokesService.replaceTextNode(
                            joke.joke,
                            this.QUOT_TEXT,
                            this.QUOTATION_MARK,
                        ),
                        category: joke.category,
                    };
                });
            },
            (error) => {
                this.alertService.error(`Error: ${error}`);
            },
        );
    }

    addJokeToFavorites(joke: JokeExtended): void {
        if (this.jokesService.favoredJokes.includes(joke)) {
            this.jokesService.favoredJokes = this.jokesService.favoredJokes.filter(
                (favoredJoke) => favoredJoke.id !== joke.id,
            );

            joke.active = !joke.active;

            this.jokesService.setFavoredJokesToStorage();

            return;
        }

        if (!this.jokesService.favoredJokes.includes(joke)) {
            if (this.jokesService.favoredJokes.length >= this.MAX_JOKE_COUNT) {
                this.router.navigate(['favorites']);

                this.alertService.error(
                    'Favorite jokes reached maximum number of 10. Please remove some to add new ones!',
                );

                return;
            }

            this.jokesService.favoredJokes.push(joke);

            this.jokesService.setFavoredJokesToStorage();
        }

        joke.active = !joke.active;

        this.animateFavoriteRouteLink();
    }

    animateFavoriteRouteLink(): void {
        this.jokesService.animateFavoritesRouteLink = true;

        setTimeout(() => {
            this.jokesService.animateFavoritesRouteLink = false;
        }, 500);
    }
}
