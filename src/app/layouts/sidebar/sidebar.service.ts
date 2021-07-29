import {Injectable} from '@angular/core';
import {AuthenticationService} from '../../_services/authentication/authentication.service';
import {Api} from 'aws-sdk/clients/apigatewayv2';
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
        },
        {
            title: 'Schemes',
            icon: 'fa fa-warehouse',
            active: false,
            type: 'simple',
            routerLink: '/schemes',
            routerOptions: {},
            roleId: 1
        },
        {
            title: 'Digital Wallet',
            icon: 'fas fa-wallet',
            active: false,
            type: 'dropdown',
            routerLink: '',
            routerOptions: {},
            submenus: [
                {
                    title: 'Buy Gold',
                    icon: 'fas fa-shopping-bag',
                    active: false,
                    type: 'simple',
                    routerLink: '/gold/buy',
                    routerOptions: {}
                },
                {
                    title: 'Sell Gold',
                    icon: 'fas fa-hand-sparkles',
                    active: false,
                    type: 'simple',
                    routerLink: '/gold/sell',
                    routerOptions: {}
                },
                {
                    title: 'Transfer Gold',
                    icon: 'fas fa-exchange-alt',
                    active: false,
                    type: 'simple',
                    routerLink: '/gold/transfer',
                    routerOptions: {}
                },
                // {
                //   title: 'Gift Gold',
                //   icon: 'fas fa-gift',
                //   active: false,
                //   type: 'simple',
                //   routerLink: '/gold/gift',
                //   routerOptions: {}
                // },
                {
                    title: 'Redeem Gold',
                    icon: 'fas fa-shipping-fast',
                    active: false,
                    type: 'simple',
                    routerLink: '/gold/withdraw',
                    routerOptions: {}
                },
            ]
        },

        {
            title: 'Money Wallet',
            icon: 'fas fa-rupee-sign',
            active: false,
            type: 'simple',
            routerLink: '/money-wallet',
            routerOptions: {}
        },

        {
            title: 'Passbook',
            icon: 'fas fa-list',
            active: false,
            type: 'simple',
            routerLink: '/transactions',
            routerOptions: {}
            // type: 'dropdown',
            // badge: {
            //   text: 'New ',
            //   class: 'badge-warning'
            // },
            // submenus: [
            //   {
            //     title: 'Buy digital gold',
            //   },
            //   {
            //     title: 'Razorpay Account Statement'
            //   },
            //   {
            //     title: 'Digital Wallet List'
            //   },
            //   {
            //     title: 'Cash Account Statement'
            //   },
            //   {
            //     title: 'Sell Bank details'
            //   }
            // ]
        },
        {
            title: 'Events',
            icon: 'fas fa-calendar-check',
            active: false,
            type: 'dropdown',
            routerLink: '',
            routerOptions: {},
            submenus: [
                {
                    title: 'Events',
                    icon: 'far fa-calendar-check',
                    active: false,
                    type: 'simple',
                    routerLink: '/events',
                    routerOptions: {}
                },
                {
                    title: 'Invitation List',
                    icon: 'fas fa-hand-sparkles',
                    active: false,
                    type: 'simple',
                    routerLink: '/events/event-invites',
                    routerOptions: {}
                },
            ]
        },

        {
            title: 'Referrals',
            icon: 'fa fa-user-plus',
            active: false,
            type: 'simple',
            routerLink: '/referral',
            routerOptions: {}
        },
        // {
        //   title: 'My Gold2020',
        //   icon: 'fa fa-shopping-cart',
        //   active: false,
        //   type: 'dropdown',
        //   // badge: {
        //   //   text: '3',
        //   //   class: 'badge-danger'
        //   // },
        //   submenus: [
        //     {
        //       title: 'MMI',
        //     },
        //     {
        //       title: 'Mygold2020 List'
        //     },
        //     {
        //       title: 'Cash Account Statement'
        //     },
        //     {
        //       title: 'Razorpay Account Statement',
        //     },
        //   ]
        // },
        // {
        //   title: 'Documentation',
        //   icon: 'fa fa-book',
        //   active: false,
        //   type: 'simple',
        //   badge: {
        //     text: 'Beta',
        //     class: 'badge-primary'
        //   },
        // },
        {
            title: 'Coupons',
            icon: 'fa fa-list',
            active: false,
            type: 'simple',
            routerLink: '/coupons',
            routerOptions: {}
        },
        {
            title: 'organizations',
            icon: 'fa fa-list',
            active: false,
            type: 'simple',
            routerLink: '/user-organizations',
            routerOptions: {}
        },
        {
            title: 'Feed Back Form',
            icon: 'fas fa-list',
            active: false,
            type: 'simple',
            routerLink: '/feedback',
            routerOptions: {}
        },
        {
            title: 'Tickets',
            icon: 'fa fa-list',
            active: false,
            type: 'simple',
            routerLink: '/tickets',
            routerOptions: {}
        },
        {
            title: 'Settings',
            icon: 'fas fa-cog',
            active: false,
            type: 'simple',
            routerLink: '/settings',
            routerOptions: {}
        },
        // {
        //   title: 'Goldsikka Partners',
        //   icon: 'fas fa-hands-helping',
        //   active: false,
        //   type: 'simple',
        //   routerLink: '/partners',
        //   routerOptions: {}
        // }
    ];


    orgMenus = [
        {
            title: 'Dashboard',
            icon: 'fas fa-tachometer-alt',
            active: false,
            type: 'simple',
            routerLink: '/',
            routerOptions: {exact: true}
        },
        {
            title: 'Passbook',
            icon: 'fas fa-list',
            active: false,
            type: 'simple',
            routerLink: '/transactions',
            routerOptions: {}
        },
        {
            title: 'Settings',
            icon: 'fas fa-cog',
            active: false,
            type: 'simple',
            routerLink: '/settings',
            routerOptions: {}
        },
    ];


    constructor(
        private authenticationService: AuthenticationService,
    ) {
        const user = this.authenticationService.getUser();
        this.orgType = user.orgType;
        this.roleId = user.roleId;
        if (this.roleId === 2) {
            if (this.orgType === 1) {
                this.orgType = {
                    title: 'temples',
                    icon: 'fas fa-tachometer-alt',
                    active: false,
                    type: 'simple',
                    routerLink: '/organization/view',
                    routerOptions: {exact: true}
                };
            } else {
                this.orgType = {
                    title: 'NGO',
                    icon: 'fas fa-tachometer-alt',
                    active: false,
                    type: 'simple',
                    routerLink: '/organization/view',
                    routerOptions: {exact: true}
                };
            }
        }

        this.orgMenus.push(this.orgType);
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

    getOrgMenuList() {
        return this.orgMenus;
    }

}
