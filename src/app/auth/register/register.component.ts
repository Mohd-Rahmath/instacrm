import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TitleService} from '../../_services';
import {ApiService} from '../../api.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../_services/authentication/authentication.service';
import {toFormData} from '../../_helpers/forms/toFormData';
import {FormErrorService} from '../../_services/form/form-error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  submitted: boolean;
  successMessage: string;
  showPasswordStatus: boolean;
  isSubmitting: boolean;
  errorMessage: string;
  errors: object = {};
  otherHead: boolean;
  form = new FormGroup({
    roleType: new FormControl(1, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    mobile: new FormControl('', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'), Validators.min(10)]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]),
    confirmPassword: new FormControl('', [Validators.required]),
    referral_code: new FormControl(''),
    heard_us: new FormControl('', [Validators.required]),
    heard_others_text: new FormControl(''),
    via_registration: new FormControl('3'),
    organization_type: new FormControl('1'),
    /*organizationTypes: this.formBuilder.array([
        {
            id: [''],
            org_name: ['', Validators.required],
            registration_number: ['', Validators.required],
            address: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zip_code: ['', Validators.required],
            email: ['', Validators.required],
            mobile: ['', Validators.required],
        }
    ]), */
  });
  triggerOtp: boolean;
  showOtpScreen: boolean;
  otpVerified: boolean;
  user: object = {};
  isOrganizationType: boolean;
  orgInfo: object[] = [];


  constructor(
    private titleService: TitleService,
    private api: ApiService,
    private router: Router,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private formErrorService: FormErrorService,
  ) {
    this.titleService.setTitle('Create your account');
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.submitted = true;
    // stop here if form is invalid

    if (this.form.invalid) {
      return;
    }
    const fd = toFormData(this.form.value);


    if (!!this.orgInfo && this.orgInfo.length) {
      fd.append(`org_photo`, this.orgInfo[0]['file'], this.orgInfo[0]['file']['name']);
    }


    this.errors = [];
    this.errorMessage = '';
    this.isSubmitting = true;

    this.api.post(`auth/register`, fd)
      .subscribe((res: any) => {
          this.isSubmitting = false;
          this.showOtpScreen = true;
          this.user = res;
          this.authService.updateAuthUser(this.user);

        },
        (err) => {

          this.errors = err.error.errors;

          if (err.error.message.length) {
            this.errorMessage = err.error.message.toString();
          }
          this.isSubmitting = false;
        });

  }


  onOtpChange(otp): void {
    this.errorMessage = '';
    this.successMessage = '';
    if (otp.length === 6) {
      this.isSubmitting = true;
      this.api.get(`auth/register/${this.user['verifyToken']}/otp/verify/${otp}`)
        .subscribe((res: any) => {
            this.isSubmitting = false;
            this.otpVerified = true;
            this.authService.updateAuthUser(this.user);
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

  // Function
  showPassword(): void {
    this.showPasswordStatus = !this.showPasswordStatus;
  }


  get f() {
    return this.form.controls;
  }

  registerResendOtp() {
    this.errorMessage = '';
    this.successMessage = '';
    this.isSubmitting = true;
    this.api.get(`otp/send`)
      .subscribe((res: any) => {
          this.errorMessage = '';
          this.successMessage = '';
          this.isSubmitting = false;
          this.successMessage = 'Otp is Sent to Your Mobile Number';
        },
        (err) => {
          this.errors = err.error.errors;

          if (err.error.message.length) {
            this.errorMessage = err.error.message.toString();
          }

          this.isSubmitting = false;
        });
  }

  heardAboutus() {
    const others = this.form.get('heard_us').value;
    console.log(others);
    if (others === '6') {
      this.otherHead = true;
    } else {
      this.otherHead = false;
    }
  }

  onRoleType() {
    const type = this.form.get('roleType').value;
    if (type === '2') {
      this.isOrganizationType = true;
    } else {
      this.isOrganizationType = false;
    }
  }

  /*get organizationTypesFormGroup(): FormGroup {

      return this.formBuilder.group({
          id: [''],
          org_name: ['', Validators.required],
          registration_number: ['', Validators.required],
          address: ['', Validators.required],organizationTypes
          city: ['', Validators.required],
          state: ['', Validators.required],
          zip_code: ['', Validators.required],
          email: ['', Validators.required],
          mobile: ['', Validators.required],
      });
  } */

  /**
   * @param event
   */
  onOrgInfo(event: {}) {
    if (!!event) {
      this.orgInfo.push(event);
    }
  }
}
