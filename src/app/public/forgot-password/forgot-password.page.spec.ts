import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule,FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertController, IonicModule } from '@ionic/angular';

import { ForgotPasswordPage } from './forgot-password.page';
import { AuthService } from '../../_core/auth.service';

class AuthMock {
    public email: FormGroup = new FormBuilder().group({
        email: ["fox@mulder.com", Validators.compose([Validators.required, Validators.email])]
    });
    forgotPassword(email): Promise<void>{
        return Promise.resolve();
    }
}

describe('ForgotPasswordPage', () => {
    let component: ForgotPasswordPage;
    let fixture: ComponentFixture<ForgotPasswordPage>;
    let alertSpy;


    beforeEach(async(() => {
        alertSpy = jasmine.createSpyObj('AlertController', {push: ():void =>{ } });
        TestBed.configureTestingModule({
            imports:[ReactiveFormsModule, RouterTestingModule, FormsModule, IonicModule],
            declarations: [ ForgotPasswordPage ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                {provide: AuthService, useClass: AuthMock}
                ,{provide: AlertController, useValue: alertSpy}
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ForgotPasswordPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
