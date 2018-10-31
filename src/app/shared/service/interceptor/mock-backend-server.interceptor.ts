import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { LoginResponse } from '../../interface/user.model';

@Injectable()
export class MockBackendServerInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.url.endsWith('/login') && request.method === 'POST') {
            return (
                of(null)
                    .pipe(
                        mergeMap(() => {
                            const testUser = {
                                username: 'admin',
                                email: 'niek.heezemans@frontmen.nl',
                                password: 'xyzaabb',
                            };

                            request = request.clone();

                            if (
                                (request.body.username === testUser.username ||
                                    request.body.username === testUser.email) &&
                                request.body.password === testUser.password
                            ) {
                                const body: LoginResponse = {
                                    token:
                                        'eyJhbGciOiJIUzI1NiIsInwefwefMSwiZ3VpZCI6IjQ0MDdmOTNjLWRjM' +
                                        'DEtNDQ2My1hMzhmwefwefLWUxZmJiMWQzMTRmOCIsImV4cCI6MTUxNzU3ODM2' +
                                        'NCwiZW1haWwiOiJuaWVrLmhlZXplbWFuc0Bmcm9udG1lbi5ubCIsImlhdCI6MTUx' +
                                        'NzUwefwef3Mjk2NH0.Ykirzr4b7GdsIPGV6PDjCpFHOAqohKazJl5pWJFw',
                                    user: {
                                        id: 1,
                                        guid: '4407xxxx-dc01-xxxx-a38f-e1fbb1xxxxxx',
                                        firstname: 'Frontmen',
                                        lastname: 'Eindhoven',
                                        username: 'admin',
                                        email: 'niek.heezemans@frontmen.nl',
                                        status: 'active',
                                        createdAt: '2018-02-02T11:46:39.000Z',
                                        updatedAt: '2018-02-02T11:46:39.000Z',
                                        Roles: [
                                            {
                                                id: 2,
                                                name: 'Administrator',
                                                isAdmin: true,
                                                createdAt: '2018-02-02T11:46:37.000Z',
                                                updatedAt: '2018-02-02T11:46:37.000Z',
                                                UserRoles: {
                                                    RoleId: 2,
                                                    UserId: 1,
                                                    createdAt: '2018-02-02T11:46:39.000Z',
                                                    updatedAt: '2018-02-02T11:46:39.000Z',
                                                },
                                            },
                                        ],
                                        Branches: [
                                            {
                                                id: 3,
                                                name: 'Frontmen - Eindhoven',
                                                city: 'Eindhoven',
                                                createdAt: '2018-02-02T11:46:37.000Z',
                                                updatedAt: '2018-02-02T11:46:37.000Z',
                                                UserBranches: {
                                                    BranchId: 3,
                                                    UserId: 1,
                                                    createdAt: '2018-02-02T11:46:39.000Z',
                                                    updatedAt: '2018-02-02T11:46:39.000Z',
                                                },
                                            },
                                        ],
                                    },
                                };

                                // if login details are valid return 200 OK with a hypothetical JWT
                                return of(
                                    new HttpResponse({
                                        status: 200,
                                        body,
                                    }),
                                );
                            } else {
                                // else return error
                                return throwError('Username or password is wrong!');
                            }
                        }),
                    )
                    // Called RxJS Materialize() and Dematerialize() methods
                    // to ensure delay which simulates server response
                    .pipe(
                        materialize(),
                        delay(1000),
                        dematerialize(),
                    )
            );
        }

        return next.handle(request);
    }
}
