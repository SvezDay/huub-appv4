import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PopoverController } from '@ionic/angular';

import { PopoverProfilePage } from './popover-profile.page';

describe('PopoverProfilePage', () => {
    let component: PopoverProfilePage;
    let fixture: ComponentFixture<PopoverProfilePage>;
    let popoverSpy;

    beforeEach(async(() => {
        popoverSpy = jasmine.createSpyObj('PopoverController', { click: ()=>{} })
        TestBed.configureTestingModule({
            imports:[RouterTestingModule],
            declarations: [ PopoverProfilePage ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers:[
                {provide: PopoverController, useValue: popoverSpy}
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PopoverProfilePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
