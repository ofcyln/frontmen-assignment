import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { JokesService } from '../../shared/service/jokes.service';
import { Joke } from '../../shared/interface/joke.model';
import { AlertService } from '../../core/alert/alert.service';
import { interval, Subscription } from 'rxjs';

@Component({
    selector: 'app-fill-switch',
    templateUrl: './fill-switch.component.html',
    styleUrls: ['./fill-switch.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FillSwitchComponent implements OnInit {
    private readonly FIRST_ITEM = 0;
    private readonly JOKE_COUNT = 1;
    private readonly MAX_JOKE_COUNT = 10;
    private readonly FIVE_SECONDS_TIMER = 5000;
    private readonly QUOT_TEXT = /&quot;/g;
    private readonly QUOTATION_MARK = "'";

    constructor(public jokesService: JokesService, private alertService: AlertService) {}

    ngOnInit() {}

    getJoke() {
        this.jokesService.getJokes(this.JOKE_COUNT).subscribe(
            (jokes: Joke[]) => {
                const oneJoke = jokes.map((joke: Joke) => {
                    return {
                        id: joke.id,
                        joke: this.jokesService.replaceTextNode(
                            joke.joke,
                            this.QUOT_TEXT,
                            this.QUOTATION_MARK,
                        ),
                        category: joke.category,
                    };
                })[this.FIRST_ITEM];

                if (this.jokesService.filterSameJokes(oneJoke).length > 0) {
                    this.alertService.error(`Same joke has been detected. 
                    To prevent duplication, it didn't stored to the favorite jokes!`);
                } else {
                    this.jokesService.favoriteJokes.push(oneJoke);

                    this.jokesService.setFavoriteJokesToStorage();
                }
            },
            (error) => {
                this.alertService.error(`Error: ${error}`);
            },
        );
    }

    fillSwitchToggle() {
        this.jokesService.isFillSwitchActive = !this.jokesService.isFillSwitchActive;

        if (this.jokesService.isFillSwitchActive) {
            this.jokesService.jokeSubscription = interval(this.FIVE_SECONDS_TIMER).subscribe(
                () => {
                    if (this.jokesService.favoriteJokes.length >= this.MAX_JOKE_COUNT) {
                        this.alertService.error(
                            'Favorite jokes amount reached to the maximum ' +
                                'allowed number of 10. Fill switch deactivated!',
                        );

                        this.jokesService.isFillSwitchActive = false;

                        this.jokesService.jokeSubscription.unsubscribe();
                    } else if (!this.jokesService.isFillSwitchActive) {
                        this.jokesService.isFillSwitchActive = false;

                        this.jokesService.jokeSubscription.unsubscribe();
                    } else {
                        this.getJoke();
                    }
                },
                (error) => {
                    this.alertService.error(
                        `There was an error while filling favorite jokes: ${error}.`,
                    );
                },
            );
        } else if (this.jokesService.jokeSubscription || !this.jokesService.isFillSwitchActive) {
            this.jokesService.jokeSubscription.unsubscribe();
        }
    }
}
