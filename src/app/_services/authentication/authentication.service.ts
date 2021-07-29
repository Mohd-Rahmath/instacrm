import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {User} from '../../_models/User';
import {ApiService} from '../../api.service';
import {UserRole} from '../../_models/UserRole';
import {SocialAuthService, SocialUser} from 'angularx-social-login';

@Injectable({providedIn: 'root'})
export class AuthenticationService {

    isAdmin: boolean;
    isStandardUser: boolean;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(
        private api: ApiService,
        private socialAuthService: SocialAuthService
    ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.currentUser = this.currentUserSubject.asObservable();

        this.setUser();
    }

    login(email: string, password: string, rememberMe: boolean) {
        return this.api.post('auth/login', {
            email: email,
            password: password,
            rememberMe: rememberMe,
        })
            .pipe(map((user: User) => {
                if (user && user.accessToken) {
                  //  this.updateAuthUser(user);
                }
                return user;
            }));
    }

    /**
     *
     */
    logout() {
        // remove user from local storage to log user out
        return this.api.get(`auth/logout`)
            .subscribe((r: any) => {
                this.currentUserSubject.next(null);
                localStorage.removeItem('user');
                localStorage.clear();
            });
    }

    /**
     *
     */
    getUser(): User {
        return JSON.parse(localStorage.getItem('user'));
    }

    updateAuthUser(user): void {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
    }

    setUser(): void {
        const user = this.getUser();
        if (user && user.role === UserRole.Admin) {
            this.isAdmin = true;
        } else {
            this.isStandardUser = true;
        }
    }

    forgotPassword(email: string): any {
        return this.api.post('user/forgotPassword', {
            email: email,
        });
    }

    resetNewPassword(password: string, token: any): any {
        return this.api.post('user/resetPassword/' + token, {
            password: password,
        });
    }

    socialLogout() {
        this.currentUserSubject.next(null);
        this.socialAuthService.signOut();
        localStorage.removeItem('user');
        localStorage.removeItem('isSocialLogin');
        localStorage.clear();
    }

}
