import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {NzNotificationModule} from 'ng-zorro-antd/notification';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [DashboardComponent],
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule,
        NzNotificationModule,
        ReactiveFormsModule
    ]
})
export class AccountModule {
}
