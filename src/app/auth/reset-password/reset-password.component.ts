import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../api.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  submitted: boolean;
  isSubmitting: boolean;
  showPasswordStatus: boolean;
  showOtpScreen: boolean;
  errorMessage: string;
  successMessage: string;
  tokenMessage: string;
  tokenData: null;
  sendToken: string;
  errors: object = {};
  form: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.min(8), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]),
    confirmPassword: new FormControl('', [Validators.required, Validators.min(8)]),
  });

  constructor(
    private api: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    // this.sendToken = this.activatedRoute.snapshot.queryParamMap.get('token');
    // this.getCheckToken(this.sendToken);
  };

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.errors = [];
    const data = this.form.value;
    // @ts-ignore
    data.email = JSON.parse(localStorage.getItem('forgot')).email;

    this.api.post(`auth/reset-password`, data)
      .subscribe((res: any) => {
          alert('Password reset successful, you can now login');
          this.router.navigate(['/auth/login']);
        },
        (err: HttpErrorResponse) => {
          this.errors = err.error.errors;
          if (err.message.length) {
            this.errorMessage = err.error.message.toString();
          }
          this.isSubmitting = false;
        });
  }

// Function
  showPassword(): void {
    this.showPasswordStatus = !this.showPasswordStatus;
  }

  get f() {
    return this.form.controls;
  }

}

