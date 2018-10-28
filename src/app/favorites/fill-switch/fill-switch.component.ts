import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { JokesService } from '../../shared/service/jokes.service';
import { Joke } from '../../shared/interface/jokes-interface.model';
import { AlertService } from '../../core/alert/alert.service';

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

    constructor(private jokesService: JokesService, private alertService: AlertService) {}

    ngOnInit() {}

    getJoke() {
        this.jokesService.getOneJoke(this.JOKE_COUNT).subscribe(
            (jokes: Joke[]) => {
                const oneJoke = jokes.map((joke: Joke) => {
                    return {
                        id: joke.id,
                        joke: this.jokesService.replaceTextNode(joke.joke, /&quot;/g, "'"),
                        category: joke.category,
                    };
                })[this.FIRST_ITEM];

                this.jokesService.favoredJokes.push(oneJoke);
            },
            (error) => {
                this.alertService.error(`Error: ${error}`);
            },
        );
    }

    fillSwitchToggle() {
        this.jokesService.isFillSwitchActive = !this.jokesService.isFillSwitchActive;

        if (this.jokesService.isFillSwitchActive) {
            setInterval(() => {
                if (
                    this.jokesService.favoredJokes.length >= this.MAX_JOKE_COUNT ||
                    !this.jokesService.isFillSwitchActive
                ) {
                    clearInterval();
                    return;
                } else {
                    this.getJoke();
                }
            }, this.FIVE_SECONDS_TIMER);
        }
    }
}
