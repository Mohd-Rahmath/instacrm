import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../api.service';
import {AuthenticationService} from '../../_services/authentication/authentication.service';
import {AccountService} from '../account.service';
import {HttpErrorResponse} from '@angular/common/http';
import {SocialAuthService} from 'angularx-social-login';
import {SocialUser} from 'angularx-social-login';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    HEAD;
    referrals: object;
    firstName: string;
    roleId: number;

    constructor(
        private api: ApiService,
        private authenticationService: AuthenticationService,
    ) {
    }

    ngOnInit(): void {
        const user = this.authenticationService.getUser();
        this.firstName = user.name;
        if (localStorage.hasOwnProperty('isSocialLogin')) {
            this.roleId = 1;
        } else {
            this.roleId = user.roleId;
        }
    }    
}
