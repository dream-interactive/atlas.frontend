import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrganizationsMenuComponent } from './organizations-menu.component';

describe('OrganizationsMenuComponent', () => {
  let component: OrganizationsMenuComponent;
  let fixture: ComponentFixture<OrganizationsMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
