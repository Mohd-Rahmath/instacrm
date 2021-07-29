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
    balance: object;
    transactions: any;
    referrals: object;
    firstName: string;
    goldInfo: number;
    goldPriceCssClass: string;
    roleId: number;
    walletAmount: number;
    orgType: number;

    constructor(
        private api: ApiService,
        private authenticationService: AuthenticationService,
        
        //  private websocketService: WebsocketService,
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
        this.orgType = user.orgType;


        // Once the price is fetched, attach WebSocket
        /* this.websocketService.subscribe('gold/24/price', data => {
           this.goldPriceCssClass = 'blink'
           this.goldInfo['buy_price_per_gram'] = data['buy'];
           this.goldInfo['sell_price_per_gram'] = data['sell'];

           const that = this
           setTimeout(function() {
             that.goldPriceCssClass = ''
           }, 5000);
         });*/
    }

    
}
