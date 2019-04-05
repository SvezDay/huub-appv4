import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';
import { AuthService } from '../../_core/auth.service';
import { LoadingController, AlertController, NavController, IonicModule } from '@ionic/angular';

import { SignUpPage } from './sign-up.page';

class AuthMock {

}

describe('SignUpPage', () => {
    let component: SignUpPage;
    let fixture: ComponentFixture<SignUpPage>;
    let loadingSpy, alertSpy, navSpy;

    beforeEach(async(() => {
        loadingSpy = jasmine.createSpyObj('LoadingController', {push:()=>{}})
        alertSpy = jasmine.createSpyObj('AlertController', {push:()=>{}})
        navSpy = jasmine.createSpyObj('NavController', {click:()=>{}}) // réfère au bouton back

        TestBed.configureTestingModule({
            imports:[ReactiveFormsModule, RouterTestingModule, IonicModule],
            declarations: [ SignUpPage ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers:[
                {provide: AuthService, useClass: AuthMock}
                ,{provide: LoadingController, useValue: loadingSpy}
                ,{provide: AlertController, useValue: alertSpy}
                ,{provide: NavController, useValue: navSpy}
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SignUpPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
