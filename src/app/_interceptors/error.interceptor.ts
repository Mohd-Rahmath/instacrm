import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {AuthenticationService} from "../_services/authentication/authentication.service";
import {ApiService} from "../api.service";
import {Router} from "@angular/router";
import {NzNotificationService} from "ng-zorro-antd/notification";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  hasRefreshed: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private api: ApiService,
    private router: Router,
    private notification: NzNotificationService,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        tap((event: HttpEvent<any>) => {
          // console.log(event)
          if (event instanceof HttpResponse) {

            // console.log('ev')
            // const jwt: string = event.headers.keys();
            // console.log(event)

            let type: string = 'info';
            let message: string = '', info: string;

            switch (event.status) {
              case 403:
                type = 'error';
                message = 'Access Forbidden';
                info = 'Sorry, you cannot access that data';
                break;
              case 500:
                type = 'error';
                message = 'Error!';
                info = 'Oops, something looks not right!';
                break;
              case 200:
                // const user = this.authenticationService.getUser();
                // // user['accessToken'] = '';
                // this.authenticationService.updateAuthUser(user);
                break;
            }

            if (message.length) {
              this.notification.create(type, message, info);
            }

          }
        }),
        catchError(err => {
          // if (err.status === 401) {
          //   // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          //   if (!this.hasRefreshed) {
          //     this.hasRefreshed = true;
          //     this.api.post(`auth/refresh`, {})
          //       .subscribe((user: any) => {
          //         this.hasRefreshed = false;
          //         this.authenticationService.updateAuthUser(user);
          //         window.location.reload(true);
          //       }, (err: HttpErrorResponse) => {
          //         this.hasRefreshed = true;
          //         this.authenticationService.logout();
          //         this.router.navigate(['/auth/login']);
          //       });
          //   }
          // }

          if (err.status === 401) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            if (!this.hasRefreshed) {
              this.hasRefreshed = true;
              this.authenticationService.logout();
              this.router.navigate(['/auth/login']);
            }
          }

          if ([403].includes(err.status)) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            // this.authenticationService.logout();
            // this.router.navigate(['/auth/login']);
          }

          return throwError(err);
        }));
  }
}
