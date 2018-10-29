import { Component, OnInit } from '@angular/core';

import { Joke } from '../../shared/interface/joke.model';
import { JokesService } from '../../shared/service/jokes.service';
import { AlertService } from '../../core/alert/alert.service';

@Component({
    selector: 'app-refresh-jokes',
    templateUrl: './refresh-jokes.component.html',
    styleUrls: ['./refresh-jokes.component.scss'],
})
export class RefreshJokesComponent implements OnInit {
    private readonly MAX_JOKE_COUNT: number = 10;
    private readonly QUOT_TEXT = /&quot;/g;
    private readonly QUOTATION_MARK = "'";

    constructor(private jokesService: JokesService, private alertService: AlertService) {}

    ngOnInit() {}

    refreshJokes() {
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
}
