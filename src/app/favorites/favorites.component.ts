import { Component, OnInit } from '@angular/core';

import { JokesService } from '../shared/service/jokes.service';
import { Joke } from '../shared/interface/joke.model';
import { StorageService } from '../shared/service/storage.service';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
    constructor(public jokesService: JokesService, public storageService: StorageService) {}

    ngOnInit() {
        this.jokesService.favoredJokes =
            <Joke[]>this.storageService.getObject('favoredJokes') || [];
    }

    removeFavoredJoke(joke: Joke) {
        this.jokesService.favoredJokes = this.jokesService.favoredJokes.filter(
            (favoredJoke) => favoredJoke.id !== joke.id,
        );

        this.jokesService.setFavoredJokesToStorage();
    }
}
