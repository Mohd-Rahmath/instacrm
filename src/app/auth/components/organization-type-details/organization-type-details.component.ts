import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-organization-type-details',
    templateUrl: './organization-type-details.component.html',
    styleUrls: ['./organization-type-details.component.scss']
})
export class OrganizationTypeDetailsComponent implements OnInit {


    @Input()
    organizationTypeDetailForm: FormGroup;


    @Input() submitted: boolean;

    @Output()
    orgInfo = new EventEmitter<Object>();


    file: File[] = [];

    photoName: any;


    constructor() {
    }

    ngOnInit(): void {
        this.organizationTypeDetailForm.addControl('org_name', new FormControl('', Validators.required));
        this.organizationTypeDetailForm.addControl('org_registration_number', new FormControl('', Validators.required));
        this.organizationTypeDetailForm.addControl('org_address', new FormControl('', Validators.required));
        this.organizationTypeDetailForm.addControl('org_city', new FormControl('', Validators.required));
        this.organizationTypeDetailForm.addControl('org_state', new FormControl('', Validators.required));
        this.organizationTypeDetailForm.addControl('org_zip_code', new FormControl('', Validators.required));
        this.organizationTypeDetailForm.addControl('org_description', new FormControl('', Validators.required));
        this.organizationTypeDetailForm.addControl('photo', new FormControl('', Validators.required));
    }

    get fd() {
        return this.organizationTypeDetailForm.controls;
    }

    onUploadPhoto(event) {
        if (event.target.files.length > 0) {
            this.photoName = event.target.files[0].name;
            this.orgInfo.emit({file: event.target.files[0]});
        }
    }

}
