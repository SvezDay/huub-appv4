
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LogoutPage } from './logout.page';
import { AuthService } from '../../_core/auth.service';

class AuthMock {
    public logout(): Promise<void>{
        return Promise.resolve();
    }
}

describe('LogoutPage', () => {
  let component: LogoutPage;
  let fixture: ComponentFixture<LogoutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports:[RouterTestingModule],
      declarations: [ LogoutPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers:[
          {provide: AuthService, useClass:AuthMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
