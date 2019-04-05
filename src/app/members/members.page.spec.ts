import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MembersPage } from './members.page';
import { AuthService } from '../_core/auth.service';

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

describe('MembersPage', () => {
    let component: MembersPage;
    let fixture: ComponentFixture<MembersPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [ MembersPage ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers:[
                {provide: AuthService, useClass: AuthMockTrue}
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MembersPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
