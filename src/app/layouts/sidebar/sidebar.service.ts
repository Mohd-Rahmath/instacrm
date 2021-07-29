import {Injectable} from '@angular/core';
import {AuthenticationService} from '../../_services/authentication/authentication.service';
import {ApiService} from '../../api.service';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {
    toggled = false;
    orgType: any;
    roleId: number;
    typeName: any;
    menus = [
        // {
        //   title: 'Extra',
        //   type: 'header'
        // },
        {
            title: 'Dashboard',
            icon: 'fas fa-tachometer-alt',
            active: false,
            type: 'simple',
            routerLink: '/',
            routerOptions: {exact: true}
        }
    ];


    
    constructor(
        private authenticationService: AuthenticationService,
    ) {
        const user = this.authenticationService.getUser();
        this.roleId = user.roleId;
    }

    toggle() {
        this.toggled = !this.toggled;
    }

    getSidebarState() {
        return this.toggled;
    }

    setSidebarState(state: boolean) {
        this.toggled = state;
    }

    getMenuList() {
        return this.menus;
    }

}
