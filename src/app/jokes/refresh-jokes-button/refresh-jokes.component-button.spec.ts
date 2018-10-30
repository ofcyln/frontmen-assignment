import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshJokesButtonComponent } from './refresh-jokes-button.component';

describe('RefreshJokesButtonComponent', () => {
    let component: RefreshJokesButtonComponent;
    let fixture: ComponentFixture<RefreshJokesButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RefreshJokesButtonComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RefreshJokesButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
