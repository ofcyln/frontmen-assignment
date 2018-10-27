import { Component, OnInit } from '@angular/core';
import { JokesService } from '../shared/service/jokes.service';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
    constructor(public jokesService: JokesService) {}

    ngOnInit() {}
}
