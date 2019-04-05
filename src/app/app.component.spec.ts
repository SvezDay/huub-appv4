/*
REF:
https://codecraft.tv/courses/angular/unit-testing/routing/
https://blog.danieleghidoli.it/2016/11/06/testing-angular-component-mock-services/
*/

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { Location } from '@angular/common';
import { Router, Routes } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { PublicPage } from './public/public.page';
import { PublicPageModule } from './public/public.module';
import { MembersPage } from './members/members.page';
import { HomePage } from './public/home/home.page';

import { AuthService } from './_core/auth.service';


class AuthMockTrue {
    public isLoggedIn(): Promise<boolean>{
        return Promise.resolve(true);
    }
}

describe('AppComponent', () => {
    let routes: Routes = [
        { path: 'public', loadChildren: './public/public.module#PublicPageModule'},
        // { path:'public', component: PublicPage},
        // { path: 'members', loadChildren: './members/members.module#MembersPageModule', canActivate:[AuthGuard]},
        { path: 'members', loadChildren: './members/members.module#MembersPageModule'},

        // in the home constructor, if logged redirect to board
        { path: '', loadChildren: './public/public.module#PublicPageModule'},
        { path: '**', loadChildren: './public/public.module#PublicPageModule' },
    ];

    let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy, location, router, fixture;

    beforeEach(async(() => {
        statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
        splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
        platformReadySpy = Promise.resolve();
        platformSpy = jasmine.createSpyObj('Platform', { ready: platformReadySpy });

        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes), PublicPageModule],
            // declarations: [AppComponent, PublicPage, HomePage],
            declarations: [AppComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                { provide: StatusBar, useValue: statusBarSpy },
                { provide: SplashScreen, useValue: splashScreenSpy },
                { provide: Platform, useValue: platformSpy },
                { provide: AuthService, useClass: AuthMockTrue },
            ],
        }).compileComponents();

        router = TestBed.get(Router);
        location = TestBed.get(Location);

        fixture = TestBed.createComponent(AppComponent);
        router.initialNavigation();
    }));

    xit('should create the app', () => {
        // const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    xit('should initialize the app', async () => {
        // TestBed.createComponent(AppComponent);
        expect(platformSpy.ready).toHaveBeenCalled();
        await platformReadySpy;
        expect(statusBarSpy.styleDefault).toHaveBeenCalled();
        expect(splashScreenSpy.hide).toHaveBeenCalled();
    });
    xit("navigate to '' should redirect to /public/home ", fakeAsync(()=>{
        router.navigate(['']);
        tick();
        expect(location.path()).toBe('/public/home');
    }))

    // TODO: add more tests!

});
