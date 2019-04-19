import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {PopoverProfilePageModule} from './popover-profile/popover-profile.module';
// import { ToolbarPageModule } from './toolbar/toolbar.module';

import {MembersPage} from './members.page';
// import { ToolbarPage } from './toolbar/toolbar.page';


const routes: Routes = [
    {
        path: '', component: MembersPage, children: [
            {path: 'board', loadChildren: './board/board.module#BoardPageModule'}
            , {path: 'box', loadChildren: './box/box.module#BoxPageModule'}
            , {path: 'project', loadChildren: './project/project.module#ProjectPageModule'}
            , {path: 'game', loadChildren: './game/game.module#GamePageModule'}

            , {path: 'user-profile', loadChildren: './user-profile/user-profile.module#UserProfilePageModule'}
        ]
    }
    // ,{ path:'', component: ToolbarPage, outlet:'auxToolbar'}
];

@NgModule({
    imports: [
        CommonModule
        , FormsModule
        , IonicModule
        , RouterModule.forChild(routes)
        , PopoverProfilePageModule
        // , ToolbarPageModule
    ]
    , declarations: [MembersPage]
    , schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MembersPageModule {
}
