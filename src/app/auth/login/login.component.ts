import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TitleService } from '../../_services';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../_services/authentication/authentication.service';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { User } from '../../_models/User';
import { map } from 'rxjs/operators';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    showPasswordStatus: boolean;
    isSubmitting: boolean;
    successMessage: string;
    errorMessage: string;
    errors: object = {};
    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        rememberMe: new FormControl(false),
    });
    user: object = {};
    submitted: boolean;

    isAccountVerified: boolean;
    accountVerify: boolean;

    socialUser: SocialUser;
    GoogleLoginProvider = GoogleLoginProvider;


    /*linkedInCredentials = {
        clientId: "771iku04sdpzw6",
        redirectUrl: "https://y8pud.codesandbox.io/linkedInLogin",
        scope: "r_liteprofile%20r_emailaddress%20w_member_social" // To read basic user profile data and email
    }; */

    constructor(
        private titleService: TitleService,
        private api: ApiService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private authService: AuthenticationService,
        private socialAuthService: SocialAuthService
    ) {
        this.titleService.setTitle('Login');
    }

    ngOnInit(): void {

    }

    onSubmit(): void {
        this.submitted = true;
        this.errorMessage = '';
        this.successMessage = '';
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.isSubmitting = true;

        this.authService.login(
            this.loginForm.value.email,
            this.loginForm.value.password,
            this.loginForm.value.rememberMe,
        )
            .subscribe((res: any) => {
                this.errors = [];
                this.isSubmitting = false;
                if (res.accessToken) {
                    this.user = res;
                    this.authService.setUser();
                    this.router.navigate(['/']);
                }
            },
                (err) => {
                    this.errors = err.error.errors;
                    this.errorMessage = '';

                    if (err.error.message.length) {
                        this.errorMessage = err.error.message.toString();
                        if (err.error.accountVerified) {
                            this.isAccountVerified = true;
                        }
                    }

                    this.isSubmitting = false;
                });
    }

    // Function
    showPassword(): void {
        this.showPasswordStatus = !this.showPasswordStatus;
    }


    accountVerifcation() {
        this.accountVerify = true;
    }

    get f() {
        return this.loginForm.controls;
    }
    signInWithGoogle(): void {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
        this.socialAuthService.authState.subscribe(socialUser => {
            this.socialUser = socialUser;

            console.log('this social', this.socialUser);

            if (!!this.socialUser) {
                const data = {
                    name: this.socialUser['name'],
                    email: this.socialUser['email'],
                    provider: this.socialUser['provider']
                }
                this.api.post('auth/social-login', data)
                    .pipe(map((sUser: SocialUser) => {
                        if (sUser) {
                            this.authService.updateAuthUser(sUser);
                            localStorage.setItem('isSocialLogin', '1');
                        }
                        return sUser;
                    }))
                    .subscribe((res: any) => {
                        this.errors = [];
                        this.isSubmitting = false;
                        if (res.accessToken) {
                            this.user = res;
                            this.authService.updateAuthUser(this.socialUser);
                            localStorage.setItem('isSocialLogin', '1');
                            this.router.navigate(['/']);
                        }
                    },
                    );
            }
        });
    }

    signInWithFB(): void {
        this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
        this.socialAuthService.authState.subscribe(socialUser => {
            this.socialUser = socialUser;
            if (!!this.socialUser) {
                this.api.post('auth/social-login', this.socialUser)
                    .pipe(map((sUser: SocialUser) => {
                        if (sUser) {
                            this.authService.updateAuthUser(sUser);
                            localStorage.setItem('isSocialLogin', '1');
                        }
                        return sUser;
                    }))
                    .subscribe((res: any) => {
                        this.errors = [];
                        this.isSubmitting = false;
                        if (res.accessToken) {
                            this.user = res;
                            this.router.navigate(['/']);
                            // this.showOtpScreen = true;
                        }
                    },
                        (err) => {
                            this.errors = err.error.errors;
                            this.errorMessage = '';

                            if (err.error.message.length) {
                                this.errorMessage = err.error.message.toString();
                                if (err.error.accountVerified) {
                                    this.isAccountVerified = true;
                                }
                            }

                            this.isSubmitting = false;
                        });
            }
        });
    }

    signOut(): void {
        this.socialAuthService.signOut();
    }

    refreshGoogleToken(): void {
        this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
    }

    /*signInWithLinkedin() {
        window.location.href = `https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=${this.linkedInCredentials.clientId
            }&redirect_uri=${this.linkedInCredentials.redirectUrl}&scope={this.linkedInCredentials.scope}`;
    }*/

}
