import { Component, OnInit } from '@angular/core';

import { Joke } from '../../shared/interface/joke.model';
import { JokesService } from '../../shared/service/jokes.service';
import { AlertService } from '../../core/alert/alert.service';

@Component({
    selector: 'app-refresh-jokes-button',
    templateUrl: './refresh-jokes-button.component.html',
    styleUrls: ['./refresh-jokes-button.component.scss'],
})
export class RefreshJokesButtonComponent implements OnInit {
    private readonly MAX_JOKE_COUNT: number = 10;

    constructor(private jokesService: JokesService, private alertService: AlertService) {}

    ngOnInit() {}

    refreshJokes() {
        this.jokesService.getJokes(this.MAX_JOKE_COUNT).subscribe(
            (jokes: Joke[]) => {
                this.jokesService.jokes = jokes;
            },
            (error) => {
                this.alertService.error(`Error: ${error}`);
            },
        );
    }
}
