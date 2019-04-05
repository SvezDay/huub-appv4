import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverController } from '@ionic/angular';

import { ProjectPage } from './project.page';

describe('ProjectPage', () => {
    let component: ProjectPage;
    let fixture: ComponentFixture<ProjectPage>;
    let popoverSpy;

    beforeEach(async(() => {
        popoverSpy = jasmine.createSpyObj('PopoverController', { click: ()=>{ } })
        TestBed.configureTestingModule({
            declarations: [ ProjectPage ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers:[
                {provide: PopoverController, useValue: popoverSpy }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
