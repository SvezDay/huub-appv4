import {Component, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../_core/auth.service';
import {RestService} from '../_core/rest.service';
import {EventEmitter} from 'events';

@Component({
    selector: 'app-members',
    templateUrl: './members.page.html',
    styleUrls: ['./members.page.scss', '../app.component.scss'],
})
export class MembersPage implements OnInit {
    // @Output() public user: EventEmitter<any> = new EventEmitter();
    user;
    userName: string;

    constructor(private router: Router, private authService: AuthService, private restService: RestService) {
    }

    ngOnInit() {
        this.user = this.authService.getLocalProfile();
        this.userName = 'Boris';
        // this.userName = this.user.
        // this.router.navigate(['/member/board']);
    }

    logout() {
        this.authService.logout().then(() => {
            this.router.navigate(['/public/home']);
        });
    }

}
