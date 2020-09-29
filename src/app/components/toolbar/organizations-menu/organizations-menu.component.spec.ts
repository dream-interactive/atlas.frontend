import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsMenuComponent } from './organizations-menu.component';

describe('OrganizationsMenuComponent', () => {
  let component: OrganizationsMenuComponent;
  let fixture: ComponentFixture<OrganizationsMenuComponent>;

  beforeEach(async(() => {
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
