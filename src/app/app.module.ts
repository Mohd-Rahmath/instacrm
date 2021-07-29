import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import {environment} from '../environments/environment';
import {SocialLoginModule, SocialAuthServiceConfig} from 'angularx-social-login';
import {GoogleLoginProvider,FacebookLoginProvider} from 'angularx-social-login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountModule } from './account/account.module';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginLayoutComponent,
    PageNotFoundComponent,
    AppLayoutComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SocialLoginModule,
    AccountModule


    
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {
        provide: 'SocialAuthServiceConfig',
        useValue: {
            autoLogin: true,
            providers: [
                {
                    id: GoogleLoginProvider.PROVIDER_ID,
                    provider: new GoogleLoginProvider(
                        environment.googleClientId
                    )
                },
                {
                    id: FacebookLoginProvider.PROVIDER_ID,
                    provider: new FacebookLoginProvider(environment.facebookAppId)
                },
            ]
        } as SocialAuthServiceConfig,
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
