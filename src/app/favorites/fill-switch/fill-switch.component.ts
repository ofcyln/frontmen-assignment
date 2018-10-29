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
    private subscription: Subscription;

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

                this.jokesService.favoredJokes.push(oneJoke);

                this.jokesService.setFavoredJokesToStorage();
            },
            (error) => {
                this.alertService.error(`Error: ${error}`);
            },
        );
    }

    fillSwitchToggle() {
        this.jokesService.isFillSwitchActive = !this.jokesService.isFillSwitchActive;

        if (this.jokesService.isFillSwitchActive) {
            this.subscription = interval(this.FIVE_SECONDS_TIMER).subscribe(
                () => {
                    if (this.jokesService.favoredJokes.length >= this.MAX_JOKE_COUNT) {
                        this.alertService.error(
                            'Favored jokes amount reached to the maximum ' +
                                'allowed number of 10. Fill switch deactivated!',
                        );

                        this.jokesService.isFillSwitchActive = false;

                        this.subscription.unsubscribe();
                    } else if (!this.jokesService.isFillSwitchActive) {
                        this.jokesService.isFillSwitchActive = false;

                        this.subscription.unsubscribe();
                    } else {
                        this.getJoke();
                    }
                },
                (error) => {
                    this.alertService.error(
                        `There was an error while filling favored jokes: ${error}.`,
                    );
                },
            );
        }
    }
}
