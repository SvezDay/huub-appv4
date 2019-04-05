import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PopoverController } from '@ionic/angular';

import { BoardPage } from './board.page';
import { AuthService } from '../../_core/auth.service';


class AuthMockTrue {
    public isLoggedIn(): Promise<boolean>{
        return Promise.resolve(true);
    }
}
class AuthMockFalse {
    public isLoggedIn(): Promise<boolean>{
        return Promise.resolve(false);
    }
}

describe('BoardPage', () => {
    let component: BoardPage;
    let fixture: ComponentFixture<BoardPage>;
    let auth: AuthService;
    let popoverSpy;

    beforeEach(async(() => {
        popoverSpy = jasmine.createSpyObj('PopoverController', { click: ()=>{} });
        TestBed.configureTestingModule({
            declarations: [ BoardPage ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers:[
                {provide: AuthService, useClass: AuthMockTrue}
                ,{provide: PopoverController, useValue: popoverSpy}
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoardPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
        auth = TestBed.get(AuthService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
