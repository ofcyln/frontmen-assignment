import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { JokesService } from '../shared/service/jokes.service';
import { Joke } from '../shared/interface/joke.model';
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
        if (this.jokesService.favoriteJokes.includes(joke)) {
            this.jokesService.favoriteJokes = this.jokesService.filterUniqueJokes(joke);
        } else {
            if (this.jokesService.favoriteJokes.length >= this.MAX_JOKE_COUNT) {
                this.router.navigate(['favorites']);

                this.alertService.error(
                    'Favorite jokes reached maximum number of 10. Please remove some to add new ones!',
                );
            } else {
                this.jokesService.favoriteJokes.push(joke);
            }
        }

        this.jokesService.setFavoriteJokesToStorage();

        joke.active = !joke.active;

        this.jokesService.animateFavoriteRouteLink();
    }
}
