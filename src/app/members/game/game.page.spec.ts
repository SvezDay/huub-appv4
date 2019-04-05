import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverController } from '@ionic/angular';

import { GamePage } from './game.page';

describe('GamePage', () => {
    let component: GamePage;
    let fixture: ComponentFixture<GamePage>;
    let popoverSpy;

    beforeEach(async(() => {
        popoverSpy = jasmine.createSpyObj('PopoverController', { click: ()=>{} });
        TestBed.configureTestingModule({
            declarations: [ GamePage ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers:[
                {provide: PopoverController, useValue:popoverSpy}
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GamePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
