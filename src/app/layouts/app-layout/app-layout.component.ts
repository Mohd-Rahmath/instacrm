import { Component, HostListener, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AuthenticationService } from '../../_services/authentication/authentication.service';
import { Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
    selector: 'app-app-layout',
    templateUrl: './app-layout.component.html',
    styleUrls: ['./app-layout.component.scss'],
    animations: [
        trigger('slide', [
            state('up', style({ height: 0 })),
            state('down', style({ height: '*' })),
            transition('up <=> down', animate(200))
        ])
    ],
})
export class AppLayoutComponent implements OnInit {

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
        this.name = user.name;
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

}
