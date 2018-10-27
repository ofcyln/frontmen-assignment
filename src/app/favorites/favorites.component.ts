import { Component, OnInit } from '@angular/core';

import { JokesService } from '../shared/service/jokes.service';
import { Joke } from '../shared/interface/jokes-interface.model';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
    constructor(public jokesService: JokesService) {}

    ngOnInit() {}

    removeFavoredJoke(joke: Joke) {
        this.jokesService.favoredJokes = this.jokesService.favoredJokes.filter(
            (favoredJoke) => favoredJoke.id !== joke.id,
        );
    }
}
