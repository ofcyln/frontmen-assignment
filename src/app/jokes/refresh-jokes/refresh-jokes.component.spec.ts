import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshJokesComponent } from './refresh-jokes.component';

describe('RefreshJokesComponent', () => {
    let component: RefreshJokesComponent;
    let fixture: ComponentFixture<RefreshJokesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RefreshJokesComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RefreshJokesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
