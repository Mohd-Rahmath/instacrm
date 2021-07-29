import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TitleService} from "../../_services";
import {ApiService} from "../../api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../_services/authentication/authentication.service";

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.scss']
})
export class AccountVerificationComponent implements OnInit {

  isSubmitting: boolean;
  errorMessage: string;
  successMessage: string;
  errors: object = {};
  accountVerifyForm = new FormGroup({
    mobile: new FormControl('', [Validators.required])
  });
  showOtpScreen: boolean;
  maskedPhone: string;
  submitted: boolean;
  verifyToken: string;
  isAccountVerified: boolean;
  otpVerified: boolean;

  constructor(
    private titleService: TitleService,
    private api: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthenticationService
  ) {
    this.titleService.setTitle('Login');
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';
    // stop here if form is invalid
    if (this.accountVerifyForm.invalid) {
      return;
    }
    this.api.post(`auth/account/verify`, this.accountVerifyForm.value)
      .subscribe((res: any) => {
          this.isSubmitting = false;
          this.showOtpScreen = true;
          this.verifyToken = res.verifyToken;
        },
        (err) => {
          this.errors = err.error.errors;

          if (err.error.message.length) {
            this.errorMessage = err.error.message.toString();
          }

          this.isSubmitting = false;
        });

  }

  get f() {
    return this.accountVerifyForm.controls;
  }

  onOtpChange(otp): void {
    this.errorMessage = '';
    if (otp.length === 6) {
      this.isSubmitting = true;
      this.api.get(`auth/register/${this.verifyToken}/otp/verify/${otp}`)
        .subscribe((res: any) => {
            this.isSubmitting = false;
            this.otpVerified = true;
          },
          (err) => {
            this.errors = err.error.errors;

            if (err.error.message.length) {
              this.errorMessage = err.error.message.toString();
            }

            this.isSubmitting = false;
          });
    }
  }
}
