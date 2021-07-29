import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.scss']
})
export class LoginLayoutComponent implements OnInit {

  name = `${environment.company.legalName}`;
  year = new Date().getFullYear();

  constructor() {
  }

  ngOnInit(): void {
  }

}
