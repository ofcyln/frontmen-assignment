import { Component, OnInit } from '@angular/core';

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

    constructor(public jokesService: JokesService, private alertService: AlertService) {}

    ngOnInit() {
        this.jokesService.initJokes(this.MAX_JOKE_COUNT).subscribe(
            (jokes: Joke[]) => {
                this.jokesService.jokes = jokes.map((joke: Joke) => {
                    return {
                        id: joke.id,
                        joke: this.jokesService.replaceTextNode(joke.joke, /&quot;/g, "'"),
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
        this.animateFavoriteRouteLink();

        this.jokesService.favoritedJokes.push(joke);

        joke.active = !joke.active;
    }

    animateFavoriteRouteLink() {
        this.jokesService.animateFavoritesRouteLink = true;
        setTimeout(() => {
            this.jokesService.animateFavoritesRouteLink = false;
        }, 500);
    }
}
