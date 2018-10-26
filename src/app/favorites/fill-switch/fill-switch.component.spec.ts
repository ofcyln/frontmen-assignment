import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillSwitchComponent } from './fill-switch.component';

describe('FillSwitchComponent', () => {
    let component: FillSwitchComponent;
    let fixture: ComponentFixture<FillSwitchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FillSwitchComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FillSwitchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
