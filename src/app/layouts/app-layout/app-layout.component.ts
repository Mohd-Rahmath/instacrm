import {Component, HostListener, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AuthenticationService} from '../../_services/authentication/authentication.service';
import {Event, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {ApiService} from '../../api.service';

@Component({
    selector: 'app-app-layout',
    templateUrl: './app-layout.component.html',
    styleUrls: ['./app-layout.component.scss'],
    animations: [
        trigger('slide', [
            state('up', style({height: 0})),
            state('down', style({height: '*'})),
            transition('up <=> down', animate(200))
        ])
    ],
})
export class AppLayoutComponent implements OnInit {

    @HostListener('window:onbeforeunload', ['$event'])
    clearLocalStorage(event) {
        localStorage.removeItem('coupon');
    }

    name: string;
    year = (new Date()).getFullYear();
    pageLoading: boolean;
    notificationsModal: boolean;
    page: number = 1;
    list: any;
    notificationsCount: number;
    isVisible: boolean = false;
    roleId: number;

    constructor(
        public authenticationService: AuthenticationService,
        public router: Router,
        private api: ApiService,
    ) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationStart) {
                // Show loading indicator
                this.pageLoading = true;
            }

            if (event instanceof NavigationEnd) {
                // Hide loading indicator
                this.pageLoading = false;
            }

            if (event instanceof NavigationError) {
                // Hide loading indicator
                this.pageLoading = false;

                // Present error to user
                // console.log(event.error);
            }
        });
    }

    ngOnInit(): void {
        const user = this.authenticationService.getUser();
        console.log('user', user.name);
        this.name = user.name;

        this.roleId = user.roleId;
        this.getNotifications();
        // window.onClick = hideNotificationsModal();

        localStorage.removeItem('coupon');

    }

    logout(): void {
        if (confirm('Are you sure you want to logout?')) {
            if (localStorage.hasOwnProperty('isSocialLogin')) {
                this.authenticationService.socialLogout();
            } else {
                this.authenticationService.logout();
            }
            this.router.navigate(['/auth/login']);
        }
    }

    onActivate(event): void {

    }

    onDeactivate(event): void {

    }

    getNotifications() {
        this.api.get(`notifications?page=${this.page}`)
            .subscribe((r: any) => {
                this.notificationsCount = r.notificationsCount;
                this.list = r.notifications;
            });
    }

    showNotificationsModal() {
        this.getNotifications();
        this.notificationsModal = true;
    }

    hideNotificationsModal() {
        this.notificationsModal = false;
    }

    notificationType(type: string, id: number) {
        this.api.get(`notifications/read-one/` + id)
            .subscribe((r: any) => {
                switch (type) {
                    case 'BG':
                        window.location.href = '/gold/buy';
                        break;
                    case 'SG':
                        window.location.href = '/gold/sell';
                        break;
                    case 'TG':
                        window.location.href = '/gold/transfer';
                        break;
                    case 'RG':
                        window.location.href = '/gold/withdraw';
                        break;
                    case 'SL':
                        window.location.href = '/schemes';
                        break;
                    case 'GN':
                        // no action for this case
                        this.getNotifications();
                        break;
                    default:
                        // no action for this case
                        this.getNotifications();
                        break;
                }
            });
    }

    pageChanged(pageNumber: number) {
        this.page = pageNumber;
        this.getNotifications();
    }

}
