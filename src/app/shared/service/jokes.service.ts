import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment.prod';
import { JokesResponse } from '../interface/jokes-interface.model';
import { Observable } from 'rxjs';

@Injectable()
export class JokesService {
    constructor(public http: HttpClient) {}

    public getJoke(amount: number): Observable<JokesResponse> {
        return this.http.get<JokesResponse>(`${environment.jokesAPIUrl}/${amount}`);
    }
}
