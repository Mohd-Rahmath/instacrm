import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../api.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  showOtpScreen:boolean;
  submitted: boolean;
  isSubmitting: boolean;
  resultEmail:string;
  errorMessage: string;
  successMessage: string;
  errors: object = {};
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
  });

  constructor(
    private api: ApiService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {

    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';
    if (this.form.invalid) {
      return;
    }
    this.isSubmitting = true;
    this.api.post(`auth/reset-link`, this.form.value)
      .subscribe((res: any) => {
          this.resultEmail=res.email;
          this.isSubmitting = false;
          this.submitted = false;
          this.form.reset();
          this.successMessage = res['message'] ? res['message'] : 'Reset Email is send successfully, please check your inbox.';
          alert(this.successMessage);
          this.showOtpScreen = true;

        },
        (err: HttpErrorResponse) => {
          this.errorMessage = '';
          this.errors = err.error.errors;
          if (err.error.message.length) {
            this.errorMessage = err.error.message.toString();
          }
          this.isSubmitting = false;
        });
  }

  get f() {
    return this.form.controls;
  }



  onOtpChange(otp): void {
    if (otp.length === 6) {
      this.isSubmitting = true;
      this.api.get(`auth/verify/${otp}?email=`+ this.resultEmail)
        .subscribe((res: any) => {
            this.isSubmitting = false;
            this.errors = [];
            this.showOtpScreen = true;
            if (localStorage.hasOwnProperty('forgot')) {
              localStorage.removeItem('forgot');
            }
            localStorage.setItem('forgot', JSON.stringify({
              email: this.resultEmail,
            }));
            this.router.navigate(['auth/response-password-reset']);
          },
          (err) => {
            this.isSubmitting = false;
            // this.errors = err.error.errors;

            if (err.error.message && err.error.message.length) {
              this.errorMessage = err.error.message.toString();
            }



            this.isSubmitting = false;
          });
    }
  }
}
