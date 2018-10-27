import { Component, OnInit } from '@angular/core';
import { JokesService } from '../../shared/service/jokes.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    constructor(public jokesService: JokesService) {}

    ngOnInit() {}
}
