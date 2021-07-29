import {Component, OnInit} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {SidebarService} from './sidebar.service';
import {AuthenticationService} from '../../_services/authentication/authentication.service';

@Component({
    selector: 'app-user-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    animations: [
        trigger('slide', [
            state('up', style({height: 0})),
            state('down', style({height: '*'})),
            transition('up <=> down', animate(200))
        ])
    ]
})
export class SidebarComponent implements OnInit {
    menus = [];
    roleId: number;
    orgMenus = [];
    orgType: number;
    remove: boolean = true;

    constructor(public sidebarservice: SidebarService,
                private authenticationService: AuthenticationService,
    ) {
        const user = this.authenticationService.getUser();
        this.roleId = user.roleId;
        if (this.roleId === 1) {
            this.menus = sidebarservice.getMenuList();
        } else {
            this.orgMenus = sidebarservice.getOrgMenuList();
        }
    }

    ngOnInit(): void {
        const user = this.authenticationService.getUser();
        this.orgType = user.orgType;
        this.roleId = user.roleId;
        this.orgType = user.orgType;
    }

// toggle nav

    togglea() {
        if (this.remove == false) {
            this.remove = true;
        } else {
            this.remove = false;
        }
    }

// end
    getSideBarState() {
        return this.sidebarservice.getSidebarState();
    }

    toggle(currentMenu) {
        if (currentMenu.type === 'dropdown') {
            this.menus.forEach(element => {
                if (element === currentMenu) {
                    currentMenu.active = !currentMenu.active;
                } else {
                    element.active = false;
                }
            });
        }
    }

    getState(currentMenu) {

        if (currentMenu.active) {
            return 'down';
        } else {
            return 'up';
        }
    }

}