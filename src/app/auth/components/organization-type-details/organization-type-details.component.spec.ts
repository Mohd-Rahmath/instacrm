import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationTypeDetailsComponent } from './organization-type-details.component';

describe('OrganizationTypeDetailsComponent', () => {
  let component: OrganizationTypeDetailsComponent;
  let fixture: ComponentFixture<OrganizationTypeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationTypeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
