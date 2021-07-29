import {Injectable} from '@angular/core';

import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    ActivatedRoute,
    ActivationStart
} from '@angular/router';
import {AuthenticationService} from './authentication.service';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    roleId: number;

    constructor(
        private activateRoute: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
    }

    /**
     * @param route
     * @param state
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const currentUser = this.authenticationService.getUser();


        if (currentUser) {
            // console.log('chcking,auth', this.isAuthorised(this.roleId));
            // check if route is restricted by role
            if (route.data.role && route.data.role.indexOf(currentUser.role) === -1) {
                // role not authorised so redirect to home page
                this.router.navigate(['/']);
                return false;
            }

            /*this.router.events.subscribe((data: any) => {
                if (data instanceof ActivationStart) {
                    if (!!data.snapshot.data.role) {
                        this.roleId = data.snapshot.data.role;
                        if (!!this.roleId && Number(this.roleId) !== Number(currentUser.roleId)) {
                            this.router.navigate(['/']);
                            return false;
                        }
                    }
                }

            }); */

            // authorised so return true''
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/auth/login'], {queryParams: {returnUrl: state.url}});
        return false;
    }


}
